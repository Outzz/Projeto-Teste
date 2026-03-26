import db from "../database/databases";
import { Usuarios } from "../models/Usuarios";

export const UsuarioRepository = {
  criar(cliente: Usuarios): void {
    db.prepare("INSERT INTO clientes (nome, email) VALUES (?, ?)").run(
      cliente.nome,
      cliente.email,
    );
  },

  buscarPorEmail(email: string): Usuarios | undefined {
    return db.prepare("SELECT * FROM clientes WHERE email = ?").get(email) as
      | Usuarios
      | undefined;
  },

  buscarPorId(id: number): Usuarios | undefined {
    return db.prepare("SELECT * FROM clientes WHERE id = ?").get(id) as
      | Usuarios
      | undefined;
  },

  listarTodos(): Usuarios[] {
    return db.prepare("SELECT * FROM clientes").all() as Usuarios[];
  },
};
