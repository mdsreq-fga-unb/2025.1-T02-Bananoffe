import { forwardRef, Module } from '@nestjs/common';
import { PedidoController } from './pedido.controller';
import { PedidoService } from './pedido.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pedido, PedidoSchema } from 'src/schemas/pedido.schema';
import { Torta, TortaSchema } from 'src/schemas/torta.schema';
import { Fatia, FatiaSchema } from 'src/schemas/fatia.schema';
import { Sacola, SacolaSchema } from 'src/schemas/sacola.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pedido.name, schema: PedidoSchema },
      { name: Torta.name, schema: TortaSchema },
      { name: Fatia.name, schema: FatiaSchema },
      { name: Sacola.name, schema: SacolaSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [PedidoController],
  providers: [PedidoService]
})
export class PedidoModule { }
