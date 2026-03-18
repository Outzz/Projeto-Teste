import { Express, Request, Response } from "express";
import { CompraRepository } from "../repositories/CompraRepository";
import { ProdutoRepository } from "../repositories/ProdutoRepository";
import { UsuarioRepository } from "../repositories/UsuarioRepository";

export function CompraController(app: Express): void {
  // POST /vendas — body: { cliente_id, itens: [{ produto_id, quantidade }] }
  app.post("/vendas", (req: Request, res: Response) => {
    try {
      const { cliente_id, itens } = req.body;

      const cliente = UsuarioRepository.buscarPorId(cliente_id);
      if (!cliente) {
        res.status(404).json({ erro: "Cliente não encontrado" });
        return;
      }

      let total = 0;

      // Valida estoque e calcula total
      for (const item of itens) {
        const produto = ProdutoRepository.buscarPorId(item.produto_id);
        if (!produto) {
          res
            .status(404)
            .json({ erro: `Produto ${item.produto_id} não encontrado` });
          return;
        }
        if (produto.estoque < item.quantidade) {
          res.status(400).json({
            erro: `Estoque insuficiente para o produto ${produto.nome}`,
          });
          return;
        }
        total += produto.valor_venda * item.quantidade;
      }

      // Cria a venda
      const venda_id = CompraRepository.criar({ cliente_id, total });

      // Insere itens e baixa estoque
      for (const item of itens) {
        const produto = ProdutoRepository.buscarPorId(item.produto_id)!;
        const subtotal = produto.valor_venda * item.quantidade;

        CompraRepository.adicionarItem({
          venda_id,
          produto_id: item.produto_id,
          quantidade: item.quantidade,
          preco_unitario: produto.valor_venda,
          subtotal,
        });

        ProdutoRepository.atualizarEstoque(
          item.produto_id,
          produto.estoque - item.quantidade,
        );
      }

      res
        .status(201)
        .json({ mensagem: "Venda realizada com sucesso", venda_id, total });
    } catch (error) {
      res.status(500).json({ erro: "Erro ao realizar venda", detalhe: error });
    }
  });

  app.get("/vendas", (_req: Request, res: Response) => {
    try {
      res.status(200).json(CompraRepository.listarTodas());
    } catch (error) {
      res.status(500).json({ erro: "Erro ao listar vendas", detalhe: error });
    }
  });

  app.get("/vendas/:id", (req: Request, res: Response) => {
    try {
      const venda = CompraRepository.buscarPorId(Number(req.params.id));
      if (!venda) {
        res.status(404).json({ erro: "Venda não encontrada" });
        return;
      }
      const itens = CompraRepository.buscarItensDaVenda(venda.id);
      res.status(200).json({ ...venda, itens });
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar venda", detalhe: error });
    }
  });
}
