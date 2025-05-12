import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateItemDto, DeletarItemDto } from './cardapio.dto';
import { CardapioService } from './cardapio.service';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cardapio')
export class CardapioController {
    constructor(private readonly CardapioService: CardapioService) { }


    @Post('adicionar')
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor('imagem', {
        fileFilter: (req, file, callback) => {
            if (!file.mimetype.startsWith('image/')) {
                return callback(new BadRequestException('Apenas arquivos de imagem são permitidos.'), false);
            }
            callback(null, true);
        },
    }))
    async criarItem(
        @UploadedFile() imagem: Express.Multer.File, @Body() dto: CreateItemDto) {
        const novoItem = await this.CardapioService.createItem(dto, imagem);
        return {
            message: 'Item criado com sucesso!',
            novoItem
        };
    }

    @Get('listar')
    async listar() {
        return this.CardapioService.listarItens();
    }

    @Delete(':id')
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deletarItem(@Param() dto: DeletarItemDto) {
        return this.CardapioService.deletarItem(dto);
    }

    @Patch(':id')
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor('imagem', {
        fileFilter: (req, file, callback) => {
            if (file && !file.mimetype.startsWith('image/')) {
                return callback(new BadRequestException('Apenas arquivos de imagem são permitidos.'), false);
            }
            callback(null, true);
        },
    }))
    async atualizarItem(
        @Param('id') id: string,
        @UploadedFile() imagem: Express.Multer.File,
        @Body() dto: Partial<CreateItemDto>,
    ) {
        const itemAtualizado = await this.CardapioService.updateItem(id, dto, imagem);
        return {
            message: 'Item atualizado com sucesso!',
            itemAtualizado
        };
    }

}
