export interface ItensSacola {
  produtoId: string;
  _id: string;
  nome: string;
  tipo: string;
  precoUnitario: number;
  quantidade: number;
  precoTotal: number;
  tamanho?:string
}

export interface Sacola {
    usuarioId: string
    itens: ItensSacola[]
    valorTotal:number
}