import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { CardapioModule } from './cardapio/cardapio.module';
import { CardapioController } from './cardapio/cardapio.controller';
import { UsuarioModule } from './usuario/usuario.module';
import { SacolaModule } from './sacola/sacola.module';
import { PedidoModule } from './pedido/pedido.module';

config({
  path:'.env'
})

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    CardapioModule,
    UsuarioModule,
    SacolaModule,
    PedidoModule,
  ],
  controllers: [AppController, AuthController, CardapioController],
  providers: [AppService],
})
export class AppModule {}
