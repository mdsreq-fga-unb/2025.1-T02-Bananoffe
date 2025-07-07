import { Module } from '@nestjs/common';
import { PagamentosService } from './pagamentos.service';
import { PagamentosController } from './pagamentos.controller';

@Module({
  providers: [PagamentosService],
  controllers: [PagamentosController]
})
export class PagamentosModule { }
