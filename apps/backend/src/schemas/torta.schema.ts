import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TortaDocument = Torta & Document;

@Schema()
export class Torta {
    @Prop({ required: true, unique: true })
    nome: string;
    
    @Prop({ required: true })
    descricao: string;

    @Prop({ required: true })
    precoTortaP: number;

    @Prop({ required: true })
    precoTortaG: number;

    @Prop({ default: 0 })
    quantidade: number;

    @Prop({ type: Buffer })
    imagem: Buffer;
}

export const TortaSchema = SchemaFactory.createForClass(Torta);
