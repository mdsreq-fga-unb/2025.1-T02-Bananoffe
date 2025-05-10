export interface Product {
  id: string;
  nome: string;
  descricao: string;
  precoTortaP: number;
  precoTortaG: number;
  precoPedacoP: number;
  precoPedacoG: number;
  quantidade: number;
  imagem?: string;
}
