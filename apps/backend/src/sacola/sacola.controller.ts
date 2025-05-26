import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    Param,
    Req,
    UseGuards,
} from '@nestjs/common';
import { SacolaService } from './sacola.service';
import { AdicionarProdutoDto, AtualizarQuantidadeDto } from './sacola.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('sacola')
@UseGuards(JwtAuthGuard)
export class SacolaController {
    constructor(private readonly sacolaService: SacolaService) { }

    @Post('adicionar')
    async adicionarProduto(@Body() dto: AdicionarProdutoDto, @Req() req) {
        const usuarioId = req.user.id;
        return this.sacolaService.adicionarProduto(dto, usuarioId);
    }

    @Get()
    async getSacola(@Req() req) {
        const usuarioId = req.user.id;
        return this.sacolaService.getSacola(usuarioId);
    }

    @Put(':itemId')
    async atualizarItem(
        @Param('itemId') itemId: string,
        @Body() dto: AtualizarQuantidadeDto,
        @Req() req,
    ) {
        const usuarioId = req.user.id;
        return this.sacolaService.atualizarItem(itemId, dto.quantidade, usuarioId);
    }
    
    @Delete('item/:itemId')
    async removerItem(@Param('itemId') itemId: string, @Req() req) {
        const usuarioId = req.user.id;
        return this.sacolaService.removerItem(itemId, usuarioId);
    }
}
