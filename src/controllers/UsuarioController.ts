import { Express, Request, Response } from "express";
import { UsuarioRepository } from "../repositories/UsuarioRepository";

export function UsuarioController(app: Express): void {
  app.post("/clientes", (req: Request, res: Response) => {
    try {
      const existente = UsuarioRepository.buscarPorEmail(req.body.email);
      if (existente) {
        res.status(409).json({ erro: "Email já cadastrado" });
        return;
      }
      UsuarioRepository.criar(req.body);
      res.status(201).json({ mensagem: "Cliente criado com sucesso" });
    } catch (error) {
      res.status(500).json({ erro: "Erro ao criar cliente", detalhe: error });
    }
  });

  app.get("/clientes", (_req: Request, res: Response) => {
    try {
      const clientes = UsuarioRepository.listarTodos();
      res.status(200).json(clientes);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao listar clientes", detalhe: error });
    }
  });
}
