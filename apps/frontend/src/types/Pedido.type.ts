export interface UsuarioResumo {
  _id: string;
  nome: string;
  email: string;
}

export interface PedidoItem {
  produtoId: string; 
  nome: string;
  tipo: string;
  tamanho?: string;
  precoUnitario: number;
  quantidade: number;
  precoTotal: number;
}

export interface Pedido {
  _id: string;
  usuarioId: UsuarioResumo; 
  itens: PedidoItem[];
  valorTotal: number;
  createdAt?: string;
  updatedAt?: string;
}
