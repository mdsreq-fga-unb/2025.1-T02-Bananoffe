import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateFatiaDto, CreateItensDto, CreateTortaDto } from './cardapio.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Torta, TortaDocument } from 'src/schemas/torta.schema';
import { Fatia, FatiaDocument } from 'src/schemas/fatia.schema';

@Injectable()
export class CardapioService {
  constructor(
    @InjectModel(Torta.name) private tortaModel: Model<TortaDocument>,
    @InjectModel(Fatia.name) private fatiaModel: Model<FatiaDocument>,
  ) { }

  async createItem(
    dto: CreateItensDto,
    imagemTorta?: Express.Multer.File,
    imagemFatia?: Express.Multer.File,
  ) {
    // Verifica se já existe algum item com esse nome (opcional)
    const jaExiste = await this.tortaModel.findOne({ nome: dto.nome }) || await this.fatiaModel.findOne({ nome: dto.nome });
    if (jaExiste) {
      throw new BadRequestException('Já existe um item com esse nome.');
    }

    const novaTorta = new this.tortaModel({
      nome: `Torta ${dto.nome}`,
      descricao: dto.descricao,
      precoTortaP: dto.precoTortaP,
      precoTortaG: dto.precoTortaG,
      quantidade: dto.quantidadeTorta,
      imagem: imagemTorta?.buffer,
    });

    const novaFatia = new this.fatiaModel({
      nome: `Fatia ${dto.nome}`,
      descricao: dto.descricao,
      precoFatia: dto.precoFatia,
      quantidade: dto.quantidadeFatia,
      imagem: imagemFatia?.buffer,
    });

    await novaTorta.save();
    await novaFatia.save();

    return {
      torta: novaTorta,
      fatia: novaFatia,
    };
  }

  async listarItens() {
    const tortas = await this.tortaModel.find().select('-__v');
    const fatias = await this.fatiaModel.find().select('-__v');

    const tortasAdaptadas = tortas.map((torta) => {
      const imagemBase64 = torta.imagem
        ? `data:image/jpeg;base64,${torta.imagem.toString('base64')}`
        : undefined;

      return {
        ...torta.toObject(),
        imagem: imagemBase64,
      };
    });

    const fatiasAdaptadas = fatias.map((fatia) => {
      const imagemBase64 = fatia.imagem
        ? `data:image/jpeg;base64,${fatia.imagem.toString('base64')}`
        : undefined;

      return {
        ...fatia.toObject(),
        imagem: imagemBase64,
      };
    });

    return {
      Tortas: tortasAdaptadas,
      Fatias: fatiasAdaptadas,
    };
  }

  async deletarItem(dto: { id: string }) {
    let item = await this.tortaModel.findByIdAndDelete(dto.id);
    if (item) {
      return { message: 'Torta deletada com sucesso!' };
    }

    item = await this.fatiaModel.findByIdAndDelete(dto.id);
    if (item) {
      return { message: 'Fatia deletada com sucesso!' };
    }

    throw new BadRequestException('Item não encontrado.');
  }

  async updateItem(
    id: string,
    dto: Partial<CreateTortaDto | CreateFatiaDto>,
    imagem?: Express.Multer.File,
  ): Promise<Torta | Fatia> {
    let item = await this.tortaModel.findById(id);
    let tipo: 'TORTA' | 'FATIA' = 'TORTA';

    if (!item) {
      item = await this.fatiaModel.findById(id);
    }

    if (!item) {
      throw new BadRequestException('Item não encontrado.');
    }

    Object.assign(item, dto);
    if (imagem) {
      item.imagem = imagem.buffer;
    }

    const updated = await item.save();

    return { ...updated.toObject() };
  }

  async buscarPorId(id: string): Promise<Torta | Fatia> {
    let item = await this.tortaModel.findById(id);
    if (!item) {
      item = await this.fatiaModel.findById(id);
    }
    if (!item) {
      throw new NotFoundException('Torta ou Fatia não encontrada');
    }
    return item;
  }

}
