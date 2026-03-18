export interface MovimentoEstoque {
  id?: number;
  produto_id: number;
  tipo: string;
  quantidade: number;
  data_hora: string;
}
