import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Configuracao } from 'src/schemas/configuracao.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ConfiguracoesService {
    constructor(
        @InjectModel(Configuracao.name) private configuracaoModel: Model<Configuracao>
    ) { }

    private async garantirConfiguracao(): Promise<Configuracao> {
        let config = await this.configuracaoModel.findOne();

        if (!config) {
            config = await this.configuracaoModel.create({
                chavePix: uuidv4(),
                nomeCompleto: "Felipe",
                cidadeBanco: "São Paulo",
            });
        }

        return config;
    }

    async obterChavePix(): Promise<string> {
        const config = await this.garantirConfiguracao();
        return config.chavePix;
    }

    async obterNomeCompleto(): Promise<string> {
        const config = await this.garantirConfiguracao();
        return config.nomeCompleto;
    }

    async obterCidadeBanco(): Promise<string> {
        const config = await this.garantirConfiguracao();
        return config.cidadeBanco;
    }

    async atualizarChavePix(novaChave: string): Promise<string> {
        let config = await this.configuracaoModel.findOne();

        if (!config) {
            config = new this.configuracaoModel({
                chavePix: novaChave,
                nomeCompleto: "",
                cidadeBanco: "",
            });
        } else {
            config.chavePix = novaChave;
        }

        await config.save();
        return config.chavePix;
    }

    async atualizarNomeCompleto(novoNome: string): Promise<string> {
        let config = await this.configuracaoModel.findOne();

        if (!config) {
            config = new this.configuracaoModel({
                chavePix: "",
                nomeCompleto: novoNome,
                cidadeBanco: "",
            });
        } else {
            config.nomeCompleto = novoNome;
        }

        await config.save();
        return config.nomeCompleto;
    }

    async atualizarCidadeBanco(novaCidade: string): Promise<string> {
        let config = await this.configuracaoModel.findOne();

        if (!config) {
            config = new this.configuracaoModel({
                chavePix: "",
                nomeCompleto: "",
                cidadeBanco: novaCidade,
            });
        } else {
            config.cidadeBanco = novaCidade;
        }

        await config.save();
        return config.cidadeBanco;
    }

}
