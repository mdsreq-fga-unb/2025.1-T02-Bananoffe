import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FatiaDocument = Fatia & Document;

@Schema()
export class Fatia {
    @Prop({ required: true, unique: true })
    nome: string;
    
    @Prop({ required: true })
    descricao: string;
    
    @Prop({ required: true })
    precoFatia: number;

    @Prop({ default: 0 })
    quantidade: number;

    @Prop({ type: Buffer })
    imagem: Buffer;
}

export const FatiaSchema = SchemaFactory.createForClass(Fatia);
 
