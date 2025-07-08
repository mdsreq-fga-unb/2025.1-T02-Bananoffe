import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type ConfiguracaoDocument = Configuracao & Document;

@Schema()
export class Configuracao {
  @Prop({ required: true, default: uuidv4 })
  chavePix: string;

  @Prop({ required: true, default: 'Felipe' })
  nomeCompleto: string;

  @Prop({ required: true, default: 'São Paulo' })
  cidadeBanco: string;
}

export const ConfiguracaoSchema = SchemaFactory.createForClass(Configuracao);
