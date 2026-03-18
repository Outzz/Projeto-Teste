import { Express, Request, Response } from "express";
import { ProdutoRepository } from "../repositories/ProdutoRepository";

export function ProdutoController(app: Express): void {
  app.post("/produtos", (req: Request, res: Response) => {
    try {
      ProdutoRepository.criar(req.body);
      res.status(201).json({ mensagem: "Produto criado com sucesso" });
    } catch (error) {
      res.status(500).json({ erro: "Erro ao criar produto", detalhe: error });
    }
  });

  app.get("/produtos", (_req: Request, res: Response) => {
    try {
      res.status(200).json(ProdutoRepository.listarTodos());
    } catch (error) {
      res.status(500).json({ erro: "Erro ao listar produtos", detalhe: error });
    }
  });

  app.get("/produtos/:id", (req: Request, res: Response) => {
    try {
      const produto = ProdutoRepository.buscarPorId(Number(req.params.id));
      if (!produto) {
        res.status(404).json({ erro: "Produto não encontrado" });
        return;
      }
      res.status(200).json(produto);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar produto", detalhe: error });
    }
  });

  app.put("/produtos/:id", (req: Request, res: Response) => {
    try {
      ProdutoRepository.atualizar(Number(req.params.id), req.body);
      res.status(200).json({ mensagem: "Produto atualizado com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ erro: "Erro ao atualizar produto", detalhe: error });
    }
  });
}
