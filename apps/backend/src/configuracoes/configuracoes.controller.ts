import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ConfiguracoesService } from './configuracoes.service';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('configuracoes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConfiguracoesController {
    constructor(private readonly configuracoesService: ConfiguracoesService) { }

    @Get('pix')
    async getChavePix() {
        const chave = await this.configuracoesService.obterChavePix();
        return { chavePix: chave };
    }

    @Roles('admin')
    @Put('pix')
    async updateChavePix(@Body('chavePix') chavePix: string) {
        const chave = await this.configuracoesService.atualizarChavePix(chavePix);
        return { chavePix: chave };
    }

    @Get('nome')
    async getNomeCompleto() {
        const nome = await this.configuracoesService.obterNomeCompleto();
        return { nome: nome };
    }

    @Roles('admin')
    @Put('nome')
    async updateNomeCompleto(@Body('nomeCompleto') chavePix: string) {
        const nomeCompleto = await this.configuracoesService.atualizarNomeCompleto(chavePix);
        return { nomeCompleto: nomeCompleto };
    }

    @Get('cidade')
    async getCidadeBanco() {
        const cidadeBanco = await this.configuracoesService.obterCidadeBanco();
        return { cidadeBanco: cidadeBanco };
    }

    @Roles('admin')
    @Put('cidade')
    async updateCidadeBanco(@Body('cidadeBanco') chavePix: string) {
        const cidadeBanco = await this.configuracoesService.atualizarCidadeBanco(chavePix);
        return { cidadeBanco: cidadeBanco };
    }
}
