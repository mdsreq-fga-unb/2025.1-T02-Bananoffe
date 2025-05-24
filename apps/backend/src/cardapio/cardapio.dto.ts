import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateTortaDto {
    @IsNotEmpty({ message: "Nome não pode estar em branco." })
    nome: string;

    @IsNotEmpty({ message: "Descrição não pode estar em branco." })
    descricao: string;

    @IsNotEmpty()
    @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
    @IsNumber()
    precoTortaP: number;

    @IsNotEmpty()
    @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
    @IsNumber()
    precoTortaG: number;

    @IsOptional()
    @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
    @IsNumber()
    quantidade?: number;

    @IsOptional()
    imagem?: Buffer;
}

export class CreateFatiaDto {
    @IsNotEmpty({ message: "Nome não pode estar em branco." })
    nome: string;

    @IsNotEmpty({ message: "Descrição não pode estar em branco." })
    descricao: string;

    @IsNotEmpty()
    @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
    @IsNumber()
    precoFatia: number;

    @IsOptional()
    @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
    @IsNumber()
    quantidade?: number;

    @IsOptional()
    imagem?: Buffer;
}

export class CreateItensDto {
    @IsNotEmpty({ message: "Nome não pode estar em branco." })
    nome: string;

    @IsNotEmpty({ message: "Descrição não pode estar em branco." })
    descricao: string;

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
    precoFatia: number;

    @IsOptional()
    @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
    @IsNumber()
    quantidadeFatia?: number;

    @IsOptional()
    @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
    @IsNumber()
    quantidadeTorta?: number;

    @IsOptional()
    imagemTorta?: Buffer;

    @IsOptional()
    imagemFatia?: Buffer;
}

export class DeletarItemDto {
    @IsNotEmpty({ message: "ID não pode estar em branco." })
    id: string
}
