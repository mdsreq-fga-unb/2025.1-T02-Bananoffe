import { Injectable, BadRequestException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsuarioDto, LoginUsuarioDto } from './auth.dto';
import { Usuario, UsuarioDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Usuario.name) private userModel: Model<UsuarioDocument>,
        private jwtService: JwtService,
    ) { }

    async create(createDto: CreateUsuarioDto): Promise<Usuario> {
        try {
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
            return await usuario.save();
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw new InternalServerErrorException('Erro ao criar usuário. Tente novamente mais tarde.');
        }
    }

    async listarUsuarios() {
        try {
            return await this.userModel.find();
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            throw new InternalServerErrorException('Erro ao listar usuários.');
        }
    }

    async deletarUsuario(dto: { id: string }) {
        try {
            const usuario = await this.userModel.findByIdAndDelete({ _id: dto.id });
            if (!usuario) {
                throw new BadRequestException('Usuário não encontrado.');
            }
            return { message: 'Usuário deletado com sucesso.' };
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
            throw new InternalServerErrorException('Erro ao deletar usuário.');
        }
    }

    async login(dto: LoginUsuarioDto) {
        try {
            console.log(dto)
            const usuario = await this.userModel.findOne({ email: dto.email });

            if (!usuario) {
                throw new UnauthorizedException('Usuário não encontradoi.');
            }

            const senhaValida = await bcrypt.compare(dto.senha, usuario.senha);

            if (!senhaValida) {
                throw new UnauthorizedException('Email ou senha incorretos.');
            }

            const payload = {
                sub: usuario._id,
                email: usuario.email,
                role: usuario.role,
            };

            const token = this.jwtService.sign(payload);

            return {
                message: 'Login realizado com sucesso!',
                access_token: token,
                id: usuario._id,
                nome: usuario.nome,
                role: usuario.role,
            };
        } catch (error) {
            console.error('Erro no login:', error);

            if (error instanceof UnauthorizedException) {
                throw error;
            }

            throw new InternalServerErrorException('Erro ao realizar login. Tente novamente.');
        }
    }
}
