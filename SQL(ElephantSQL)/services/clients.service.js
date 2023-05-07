import ClientsRepository from "../repositories/clients.repository.js";

const createClient = async (client) =>
  await ClientsRepository.insertClient(client);

const getClients = async () => await ClientsRepository.getClients();

const getClient = async (id) => await ClientsRepository.getClient(id);

const deleteClient = async (id) => await ClientsRepository.deleteClient(id);

const updateClient = async (client) =>
  await ClientsRepository.updateClient(client);

export default {
  createClient,
  getClients,
  getClient,
  deleteClient,
  updateClient,
};
