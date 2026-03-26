export interface Avaliacao {
  id?: number;
  produto_id: number;
  cliente_id: number;
  venda_id: number;
  nota: number; // 1–5
  titulo?: string;
  comentario?: string;
  aprovada?: number; // 0 | 1
  criado_em?: string;
}
