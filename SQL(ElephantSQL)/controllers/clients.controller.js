import ClientsService from "../services/clients.service.js";

async function createClient(req, res, next) {
  try {
    let client = req.body;
    if (
      !client.name ||
      !client.cpf ||
      !client.phone ||
      !client.email ||
      !client.address
    ) {
      throw new Error("Name, CPF, Phone, Email e Address são obrigatórios!");
    }
    res.send(await ClientsService.createClient(client));
    global.logger.info(`POST /client - ${JSON.stringify(client)}`);
  } catch (err) {
    next(err);
  }
}

async function getClients(req, res, next) {
  try {
    res.send(await ClientsService.getClients());
    global.logger.info(`GET /clients`);
  } catch (err) {
    next(err);
  }
}

async function getClient(req, res, next) {
  try {
    res.send(await ClientsService.getClient(req.params.id));
    global.logger.info(`GET /clients/${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

async function deleteClient(req, res, next) {
  try {
    await ClientsService.deleteClient(req.params.id);
    res.end();
    global.logger.info(`DELETE /delete/${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

async function updateClient(req, res, next) {
  try {
    let client = req.body;
    if (
      !client.name ||
      !client.cpf ||
      !client.phone ||
      !client.email ||
      !client.address ||
      !client.client_id
    ) {
      throw new Error(
        "Name, CPF, Phone, Email, Address e Id são obrigatórios!"
      );
    }
    client = await ClientsService.updateClient(client);
    res.send(client);
    global.logger.info(`PUT /client - ${JSON.stringify(client)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createClient,
  getClients,
  getClient,
  deleteClient,
  updateClient,
};
