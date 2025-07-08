import { forwardRef, Module } from '@nestjs/common';
import { ConfiguracoesController } from './configuracoes.controller';
import { ConfiguracoesService } from './configuracoes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Configuracao, ConfiguracaoSchema } from 'src/schemas/configuracao.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Configuracao.name, schema: ConfiguracaoSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ConfiguracoesController],
  providers: [ConfiguracoesService]
})
export class ConfiguracoesModule { }
