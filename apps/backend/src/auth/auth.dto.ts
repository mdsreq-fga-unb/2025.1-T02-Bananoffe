import { IsEmail, IsNotEmpty, IsOptional, IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from 'src/types/role';

export class CreateUsuarioDto {
  @IsNotEmpty({message:"Nome não pode estar em branco."})
  nome: string;
  
  @IsNotEmpty({message:"Telefone não pode estar em branco."})
  telefone: string;
  
  @IsOptional()
  dataNascimento?: Date;
  
  @IsEmail()
  @IsNotEmpty({message:"Email não pode estar em branco."})
  email: string;
  
  @IsNotEmpty({message:"Senha não pode estar em branco."})
  @MinLength(6,{message:"A Senha precisa de pelo menos 6 caracteres"})
  senha: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

export class DeletarUsuarioDto{
  @IsNotEmpty({message:"ID não pode estar em branco."})
  id: string
}

export class LoginUsuarioDto {
  @IsEmail()
  @IsNotEmpty({message:"Email não pode estar em branco."})
  email: string;
  
  @IsNotEmpty({message:"Senha não pode estar em branco."})
  senha: string;
}

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  dataNascimento?: string;

  @IsOptional()
  @MinLength(6)
  senha?: string;
}

export class JwtPayload {
  id: string;
  nome: string;
  role: string;
}
