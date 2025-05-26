import { IsMongoId, IsNotEmpty, IsNumber, Min, IsOptional, IsIn, IsInt } from 'class-validator';

export class AdicionarProdutoDto {
  @IsMongoId()
  produtoId: string;

  @IsNotEmpty()
  tipo: 'Torta' | 'Fatia';

  @IsOptional()
  @IsIn(['P', 'G'])
  tamanho?: 'P' | 'G';

  @IsNumber()
  @Min(1)
  quantidade: number;
}

export class AtualizarQuantidadeDto {
  @IsInt()
  @Min(1, { message: 'A quantidade deve ser no mínimo 1' })
  quantidade: number;
}

