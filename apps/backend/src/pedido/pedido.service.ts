import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Fatia, FatiaDocument } from 'src/schemas/fatia.schema';
import { Pedido, PedidoDocument, PedidoItem } from 'src/schemas/pedido.schema';
import { Sacola, SacolaDocument } from 'src/schemas/sacola.schema';
import { Torta, TortaDocument } from 'src/schemas/torta.schema';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class PedidoService {
    constructor(
        @InjectModel(Sacola.name) private sacolaModel: Model<SacolaDocument>,
        @InjectModel(Torta.name) private tortaModel: Model<TortaDocument>,
        @InjectModel(Fatia.name) private fatiaModel: Model<FatiaDocument>,
        @InjectModel(Pedido.name) private pedidoModel: Model<PedidoDocument>,
        @InjectConnection() private readonly connection: Connection
    ) { }

    async realizarPedido(usuarioId: Types.ObjectId) {
        const session = await this.connection.startSession();
        // session.startTransaction();

        try {
            // const sacola = await this.sacolaModel.findOne({ usuarioId }).session(session);
            const idStr = typeof usuarioId === 'string' ? usuarioId : usuarioId.toString();
            const sacola = await this.sacolaModel.findOne({ usuarioId: idStr });

            if (!sacola) {
                throw new NotFoundException('Sacola não encontrada para o usuário.');
            }
            if (sacola.itens.length === 0) {
                throw new BadRequestException('Sacola vazia.');
            }

            const pedidoItens: PedidoItem[] = [];
            let valorTotal = 0;

            for (const item of sacola.itens) {
                const isTorta = item.tipo === 'Torta';
                const produtoModel = isTorta ? this.tortaModel : this.fatiaModel;

                const produto = await (produtoModel as Model<FatiaDocument | TortaDocument>)
                    .findById(item.produtoId)
                    .session(session);
                if (!produto) throw new NotFoundException(`Produto não encontrado: ${item.nome}`);
                if (produto.quantidade < item.quantidade) {
                    throw new BadRequestException(
                        `Estoque insuficiente para ${item.nome}. Disponível: ${produto.quantidade}`
                    );
                }

                produto.quantidade -= item.quantidade;
                await produto.save({ session });

                pedidoItens.push({
                    produtoId: produto._id as Types.ObjectId,
                    nome: produto.nome,
                    tipo: item.tipo,
                    tamanho: item.tamanho,
                    precoUnitario: item.precoUnitario,
                    quantidade: item.quantidade,
                    precoTotal: item.precoTotal,
                });

                valorTotal += item.precoTotal;
            }

            sacola.itens = [];
            sacola.valorTotal = 0;
            await sacola.save({ session });

            const novoPedido = await this.pedidoModel.create([{
                usuarioId,
                itens: pedidoItens,
                valorTotal,
            }], { session });

            // await session.commitTransaction();
            return novoPedido[0];

        } catch (error) {
            // await session.abortTransaction();
            throw error;
        }
        //finally {
        //     session.endSession();
        // }
    }

    async listarTodosPedidos() {
        return this.pedidoModel
            .find()
            .populate('usuarioId', 'nome email')
            .sort({ createdAt: -1 });
    }

    async apagarPedidoPorId(pedidoId: string): Promise<void> {
        const result = await this.pedidoModel.deleteOne({ _id: new Types.ObjectId(pedidoId) });
        if (result.deletedCount === 0) {
            throw new NotFoundException(`Pedido com id ${pedidoId} não encontrado.`);
        }
    }

    async listarPedidosPorUsuario(usuarioId: Types.ObjectId | string) {
        const userObjId = typeof usuarioId === 'string' ? new Types.ObjectId(usuarioId) : usuarioId;
        return this.pedidoModel
            .find({ usuarioId: userObjId })
            .populate('usuarioId', 'nome email') 
            .sort({ createdAt: -1 });
    }

}
