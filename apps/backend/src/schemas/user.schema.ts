import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/types/role';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, unique: true })
  telefone: string;

  @Prop() // opcional
  dataNascimento?: Date;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  senha: string;

  @Prop({ enum: Role, default: Role.CLIENTE })
  role: Role;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
