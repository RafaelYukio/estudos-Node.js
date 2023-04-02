import PedidosService from "../services/pedidos.service.js";

// controller é responsável apenas por receber e validar as requisições
// não será feito regras de negócios ou persistência de dados

async function createPedido(req, res, next) {
  try {
    res.send(await PedidosService.createPedido(req.body));
    logger.info(`POST / - ${JSON.stringify(pedidoRequest)}`);
  } catch (err) {
    next(err, req);
  }
}
async function getPedido(req, res, next) {
  try {
    const pedido = await PedidosService.getPedido(req.params.id);
    res.send(pedido);
    global.logger.info(`GET /${req.params.id} - ${JSON.stringify(pedido)}`);
  } catch (err) {
    next(err, req);
  }
}

async function getSomaValoresCliente(req, res, next) {
  try {
    let valorTotal = await PedidosService.getSomaValoresCliente(
      req.params.cliente
    );

    res.send(valorTotal);
    global.logger.info(
      `GET /valor/cliente/${req.params.cliente} - ${valorTotal}`
    );
  } catch (err) {
    next(err, req);
  }
}

async function getSomaValoresProduto(req, res, next) {
  try {
    let valorTotal = await PedidosService.getSomaValoresProduto(
      req.params.produto
    );

    res.send(valorTotal);
    global.logger.info(
      `GET /valor/produto/${req.params.produto} - ${valorTotal}`
    );
  } catch (err) {
    next(err, req);
  }
}

async function getMaisVendidos(req, res, next) {
  try {
    let maisVendidos = await PedidosService.getMaisVendidos();

    res.send(
      maisVendidos.map((pedido) => `${pedido.produto} - ${pedido.quantidade}`)
    );
    global.logger.info(
      `GET /produtos/mais-vendidos - ${JSON.stringify(maisVendidos)}`
    );
  } catch (err) {
    next(err, req);
  }
}

async function deletePedido(req, res, next) {
  try {
    await PedidosService.deletePedido(req.params.id);

    res.end();
    global.logger.info(`DELETE /${req.params.id}`);
  } catch (err) {
    next(err, req);
  }
}

async function updatePedido(req, res, next) {
  try {
    let updatedPedido = await PedidosService.updatePedido(
      req.params.id,
      req.body
    );

    res.send(updatedPedido);
    global.logger.info(
      `PATCH /${req.params.id} - ${JSON.stringify(updatedPedido)}`
    );
  } catch (err) {
    next(err, req);
  }
}

async function updateEntregaPedido(req, res, next) {
  try {
    let updatedPedido = await PedidosService.updateEntregaPedido(
      req.params.id,
      req.query.entregue
    );

    res.send(updatedPedido);
    global.logger.info(
      `PATCH /entregue/${req.params.id} - ${JSON.stringify(updatedPedido)}`
    );
  } catch (err) {
    next(err, req);
  }
}

export default {
  createPedido,
  getPedido,
  getSomaValoresCliente,
  getSomaValoresProduto,
  getMaisVendidos,
  deletePedido,
  updatePedido,
  updateEntregaPedido,
};
