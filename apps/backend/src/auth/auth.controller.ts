import { Controller, Post, Body, Get, Delete, UseGuards, Patch, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto, DeletarUsuarioDto, LoginUsuarioDto, UpdateUsuarioDto } from './auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

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
    async listar() {
        return this.authService.listarUsuarios();
    }

    @Delete(':id')
    async deletarUsuario(@Body() dto: DeletarUsuarioDto) {
        return this.authService.deletarUsuario(dto);
    }

    @Post('enviarCodigo')
    async enviarCodigo(@Body() body: { email: string }) {
      return this.authService.enviarCodigo(body.email);
    }
    
    @Post('resetPassword')
    async resetPassword(@Body() body: { email: string; codigo: string; novaSenha: string }) {
      return this.authService.resetPassword(body.email, body.codigo, body.novaSenha);
    }
    
    @UseGuards(JwtAuthGuard) 
    @Get('me')
    async getMe(@Req() req) {
      return this.authService.getMe(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('me')
    async updateMe(@Req() req, @Body() dto: UpdateUsuarioDto) {
      return this.authService.updateMe(req.user.id, dto);
    }
}
