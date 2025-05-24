export interface Product {
  Tortas: Torta[]
  Fatias: Fatia[]
}

export interface Torta {
   _id: string;
  nome: string;
  descricao: string;
  precoTortaP: number;
  precoTortaG: number;
  quantidade: number;
  imagem?: string;
}

export interface Fatia {
   _id: string;
  nome: string;
  descricao: string;
  precoFatia: number;
  quantidade: number;
  imagem?: string;
}