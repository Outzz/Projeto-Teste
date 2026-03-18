import db from "../database/databases";
import { Produto } from "../models/Produto";

export const ProdutoRepository = {
  criar(produto: Produto): void {
    db.prepare(
      "INSERT INTO produtos (nome, preco, estoque) VALUES (?, ?, ?)",
    ).run(produto.nome, produto.valor_venda, produto.estoque);
  },

  listarTodos(): Produto[] {
    return db.prepare("SELECT * FROM produtos").all() as Produto[];
  },

  buscarPorId(id: number): Produto | undefined {
    return db.prepare("SELECT * FROM produtos WHERE id = ?").get(id) as
      | Produto
      | undefined;
  },

  atualizar(id: number, dados: Partial<Produto>): void {
    const campos = Object.keys(dados)
      .map((k) => `${k} = ?`)
      .join(", ");
    const valores = [...Object.values(dados), id];
    db.prepare(`UPDATE produtos SET ${campos} WHERE id = ?`).run(...valores);
  },

  atualizarEstoque(id: number, novoEstoque: number): void {
    db.prepare("UPDATE produtos SET estoque = ? WHERE id = ?").run(
      novoEstoque,
      id,
    );
  },
};
