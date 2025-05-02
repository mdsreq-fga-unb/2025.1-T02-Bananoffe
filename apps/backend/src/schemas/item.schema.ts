import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
    @Prop({ required: true, unique: true })
    nome: string;

    @Prop({ required: true })
    precoTortaP: number;

    @Prop({ required: true })
    precoTortaG: number;

    @Prop({ required: true })
    precoPedacoP: number;

    @Prop({ required: true })
    precoPedacoG: number;

    @Prop({ default: 0 })
    quantidade: number;

    @Prop({ type: Buffer })
    imagem: Buffer;

    @Prop({ required: true })
    descricao: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
