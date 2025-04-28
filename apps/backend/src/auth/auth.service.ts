import { Injectable, BadRequestException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUsuarioDto, LoginUsuarioDto } from './auth.dto';
import { Usuario, UsuarioDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import { config } from 'dotenv';

config({
    path: '.env'
})

@Injectable()
export class AuthService {
    private resetCodes = new Map<string, { codigo: string; expires: Date }>();

    constructor(
        @InjectModel(Usuario.name) private userModel: Model<UsuarioDocument>,
        private jwtService: JwtService,
    ) { }

    private gerarCodigo(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    private async enviarEmail(destino: string, assunto: string, mensagem: string) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Bananoffe" <${process.env.SMTP_USER}>`,
            to: destino,
            subject: assunto,
            text: mensagem,
        });
    }

    async enviarCodigo(email: string) {
        const usuario = await this.userModel.findOne({ email });

        if (!usuario) {
            throw new BadRequestException('Usuário não encontrado.');
        }

        const codigo = this.gerarCodigo();
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 30);

        this.resetCodes.set(email, { codigo, expires });

        await this.enviarEmail(
            usuario.email,
            'Seu código de recuperação de senha',
            `Seu código de recuperação é: ${codigo}. Ele expira em 30 minutos.`
        );

        return { message: 'Código enviado para seu email.' };
    }

    async resetPassword(email: string, codigo: string, novaSenha: string) {
        const usuario = await this.userModel.findOne({ email });

        if (!usuario) {
            throw new BadRequestException('Usuário não encontrado.');
        }

        const dadosCodigo = this.resetCodes.get(email);

        if (
            !dadosCodigo ||
            dadosCodigo.codigo !== codigo ||
            dadosCodigo.expires < new Date()
        ) {
            throw new BadRequestException('Código inválido ou expirado.');
        }

        const senhaHash = await bcrypt.hash(novaSenha, 10);

        usuario.senha = senhaHash;
        await usuario.save();

        this.resetCodes.delete(email);

        return { message: 'Senha redefinida com sucesso!' };
    }

    async login(dto: LoginUsuarioDto) {
        const usuario = await this.userModel.findOne({ email: dto.email });

        if (!usuario) {
            throw new UnauthorizedException('Usuário não encontrado.');
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
    }

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

    async listarUsuarios() {
        return this.userModel.find();
    }

    async deletarUsuario(dto: { id: string }) {
        const usuario = await this.userModel.findByIdAndDelete({ _id: dto.id });
        if (!usuario) {
            throw new BadRequestException('Usuário não encontrado.');
        }
        return { message: 'Usuário deletado com sucesso.' };
    }
}
