import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SacolaDocument = Sacola & Document;

@Schema()
export class SacolaItem {
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

  @Prop({ required: true, min: 1 })
  quantidade: number;

  @Prop({ required: true })
  precoTotal: number;
}

export const SacolaItemSchema = SchemaFactory.createForClass(SacolaItem);

@Schema({ timestamps: true })
export class Sacola {
  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true, unique: true })
  usuarioId: Types.ObjectId;

  @Prop({ type: [SacolaItemSchema], default: [] })
  itens: (SacolaItem & { _id: Types.ObjectId })[];

  @Prop({ default: 0 })
  valorTotal: number;
}

export const SacolaSchema = SchemaFactory.createForClass(Sacola);
