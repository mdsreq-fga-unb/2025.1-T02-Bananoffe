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

    async obterChavePix(): Promise<string> {
        let config = await this.configuracaoModel.findOne();
        if (!config) {
            config = await this.configuracaoModel.create({ chave: uuidv4() });
        }

        return config.chavePix;
    }

    async atualizarChavePix(novaChave: string): Promise<string> {
        // if (!novaChave || !/^chave-[a-z0-9-]{5,}$/.test(novaChave)) {
        //     throw new BadRequestException('Formato inválido de chave PIX aleatória.');
        // }

        let config = await this.configuracaoModel.findOne();

        if (!config) {
            config = new this.configuracaoModel({ chavePix: novaChave });
        } else {
            config.chavePix = novaChave;
        }

        await config.save();
        return config.chavePix;
    }
}
