import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ConfiguracoesService } from './configuracoes.service';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('configuracoes')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class ConfiguracoesController {
    constructor(private readonly configuracoesService: ConfiguracoesService) { }

    @Get('pix')
    async getChavePix() {
        const chave = await this.configuracoesService.obterChavePix();
        return { chavePix: chave };
    }

    @Put('pix')
    async updateChavePix(@Body('chavePix') chavePix: string) {
        const chave = await this.configuracoesService.atualizarChavePix(chavePix);
        return { chavePix: chave };
    }
}
