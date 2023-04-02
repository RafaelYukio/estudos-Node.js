import express from "express";
import cors from "cors";
import PedidosController from "../controllers/pedidos.controller.js";

// route é responsável por apenas direcionar a requisição

const router = express.Router();
router.post("/", PedidosController.createPedido);

// GET com cors liberado
router.get("/:id", cors(), PedidosController.getPedido);
router.get("/valor/cliente/:cliente", PedidosController.getSomaValoresCliente);
router.get("/valor/produto/:produto", PedidosController.getSomaValoresProduto);
router.get("/produtos/mais-vendidos", PedidosController.getMaisVendidos);
router.delete("/:id", PedidosController.deletePedido);
router.patch("/:id", PedidosController.updatePedido);
router.patch("/entregue/:id", PedidosController.updateEntregaPedido);

router.use((err, req, res, next) => {
  global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  if (req.method == "GET") res.status(404).send({ error: err.message });
  else res.status(400).send({ error: err.message });
});

export default router;
