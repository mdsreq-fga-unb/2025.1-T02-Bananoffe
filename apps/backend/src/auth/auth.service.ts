import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
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
        const emailExistente = await this.userModel.findOne({ email: createDto.email });
        const TelefoneExistente = await this.userModel.findOne({ telefone: createDto.telefone });
        if (emailExistente && TelefoneExistente) {
            throw new BadRequestException('E-mail e telefone já cadastrados.');
        }
        else if (emailExistente) {
            throw new BadRequestException('E-mail já cadastrado.');
        }
        else if (TelefoneExistente) {
            throw new BadRequestException('Telefone já cadastrado.');
        }

        const senhaHash = await bcrypt.hash(createDto.senha, 10);
        const usuario = new this.userModel({ ...createDto, senha: senhaHash });
        return usuario.save();
    }

    async listarUsuarios() {
        const users = await this.userModel.find();
        return users
    }

    async deletarUsuario(dto: { id: string }) {
        const usuario = await this.userModel.findByIdAndDelete({ _id: dto.id });
        if (!usuario) {
            throw new BadRequestException('Usuário não encontrado.');
        }
    }

    async login(dto: LoginUsuarioDto) {
        const usuario = await this.userModel.findOne({ email: dto.email });

        if (!usuario) {
            throw new UnauthorizedException('Email ou senha incorretos.');
        }

        const senhaValida = await bcrypt.compare(dto.senha, usuario.senha);

        if (!senhaValida) {
            throw new UnauthorizedException('Email ou senha incorretos.');
        }

        const payload = {
            sub: usuario._id,
            email: usuario.email,
            role: usuario.role
        };

        const token = this.jwtService.sign(payload);

        return {
            message: 'Login realizado com sucesso!',
            access_token: token,
            id: usuario._id,
            nome: usuario.nome,
            role: usuario.role,
        };
    }
}
