import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUsuarioDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginUsuarioDto) {
    return this.authService.login(dto);
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
