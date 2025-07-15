# Bananoffe - Sistema de Pedidos de Tortas

Sistema para pedidos de tortas desenvolvido com NestJS (backend) e Next.js (frontend).

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [MongoDB](https://www.mongodb.com/try/download/community) (versão 5.0 ou superior)
- [Git](https://git-scm.com/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Instalação e Configuração

### 1. Clone o repositório

```powershell
git clone https://github.com/mdsreq-fga-unb/2025.1-T02-Bananoffe.git
cd 2025.1-T02-Bananoffe
```

### 2. Configuração do Backend

#### 2.1. Instalar dependências

```powershell
cd apps/backend
npm install
```

#### 2.2. Configurar MongoDB

**Opção 1: MongoDB Local**
1. Instale o MongoDB Community Edition
2. Inicie o serviço do MongoDB:
   ```powershell
   mongod --dbpath C:\data\db
   ```

**Opção 2: MongoDB Atlas (Cloud)**
1. Crie uma conta gratuita em [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crie um cluster
3. Configure a string de conexão no seu arquivo de configuração

#### 2.3. Configurar E-mail (opcional)

Para o sistema de e-mail funcionar, configure as credenciais SMTP conforme necessário.

### 3. Configuração do Frontend

#### 3.1. Instalar dependências

```powershell
cd ../frontend
npm install
```

#### 3.2. Configuração das variáveis

Configure as variáveis de ambiente conforme necessário para a aplicação.

## Executando o Projeto

### 1. Iniciar o Backend

```powershell
cd apps/backend
npm run start:dev
```

O backend estará rodando em: `http://localhost:8080`

### 2. Iniciar o Frontend

Em um novo terminal:

```powershell
cd apps/frontend
npm run dev
```

O frontend estará rodando em: `http://localhost:3000`

## Funcionalidades

- **Autenticação de usuários** (Login/Cadastro)
- **Gestão de cardápio** (Tortas e fatias)
- **Sistema de pedidos**
- **Sacola de compras**
- **Pagamentos via PIX**
- **Configurações do sistema**

## Scripts Disponíveis

### Backend

```powershell
npm run start          # Executa em produção
npm run start:dev      # Executa em desenvolvimento (watch mode)
npm run start:debug    # Executa em modo debug
npm run build          # Gera build de produção
```

### Frontend

```powershell
npm run dev            # Executa em desenvolvimento
npm run build          # Gera build de produção
npm run start          # Executa build de produção
```

## Estrutura do Projeto

```
2025.1-T02-Bananoffe/
├── apps/
│   ├── backend/              # API NestJS
│   │   ├── src/
│   │   │   ├── auth/         # Autenticação e autorização
│   │   │   ├── cardapio/     # Gestão do cardápio
│   │   │   ├── configuracoes/# Configurações do sistema
│   │   │   ├── database/     # Configuração do banco
│   │   │   ├── pagamentos/   # Sistema de pagamentos
│   │   │   ├── pedido/       # Gestão de pedidos
│   │   │   ├── sacola/       # Sacola de compras
│   │   │   ├── schemas/      # Schemas do MongoDB
│   │   │   ├── types/        # Tipos TypeScript
│   │   │   └── usuario/      # Gestão de usuários
│   │   └── test/            # Testes
│   └── frontend/            # Aplicação Next.js
│       ├── app/         # App Router do Next.js
│       ├── components/  # Componentes React
│       ├── context/     # Context API
│       ├── hooks/       # Custom hooks
│       ├── lib/         # Utilitários
│       ├── providers/   # Providers
│       └── types/       # Tipos TypeScript
```

## Tecnologias Utilizadas

### Backend
- **NestJS** - Framework Node.js
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação
- **Passport** - Middleware de autenticação
- **Nodemailer** - Envio de e-mails
- **Bcrypt** - Hash de senhas

### Frontend
- **Next.js 15** - Framework React
- **React 19** - Biblioteca UI
- **Chakra UI** - Biblioteca de componentes
- **TailwindCSS** - Framework CSS
- **NextAuth.js** - Autenticação
- **Axios** - Cliente HTTP
- **React Hook Form** - Formulários
- **Framer Motion** - Animações

## Troubleshooting

### Problemas Comuns

**1. Erro de conexão com MongoDB**
```
MongoNetworkError: failed to connect to server
```
- Verifique se o MongoDB está rodando
- Confirme a configuração de conexão com o banco

**2. Erro de CORS**
```
Access to fetch at 'http://localhost:8080' from origin 'http://localhost:3000' has been blocked by CORS policy
```
- Verifique as configurações de CORS no backend

**3. Erro de autenticação JWT**
```
JsonWebTokenError: invalid signature
```
- Verifique as configurações de JWT no backend e frontend

**4. Porta já em uso**
```
Error: listen EADDRINUSE: address already in use :::3000
```
- Altere a porta nas configurações ou mate o processo:
  ```powershell
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  ```

