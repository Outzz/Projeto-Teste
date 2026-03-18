import { Express, Request, Response } from "express";
import { EstoqueRepository } from "../repositories/EstoqueRepository";

export function EstoqueController(app: Express): void {
  app.get("/estoque/:produto_id", (req: Request, res: Response) => {
    try {
      const estoque = EstoqueRepository.buscarEstoque(
        Number(req.params.produto_id),
      );
      res.status(200).json({ produto_id: req.params.produto_id, estoque });
    } catch (error) {
      res.status(500).json({ erro: "Erro ao buscar estoque", detalhe: error });
    }
  });

  app.put("/estoque/:produto_id", (req: Request, res: Response) => {
    try {
      const { quantidade } = req.body;
      EstoqueRepository.atualizarEstoque(
        Number(req.params.produto_id),
        quantidade,
      );
      res.status(200).json({ mensagem: "Estoque atualizado com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ erro: "Erro ao atualizar estoque", detalhe: error });
    }
  });
}
