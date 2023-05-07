import SuppliersRepository from "../repositories/suppliers.repository.js";

const createSupplier = async (supplier) =>
  await SuppliersRepository.insertSupplier(supplier);

const getSuppliers = async () => await SuppliersRepository.getSuppliers();

const getSupplier = async (id) => await SuppliersRepository.getSupplier(id);

const deleteSupplier = async (id) => await SuppliersRepository.deleteSupplier(id);

const updateSupplier = async (supplier) =>
  await SuppliersRepository.updateSupplier(supplier);

export default {
  createSupplier,
  getSuppliers,
  getSupplier,
  deleteSupplier,
  updateSupplier,
};
