import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateItemDto } from './cardapio.dto';
import { Item, ItemDocument } from 'src/schemas/item.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import path from 'path';

@Injectable()
export class CardapioService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

  async createItem(
    dto: CreateItemDto,
    imagem: Express.Multer.File,
  ): Promise<Item> {
    try {
      const nomeExistente = await this.itemModel.findOne({ nome: dto.nome });
      if (nomeExistente) {
        throw new BadRequestException('Item já existe no cardápio.');
      }

      const novoItem = new this.itemModel({
        ...dto,
        imagem: imagem?.buffer,
      });

      return novoItem.save();
    } catch (error) {
      console.error('Erro ao salvar item:', error);
      throw new InternalServerErrorException('Erro ao criar item.');
    }
  }

  async listarItens() {
    const itens = await this.itemModel.find().select('-__v');

    const itensAdaptados = itens.map((item) => {
      const imagemBase64 = item.imagem
        ? `data:image/jpeg;base64,${item.imagem.toString('base64')}`
        : undefined;

      return {
        ...item.toObject(),
        imagem: imagemBase64,
      };
    });

    return itensAdaptados;
  }

  async deletarItem(dto: { id: string }) {
    const item = await this.itemModel.findByIdAndDelete({ _id: dto.id });
    if (!item) {
      throw new BadRequestException('Item não encontrado.');
    }
    return { message: 'Item deletado com sucesso!' };
  }

  async updateItem(
    id: string,
    dto: Partial<CreateItemDto>,
    imagem?: Express.Multer.File,
  ): Promise<Item> {
    const item = await this.itemModel.findById(id);
    if (!item) {
      throw new BadRequestException('Item não encontrado.');
    }

    Object.assign(item, dto);

    if (imagem) {
      item.imagem = imagem.buffer;
    }

    return item.save();
  }
}
