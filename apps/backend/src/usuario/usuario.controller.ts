import { Controller, Post, Body, Get, Delete, Patch, Query, Param, UseGuards, Req, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from '../auth/auth.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import * as bcrypt from 'bcrypt';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }

    @Post('cadastrar')
    async criarUsuario(@Body() dto: CreateUsuarioDto) {
        const novoUsuario = await this.usuarioService.create(dto);
        return {
            message: 'Usuário criado com sucesso!',
            novoUsuario,
        };
    }

    @Get('listar')
    async listar(@Query('id') id?: string) {
        return this.usuarioService.listarUsuarios(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('minha-conta')
    async deletarMinhaConta(@Req() req) {
        console.log('Usuário logado:', req.user);
        console.log('ID do usuário');
        const usuarioId = req.user.id;
        await this.usuarioService.deletarMinhaConta(usuarioId);
        return {
            message: 'Conta deletada com sucesso!',
        };
    };

    @Patch('atualizar/:id')
    async atualizarUsuario(@Body() dto: UpdateUsuarioDto, @Param('id') id: string) {
        return this.usuarioService.updateUsuario(id, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('verificar-senha')
    async verificarSenha(@Req() req, @Body('password') senha: string) {
        const usuario = await this.usuarioService.findById(req.user.id);

        if (!usuario) {
            throw new NotFoundException('Usuário não encontrado.');
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha); 

        if (!senhaCorreta) {
            throw new UnauthorizedException('Senha incorreta.');
        }

        return { message: 'Senha correta' };
    };

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    async deletarUsuario(@Param('id') id: string) {
        return this.usuarioService.deletarUsuario(id);
    };
}
