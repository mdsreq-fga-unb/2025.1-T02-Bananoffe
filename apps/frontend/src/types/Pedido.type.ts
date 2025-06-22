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
  usuarioId: string;
  itens: PedidoItem[];
  valorTotal: number;
  createdAt?: string;
  updatedAt?: string;
}