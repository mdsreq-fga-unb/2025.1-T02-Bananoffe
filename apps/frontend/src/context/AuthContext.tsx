'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toaster } from '@/components/ui/toaster';
import { User } from '@/types/User.type';

interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [, setCurrentUser] = useState<User | null>(session?.user ?? null);

  useEffect(() => {
    if (session?.user) {
      setCurrentUser(session.user);
    }
  }, [session]);

  const login = async (email: string, password: string) => {
    const res = await signIn("credentials", {
      email,
      senha: password,  // Só confirma que o backend espera 'senha' mesmo?
      redirect: false,
    });

    if (res?.error) {
      let description = "";

      switch (res.error) {
        case "CredentialsSignin":
          description = "Email ou senha incorretos. Por favor, tente novamente.";
          break;
        case "OAuthAccountNotLinked":
          description = "Conta não vinculada. Use outra forma de login.";
          break;
        default:
          description = "Erro ao fazer login. Por favor, tente novamente mais tarde.";
      }

      toaster.create({
        title: "Erro ao fazer login",
        description,
        type: "error",
      });
    } else {
      toaster.create({
        title: "Login realizado com sucesso!",
        type: "success",
        duration: 2000,
      });

      const session = await getSession();
      router.push(session?.user?.role === "admin" ? "/admin_cardapio" : "/");
    }
  };

  const logout = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        setUser: setCurrentUser,
        login,
        logout,
        isLoading: status === 'loading',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
