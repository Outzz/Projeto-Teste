import express from "express";
import { UsuarioController } from "./controllers/UsuarioController";
import { ProdutoController } from "./controllers/ProdutoController";
import { CompraController } from "./controllers/CompraController";
import { EstoqueController } from "./controllers/EstoqueController";

export const app = express();
app.use(express.json());

UsuarioController(app);
ProdutoController(app);
CompraController(app);
EstoqueController(app);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
