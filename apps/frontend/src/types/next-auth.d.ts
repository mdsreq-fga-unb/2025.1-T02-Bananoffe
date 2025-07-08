import { UserRole } from "./User.type";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      nome: string;
      telefone: string;
      dataNascimento?: string;
      email: string;
      role: UserRole;
      accessToken: string;
    };
  }

  interface User {
    id: string;
    nome: string;
    telefone: string;
    dataNascimento?: string;
    email: string;
    role: UserRole;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    nome: string;
    telefone: string;
    dataNascimento?: string;
    email: string;
    role: UserRole;
    accessToken: string;
  }
}
