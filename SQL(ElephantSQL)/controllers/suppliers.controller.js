import SuppliersService from "../services/suppliers.service.js";

async function createSupplier(req, res, next) {
  try {
    let supplier = req.body;
    if (
      !supplier.name ||
      !supplier.cnpj ||
      !supplier.phone ||
      !supplier.email ||
      !supplier.address
    ) {
      throw new Error("Name, CNPJ, Phone, Email e Address são obrigatórios!");
    }
    res.send(await SuppliersService.createSupplier(supplier));
    global.logger.info(`POST /supplier - ${JSON.stringify(supplier)}`);
  } catch (err) {
    next(err);
  }
}

async function getSuppliers(req, res, next) {
  try {
    res.send(await SuppliersService.getSuppliers());
    global.logger.info(`GET /suppliers`);
  } catch (err) {
    next(err);
  }
}

async function getSupplier(req, res, next) {
  try {
    res.send(await SuppliersService.getSupplier(req.params.id));
    global.logger.info(`GET /suppliers/${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

async function deleteSupplier(req, res, next) {
  try {
    await SuppliersService.deleteSupplier(req.params.id);
    res.end();
    global.logger.info(`DELETE /delete/${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

async function updateSupplier(req, res, next) {
  try {
    let supplier = req.body;
    if (
      !supplier.name ||
      !supplier.cnpj ||
      !supplier.phone ||
      !supplier.email ||
      !supplier.address ||
      !supplier.supplier_id
    ) {
      throw new Error(
        "Name, CNPJ, Phone, Email, Address e Id são obrigatórios!"
      );
    }
    supplier = await SuppliersService.updateSupplier(supplier);
    res.send(supplier);
    global.logger.info(`PUT /supplier - ${JSON.stringify(supplier)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createSupplier,
  getSuppliers,
  getSupplier,
  deleteSupplier,
  updateSupplier,
};
