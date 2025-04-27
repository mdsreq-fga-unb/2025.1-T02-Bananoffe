import { Controller, Post, Body, Get, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto, DeletarUsuarioDto, LoginUsuarioDto } from './auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles/roles.guard';
import { Role } from 'src/types/role';
import { Roles } from './roles/roles.decorator';

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

    @Post('login')
    async login(@Body() dto: LoginUsuarioDto) {
        return this.authService.login(dto);
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
