import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PedidoDocument = Pedido & Document;

@Schema()
export class PedidoItem {
  @Prop({ type: Types.ObjectId, required: true })
  produtoId: Types.ObjectId;

  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, enum: ['Torta', 'Fatia'] })
  tipo: string;

  @Prop({ enum: ['P', 'G'] })
  tamanho?: string;

  @Prop({ required: true })
  precoUnitario: number;

  @Prop({ required: true })
  quantidade: number;

  @Prop({ required: true })
  precoTotal: number;
}

export const PedidoItemSchema = SchemaFactory.createForClass(PedidoItem);

@Schema({ timestamps: true })
export class Pedido {
  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
  usuarioId: Types.ObjectId;

  @Prop({ type: [PedidoItemSchema], required: true })
  itens: PedidoItem[];

  @Prop({ required: true })
  valorTotal: number;
}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);
