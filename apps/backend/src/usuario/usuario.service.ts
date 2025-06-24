import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsuarioDto, UpdateUsuarioDto } from '../auth/auth.dto';
import { Usuario, UsuarioDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name) private userModel: Model<UsuarioDocument>,
  ) { }

  async create(createDto: CreateUsuarioDto): Promise<Usuario> {
    const emailExistente = await this.userModel.findOne({ email: createDto.email });
    const telefoneExistente = await this.userModel.findOne({ telefone: createDto.telefone });

    if (emailExistente && telefoneExistente) {
      throw new BadRequestException('E-mail e telefone já cadastrados.');
    } else if (emailExistente) {
      throw new BadRequestException('E-mail já cadastrado.');
    } else if (telefoneExistente) {
      throw new BadRequestException('Telefone já cadastrado.');
    }

    const senhaHash = await bcrypt.hash(createDto.senha, 10);
    const usuario = new this.userModel({ ...createDto, senha: senhaHash });
    return usuario.save();
  }

  async listarUsuarios(id?: string) {
    if (id) {
      const usuario = await this.userModel.findById(id).select('-senha');
      if (!usuario) {
        throw new BadRequestException('Usuário não encontrado.');
      }
      return usuario;
    }
    return this.userModel.find().select('-senha');
  }

  async deletarUsuario(id: string) {
    const usuario = await this.userModel.findByIdAndDelete({ _id: id });
    if (!usuario) {
      throw new BadRequestException('Usuário não encontrado.');
    }
    return { message: 'Usuário deletado com sucesso.' };
  }

  async deletarMinhaConta(userId: string) {
    const usuario = await this.userModel.findByIdAndDelete(userId);

    if (!usuario) {
      throw new BadRequestException('Usuário não encontrado.');
    }
  }

  async findById(userId: string) {
    return this.userModel.findById(userId);
  }

  async getUsuario(userId: string) {
    const usuario = await this.userModel.findById(userId).select('-senha');
    if (!usuario) {
      throw new BadRequestException('Usuário não encontrado.');
    }
    return usuario;
  }

  async updateUsuario(id: string, dto: UpdateUsuarioDto) {
    const usuario = await this.userModel.findById(id);
    if (!usuario) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    if (dto.nome !== undefined) usuario.nome = dto.nome;
    if (dto.telefone !== undefined) usuario.telefone = dto.telefone;
    if (dto.dataNascimento !== undefined) {
      usuario.dataNascimento = new Date(dto.dataNascimento);
    }

    if (dto.senha) {
      const mesmaSenha = await bcrypt.compare(dto.senha, usuario.senha);
      if (mesmaSenha) {
        throw new BadRequestException('A nova senha não pode ser igual à anterior.');
      }

      const salt = await bcrypt.genSalt();
      usuario.senha = await bcrypt.hash(dto.senha, salt);
    }

    await usuario.save();
    return { message: 'Dados atualizados com sucesso.' };
  }
}
