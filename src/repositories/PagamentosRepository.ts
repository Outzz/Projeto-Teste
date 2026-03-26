import db from "../database/databases";
import { Pagamentos } from "../models/Pagamentos";

export const PagamentoRepository = {
  criar(pagamento: Pagamentos): number {
    const result = db
      .prepare(
        `INSERT INTO pagamentos (venda_id, metodo, status, valor, parcelas, codigo_transacao)
         VALUES (?, ?, ?, ?, ?, ?)`,
      )
      .run(
        pagamento.venda_id,
        pagamento.metodo,
        pagamento.status ?? "pendente",
        pagamento.valor,
        pagamento.parcelas ?? 1,
        pagamento.codigo_transacao ?? null,
      );
    return result.lastInsertRowid as number;
  },

  buscarPorVenda(venda_id: number): Pagamentos | undefined {
    return db
      .prepare("SELECT * FROM pagamentos WHERE venda_id = ?")
      .get(venda_id) as Pagamentos | undefined;
  },

  buscarPorId(id: number): Pagamentos | undefined {
    return db.prepare("SELECT * FROM pagamentos WHERE id = ?").get(id) as
      | Pagamentos
      | undefined;
  },

  aprovar(id: number, codigo_transacao?: string): void {
    db.prepare(
      `UPDATE pagamentos
       SET status = 'aprovado', pago_em = datetime('now'), codigo_transacao = COALESCE(?, codigo_transacao)
       WHERE id = ?`,
    ).run(codigo_transacao ?? null, id);
  },

  recusar(id: number): void {
    db.prepare("UPDATE pagamentos SET status = 'recusado' WHERE id = ?").run(
      id,
    );
  },

  estornar(id: number): void {
    db.prepare("UPDATE pagamentos SET status = 'estornado' WHERE id = ?").run(
      id,
    );
  },

  listarTodos(): Pagamentos[] {
    return db
      .prepare("SELECT * FROM pagamentos ORDER BY criado_em DESC")
      .all() as Pagamentos[];
  },
};
