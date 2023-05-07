import SalesService from "../services/sales.service.js";

async function createSale(req, res, next) {
  try {
    let sale = req.body;
    if (!sale.value || !sale.date || !sale.client_id || !sale.product_id) {
      throw new Error("Value, Date, client_id e product_id são obrigatórios!");
    }
    res.send(await SalesService.createSale(sale));
    global.logger.info(`POST /sale - ${JSON.stringify(sale)}`);
  } catch (err) {
    next(err);
  }
}

async function getSales(req, res, next) {
  try {
    res.send(await SalesService.getSales(req.query.product_id));
    global.logger.info(`GET /sales`);
  } catch (err) {
    next(err);
  }
}

async function getSale(req, res, next) {
  try {
    res.send(await SalesService.getSale(req.params.id));
    global.logger.info(`GET /sales/${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

async function deleteSale(req, res, next) {
  try {
    await SalesService.deleteSale(req.params.id);
    res.end();
    global.logger.info(`DELETE /delete/${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

async function updateSale(req, res, next) {
  try {
    let sale = req.body;
    if (
      !sale.value ||
      !sale.date ||
      !sale.client_id ||
      !sale.sale_id
    ) {
      throw new Error(
        "Value, Date, client_id e Id são obrigatórios!"
      );
    }
    sale = await SalesService.updateSale(sale);
    res.send(sale);
    global.logger.info(`PUT /sale - ${JSON.stringify(sale)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createSale,
  getSales,
  getSale,
  deleteSale,
  updateSale,
};
