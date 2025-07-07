import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PagamentosService } from './pagamentos.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('pagamentos')
export class PagamentosController {
  constructor(private readonly pagamentosService: PagamentosService) {}

  @UseGuards(JwtAuthGuard)
  @Post('gerar')
  gerarPixCode(@Body() dto: { chave: string; nome: string; cidade: string; valor: number; txid?: string }) {
    const pixCode = this.pagamentosService.gerarPix(dto);
    return { pixCode };
  }
}
