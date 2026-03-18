import db from "../database/databases";
import { MovimentoEstoque } from "../models/Estoque";

export const EstoqueRepository = {
  // Não há tabela de movimento no schema, então apenas leitura e update direto no produto
  buscarEstoque(produto_id: number): number {
    const row = db
      .prepare("SELECT estoque FROM produtos WHERE id = ?")
      .get(produto_id) as { estoque: number } | undefined;
    return row?.estoque ?? 0;
  },

  atualizarEstoque(produto_id: number, novoEstoque: number): void {
    db.prepare("UPDATE produtos SET estoque = ? WHERE id = ?").run(
      novoEstoque,
      produto_id,
    );
  },
};
