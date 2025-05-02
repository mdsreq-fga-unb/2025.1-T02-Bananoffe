import { Module } from '@nestjs/common';
import { CardapioController } from './cardapio.controller';
import { CardapioService } from './cardapio.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from 'src/schemas/item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  controllers: [CardapioController],
  providers: [CardapioService],
  exports: [CardapioService],
})
export class CardapioModule {}
