import { Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Types } from 'mongoose';

@Controller('pedido')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PedidoController {
    constructor(private readonly pedidoService: PedidoService) { }

    @Post()
    async realizarPedido(@Req() req) {
        const usuarioId = new Types.ObjectId(req.user.id);
        const pedido = await this.pedidoService.realizarPedido(usuarioId);
        return {
            message: 'Pedido realizado com sucesso!',
            pedidoId: pedido._id,
            total: pedido.valorTotal,
        };
    }

    @Get("listar-todos")
    @Roles('admin')
    async listarPedidos() {
        const pedidos = await this.pedidoService.listarTodosPedidos();
        return pedidos;
    }

    @Get()
    async listarPedidosDoUsuario(@Req() req) {
        const usuarioId = req.user.id;
        const pedidos = await this.pedidoService.listarPedidosPorUsuario(usuarioId);
        return pedidos;
    }

    @Delete(':id')
    @Roles('admin')
    async apagarPedidoPorId(@Param('id') id: string) {
        await this.pedidoService.apagarPedidoPorId(id);
        return { message: `Pedido ${id} apagado com sucesso.` };
    }

}
