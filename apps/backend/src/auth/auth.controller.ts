import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto, DeletarUsuarioDto, LoginUsuarioDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('cadastrar')
  async criarUsuario(@Body() dto: CreateUsuarioDto) {
    const novoUsuario = await this.authService.create(dto);
    return {
      message: 'Usuário criado com sucesso!',
      novoUsuario,
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

  @Post('validarCodigo')
  async validarCodigo(@Body() body: { email: string; codigo: string }) {
    return this.authService.validarCodigo(body.email, body.codigo);
  }

  @Post('resetPassword')
  async resetPassword(@Body() body: { email: string; novaSenha: string }) {
    return this.authService.resetPassword(body.email, body.novaSenha);
  }
}
