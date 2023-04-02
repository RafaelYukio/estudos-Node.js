import { promises as fs } from "fs";
const { writeFile, readFile } = fs;

async function getPedidos() {
  return (await global.pedidos()).pedidos;
}

async function getPedido(id) {
  return (await getPedidos()).find((pedido) => pedido.id == id);
}

async function insertPedido(pedidoRequest) {
  let database = JSON.parse(await readFile("pedidos.json"));

  pedidoRequest = {
    id: database.nextId++,
    ...pedidoRequest,
    entregue: false,
    timestamp: new Date(),
  };

  // Não necessita incrementar, pois na hora de inserir o id do pedido, já foi incrementado
  // pedidos.nextId++;
  database.pedidos.push(pedidoRequest);
  await writeFile("pedidos.json", JSON.stringify(database, null, 2));

  return pedidoRequest;
}

async function deletePedido(id) {
  let database = JSON.parse(await readFile("pedidos.json"));
  database.pedidos = database.pedidos.filter((pedido) => pedido.id != id);
  await writeFile("pedidos.json", JSON.stringify(database, null, 2));
}

async function updatePedido(id, pedido) {
  let database = JSON.parse(await readFile("pedidos.json"));

  let pedidoIndex = database.pedidos.findIndex((pedido) => pedido.id == id);

  if (pedidoIndex == -1) throw new Error("Pedido não encontrado!");

  database.pedidos[pedidoIndex] = {
    ...database.pedidos[pedidoIndex],
    ...pedido,
  };

  await writeFile("pedidos.json", JSON.stringify(database, null, 2));

  return database.pedidos[pedidoIndex];
}

export default {
  getPedidos,
  getPedido,
  insertPedido,
  deletePedido,
  updatePedido,
};
