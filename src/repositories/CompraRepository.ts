import db from "../database/databases";
import { Compras } from "../models/Compra";

export const CompraRepository = {
  criar(venda: { cliente_id: number; total: number }): number {
    const result = db
      .prepare("INSERT INTO vendas (cliente_id, total) VALUES (?, ?)")
      .run(venda.cliente_id, venda.total);
    return result.lastInsertRowid as number;
  },

  adicionarItem(item: {
    venda_id: number;
    produto_id: number;
    quantidade: number;
    preco_unitario: number;
    subtotal: number;
  }): void {
    db.prepare(
      `
      INSERT INTO venda_itens (venda_id, produto_id, quantidade, preco_unitario, subtotal)
      VALUES (?, ?, ?, ?, ?)
    `,
    ).run(
      item.venda_id,
      item.produto_id,
      item.quantidade,
      item.preco_unitario,
      item.subtotal,
    );
  },

  listarTodas(): any[] {
    return db.prepare("SELECT * FROM vendas").all();
  },

  buscarPorId(id: number): any {
    return db.prepare("SELECT * FROM vendas WHERE id = ?").get(id);
  },

  buscarItensDaVenda(venda_id: number): any[] {
    return db
      .prepare("SELECT * FROM venda_itens WHERE venda_id = ?")
      .all(venda_id);
  },
};
