import PedidosRepository from "../repositories/pedidos.repository.js";

// service é responsável pelas regras de negócios
// não será feito a persistência de dados

async function createPedido(pedidoRequest) {
  return await PedidosRepository.insertPedido(pedidoRequest);
}

async function getPedido(id) {
  return await PedidosRepository.getPedido(id);
}

async function getSomaValoresCliente(cliente) {
  const pedidos = await PedidosRepository.getPedidos();
  return pedidos
    .reduce((acumulador, pedidoAtual) => {
      if (pedidoAtual.cliente == cliente && pedidoAtual.entregue == true) {
        acumulador += pedidoAtual.valor;
      }
      return acumulador;
    }, 0)
    .toString();
}

async function getSomaValoresProduto(produto) {
  const pedidos = await PedidosRepository.getPedidos();
  return pedidos
    .reduce((acumulador, pedidoAtual) => {
      if (pedidoAtual.produto == produto && pedidoAtual.entregue == true) {
        acumulador += pedidoAtual.valor;
      }
      return acumulador;
    }, 0)
    .toString();
}

async function getMaisVendidos() {
  const pedidos = await PedidosRepository.getPedidos();
  let maisVendidos = pedidos.reduce((acumulador, pedidoAtual) => {
    if (pedidoAtual.entregue == true) {
      if (acumulador.some((pedido) => pedido.produto == pedidoAtual.produto))
        acumulador[
          acumulador.findIndex(
            (pedido) => pedido.produto == pedidoAtual.produto
          )
        ].quantidade += 1;
      else acumulador.push({ produto: pedidoAtual.produto, quantidade: 1 });
    }
    return acumulador;
  }, []);

  return maisVendidos.sort((a, b) => b.quantidade - a.quantidade);
}

async function deletePedido(id) {
  await PedidosRepository.deletePedido(id);
}

async function updatePedido(id, pedido) {
  return await PedidosRepository.updatePedido(id, pedido);
}

async function updateEntregaPedido(id, entregue) {
  if (entregue == undefined) throw new Error("Query errada!");
  else {
    let pedido = await PedidosRepository.getPedido(id);
    return await PedidosRepository.updatePedido(id, {
      ...pedido,
      entregue: entregue === "true",
    });
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
