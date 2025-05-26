import { forwardRef, Module } from '@nestjs/common';
import { SacolaController } from './sacola.controller';
import { SacolaService } from './sacola.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Sacola, SacolaSchema } from 'src/schemas/sacola.schema';
import { AuthModule } from 'src/auth/auth.module';
import { CardapioModule } from 'src/cardapio/cardapio.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sacola.name, schema: SacolaSchema }]),
    forwardRef(() => AuthModule),
    CardapioModule,
  ],
  controllers: [SacolaController],
  providers: [SacolaService]
})
export class SacolaModule { }
