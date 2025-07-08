import { Module } from '@nestjs/common';
import { CardapioController } from './cardapio.controller';
import { CardapioService } from './cardapio.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Torta, TortaSchema } from 'src/schemas/torta.schema';
import { Fatia, FatiaSchema } from 'src/schemas/fatia.schema';
import { Sacola, SacolaSchema } from 'src/schemas/sacola.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Torta.name, schema: TortaSchema },
      { name: Fatia.name, schema: FatiaSchema },
      { name: Sacola.name, schema: SacolaSchema }
    ]),
  ],
  controllers: [CardapioController],
  providers: [CardapioService],
  exports: [CardapioService],
})
export class CardapioModule { }
