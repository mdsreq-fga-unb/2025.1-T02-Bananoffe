export type UserRole = "admin" | "cliente";

export interface User {
  id: string;
  nome: string;
  telefone: string;
  dataNascimento?: string;
  email: string;
  role: UserRole;
  senha?: string;
}

export interface CreateUserDto extends Omit<User, "id" | "role"> {
  senha: string;
}

export interface UpdateUserDto extends Partial<Omit<User, "senha">> {
  id: string;
  senha?: string;
}

export interface ResetPasswordDto {
  email: string;
  codigo: string;
  novaSenha: string;
}
