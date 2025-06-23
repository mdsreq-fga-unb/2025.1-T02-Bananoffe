import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConfiguracaoDocument = Configuracao & Document;

@Schema()
export class Configuracao {
  @Prop({ required: true })
  chavePix: string;
}

export const ConfiguracaoSchema = SchemaFactory.createForClass(Configuracao);
