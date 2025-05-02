import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateItemDto {
    @IsNotEmpty({ message: "Nome não pode estar em branco." })
    nome: string;

    @IsNotEmpty()
    @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
    @IsNumber()
    precoTortaP: number;

    @IsNotEmpty()
    @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
    @IsNumber()
    precoTortaG: number;

    @IsNotEmpty()
    @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
    @IsNumber()
    precoPedacoP: number;

    @IsNotEmpty()
    @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
    @IsNumber()
    precoPedacoG: number;

    @IsOptional()
    @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
    @IsNumber()
    quantidade?: number;

    @IsOptional()
    imagem?: Buffer;

    @IsNotEmpty({ message: "Descrição não pode estar em branco." })
    descricao: string;
}

export class DeletarItemDto {
    @IsNotEmpty({ message: "ID não pode estar em branco." })
    id: string
}
