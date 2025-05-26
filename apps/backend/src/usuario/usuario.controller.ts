import { Controller, Post, Body, Get, Delete, Patch, Query, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto, DeletarUsuarioDto, UpdateUsuarioDto } from '../auth/auth.dto';

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

    @Delete('deletar')
    async deletarUsuario(@Body() dto: DeletarUsuarioDto) {
        return this.usuarioService.deletarUsuario(dto);
    }

    @Patch('atualizar/:id')
    async atualizarUsuario(@Body() dto: UpdateUsuarioDto, @Param('id') id: string) {
        return this.usuarioService.updateUsuario(id, dto);
    }
}
