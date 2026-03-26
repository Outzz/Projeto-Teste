import db from "../database/databases";
import { Avaliacao } from "../models/Avaliacao";

export const AvaliacaoRepository = {
  criar(avaliacao: Avaliacao): number {
    const result = db
      .prepare(
        `INSERT INTO avaliacoes (produto_id, cliente_id, venda_id, nota, titulo, comentario)
         VALUES (?, ?, ?, ?, ?, ?)`,
      )
      .run(
        avaliacao.produto_id,
        avaliacao.cliente_id,
        avaliacao.venda_id,
        avaliacao.nota,
        avaliacao.titulo ?? null,
        avaliacao.comentario ?? null,
      );
    return result.lastInsertRowid as number;
  },

  buscarPorProduto(produto_id: number): Avaliacao[] {
    return db
      .prepare(
        `SELECT a.*, c.nome AS nome_cliente
         FROM avaliacoes a
         JOIN clientes c ON c.id = a.cliente_id
         WHERE a.produto_id = ? AND a.aprovada = 1
         ORDER BY a.criado_em DESC`,
      )
      .all(produto_id) as Avaliacao[];
  },

  buscarPorCliente(cliente_id: number): Avaliacao[] {
    return db
      .prepare(
        "SELECT * FROM avaliacoes WHERE cliente_id = ? ORDER BY criado_em DESC",
      )
      .all(cliente_id) as Avaliacao[];
  },

  buscarPorId(id: number): Avaliacao | undefined {
    return db.prepare("SELECT * FROM avaliacoes WHERE id = ?").get(id) as
      | Avaliacao
      | undefined;
  },

  mediaPorProduto(produto_id: number): { media: number; total: number } {
    const row = db
      .prepare(
        `SELECT ROUND(AVG(nota), 1) AS media, COUNT(*) AS total
         FROM avaliacoes WHERE produto_id = ? AND aprovada = 1`,
      )
      .get(produto_id) as { media: number; total: number };
    return row ?? { media: 0, total: 0 };
  },

  aprovar(id: number): void {
    db.prepare("UPDATE avaliacoes SET aprovada = 1 WHERE id = ?").run(id);
  },

  reprovar(id: number): void {
    db.prepare("UPDATE avaliacoes SET aprovada = 0 WHERE id = ?").run(id);
  },

  clienteJaAvaliou(
    produto_id: number,
    cliente_id: number,
    venda_id: number,
  ): boolean {
    const row = db
      .prepare(
        "SELECT id FROM avaliacoes WHERE produto_id = ? AND cliente_id = ? AND venda_id = ?",
      )
      .get(produto_id, cliente_id, venda_id);
    return !!row;
  },

  pendentes(): Avaliacao[] {
    return db
      .prepare(
        "SELECT * FROM avaliacoes WHERE aprovada = 0 ORDER BY criado_em DESC",
      )
      .all() as Avaliacao[];
  },
};
