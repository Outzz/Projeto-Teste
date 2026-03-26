export type MetodoPagamento =
  | "pix"
  | "cartao_credito"
  | "cartao_debito"
  | "boleto";
export type StatusPagamento =
  | "pendente"
  | "aprovado"
  | "recusado"
  | "estornado";

export interface Pagamentos {
  id?: number;
  venda_id: number;
  metodo: MetodoPagamento;
  status?: StatusPagamento;
  valor: number;
  parcelas?: number;
  codigo_transacao?: string;
  pago_em?: string;
  criado_em?: string;
}
