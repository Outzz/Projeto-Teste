export interface Produto {
  id?: number;
  nome: string;
  descricao: string;
  caregoria: string;
  estoque: number;
  tamanho: string;
  cor: string;
  codigo_barras: string;
  valor_custo: number;
  valor_venda: number;
  fornecedor_id: number;
}
