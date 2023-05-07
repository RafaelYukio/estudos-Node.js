import ProductsService from "../services/products.service.js";

async function createProduct(req, res, next) {
  try {
    let product = req.body;
    if (
      !product.name ||
      !product.description ||
      !product.value ||
      !product.stock ||
      !product.supplier_id
    ) {
      throw new Error("Name, Description, Value, Stock e supplier_id são obrigatórios!");
    }
    res.send(await ProductsService.createProduct(product));
    global.logger.info(`POST /product - ${JSON.stringify(product)}`);
  } catch (err) {
    next(err);
  }
}

async function getProducts(req, res, next) {
  try {
    res.send(await ProductsService.getProducts());
    global.logger.info(`GET /products`);
  } catch (err) {
    next(err);
  }
}

async function getProduct(req, res, next) {
  try {
    res.send(await ProductsService.getProduct(req.params.id));
    global.logger.info(`GET /products/${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    await ProductsService.deleteProduct(req.params.id);
    res.end();
    global.logger.info(`DELETE /delete/${req.params.id}`);
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    let product = req.body;
    if (
      !product.name ||
      !product.description ||
      !product.value ||
      !product.stock ||
      !product.supplier_id ||
      !product.product_id
    ) {
      throw new Error(
        "Name, Description, Value, Stock, supplier_id e Id são obrigatórios!"
      );
    }
    product = await ProductsService.updateProduct(product);
    res.send(product);
    global.logger.info(`PUT /product - ${JSON.stringify(product)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
