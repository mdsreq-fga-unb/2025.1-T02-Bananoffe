import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CardapioService } from 'src/cardapio/cardapio.service';
import { Sacola, SacolaDocument } from 'src/schemas/sacola.schema';
import { AdicionarProdutoDto } from './sacola.dto';

@Injectable()
export class SacolaService {
    constructor(
        @InjectModel(Sacola.name) private sacolaModel: Model<SacolaDocument>,
        private readonly cardapioService: CardapioService  // Injete o service que acessa tortas/fatias
    ) { }

    async adicionarProduto(dto: AdicionarProdutoDto, usuarioId: string) {
        const produto = await this.cardapioService.buscarPorId(dto.produtoId);
        if (!produto) throw new NotFoundException('Produto não encontrado');

        if (produto.quantidade < dto.quantidade) throw new BadRequestException('Estoque insuficiente');

        const precoUnitario = this.calcularPreco(produto, dto.tipo, dto.tamanho);
        const precoTotal = precoUnitario * dto.quantidade;

        let sacola = await this.sacolaModel.findOne({ usuarioId });

        if (!sacola) {
            sacola = new this.sacolaModel({ usuarioId, itens: [], valorTotal: 0 });
        }

        const index = sacola.itens.findIndex(
            (item) =>
                item.produtoId.equals(dto.produtoId) &&
                item.tipo === dto.tipo &&
                item.tamanho === dto.tamanho
        );

        if (index >= 0) {
            sacola.itens[index].quantidade += dto.quantidade;
            sacola.itens[index].precoTotal = sacola.itens[index].quantidade * precoUnitario;
        } else {
            sacola.itens.push({
                _id: new Types.ObjectId(),
                produtoId: new Types.ObjectId(dto.produtoId),
                nome: produto.nome,
                tipo: dto.tipo,
                tamanho: dto.tamanho,
                precoUnitario,
                quantidade: dto.quantidade,
                precoTotal,
            });
        }

        sacola.valorTotal = sacola.itens.reduce((acc, item) => acc + item.precoTotal, 0);
        await sacola.save();

        return { message: 'Produto adicionado à sacola com sucesso' };
    }

    calcularPreco(produto: any, tipo: string, tamanho?: string): number {
        if (tipo === 'Torta') {
            return tamanho === 'G' ? produto.precoTortaG : produto.precoTortaP;
        }
        return produto.precoFatia;
    }

    async getSacola(usuarioId: string) {
        return this.sacolaModel.findOne({ usuarioId }).lean();
    }

    async atualizarItem(itemId: string, novaQuantidade: number, usuarioId: string) {
        const sacola = await this.sacolaModel.findOne({ usuarioId });
        if (!sacola) throw new NotFoundException('Sacola não encontrada');

        const item = sacola.itens.find(i => i._id?.toString() === itemId);
        if (!item) throw new NotFoundException('Item não encontrado');

        if (novaQuantidade < 1)
            throw new BadRequestException('Quantidade inválida');

        const produto = await this.cardapioService.buscarPorId(item.produtoId.toString());
        if (!produto)
            throw new NotFoundException('Produto não encontrado no cardápio');

        if (produto.quantidade < novaQuantidade) {
            throw new BadRequestException('Quantidade solicitada maior que o estoque disponível');
        }

        item.quantidade = novaQuantidade;
        item.precoTotal = item.quantidade * item.precoUnitario;

        sacola.valorTotal = sacola.itens.reduce((acc, i) => acc + i.precoTotal, 0);
        await sacola.save();

        return { 
            message: 'Item atualizado com sucesso',
            item,    
         };
    }

    async removerItem(itemId: string, usuarioId: string) {
        const sacola = await this.sacolaModel.findOne({ usuarioId });
        if (!sacola) {
            throw new NotFoundException('Sacola não encontrada para o usuário');
        }

        sacola.itens = sacola.itens.filter(
            (item) => item._id.toString() !== itemId,
        );

        sacola.valorTotal = sacola.itens.reduce((acc, item) => acc + item.precoTotal, 0);
        await sacola.save();
        return { message: 'Item removido com sucesso', sacola };
    }
}

