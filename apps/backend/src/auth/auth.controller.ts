import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto, DeletarUsuarioDto } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('cadastrar')
    async criarUsuario(@Body() dto: CreateUsuarioDto) {
        const novoUsuario = await this.authService.create(dto);
        return {
            message: 'Usuário criado com sucesso!',
            novoUsuario
        };
    }

    @Get('listar')
    async listar(){
        return this.authService.listarUsuarios();
    }

    @Delete(':id')
    async deletarUsuario(@Body() dto: DeletarUsuarioDto) {
        return this.authService.deletarUsuario(dto);
    }
}
