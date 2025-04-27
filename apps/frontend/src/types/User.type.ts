export type UserRole = 'admin' | 'cliente';

export interface User {
  id: string; 
  nome: string;
  telefone: string;
  dataNascimento?: string; 
  email: string;
  role: UserRole;
  senha?: string;
}
