import db from "../database/databases";
import { Usuario } from "../models/Usuario";

export const UsuarioRepository = {
  criar(cliente: Usuario): void {
    db.prepare("INSERT INTO clientes (nome, email) VALUES (?, ?)").run(
      cliente.nome,
      cliente.email,
    );
  },

  buscarPorEmail(email: string): Usuario | undefined {
    return db.prepare("SELECT * FROM clientes WHERE email = ?").get(email) as
      | Usuario
      | undefined;
  },

  buscarPorId(id: number): Usuario | undefined {
    return db.prepare("SELECT * FROM clientes WHERE id = ?").get(id) as
      | Usuario
      | undefined;
  },

  listarTodos(): Usuario[] {
    return db.prepare("SELECT * FROM clientes").all() as Usuario[];
  },
};
