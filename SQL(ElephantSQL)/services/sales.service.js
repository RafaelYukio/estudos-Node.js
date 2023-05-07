import ClientsRepository from "../repositories/clients.repository.js";
import SalesRepository from "../repositories/sales.repository.js";
import ProductsRepository from "../repositories/products.repository.js";

// Validação se o produto e cliente existem e se há estoque do produto
const createSale = async (sale) => {
  const product = await ProductsRepository.getProduct(sale.product_id);

  if (
    (await ClientsRepository.getClient(sale.client_id)) &&
    product.stock >= 1
  ) {
    product.stock--;
    ProductsRepository.updateProduct(product);
    return await SalesRepository.insertSale(sale);
  }

  throw new Error(
    "O client_id/product_id informado não existe ou produto sem estoque!"
  );
};

const getSales = async (product_id) => {
  if (product_id) return await SalesRepository.getSalesByProductId(product_id);
  else return await SalesRepository.getSales();
};
const getSale = async (id) => await SalesRepository.getSale(id);

const deleteSale = async (id) => {
  const sale = await SalesRepository.getSale(id);
  if (sale) {
    await SalesRepository.deleteSale(id);
    let product = await ProductsRepository.getProduct(sale.product_id);
    product.stock++;
    await ProductsRepository.updateProduct(product);
  }
};

const updateSale = async (sale) => {
  if (
    (await ClientsRepository.getClient(sale.client_id)) &&
    (await ProductsRepository.getProduct(sale.product_id))
  )
    return await SalesRepository.updateSale(sale);

  throw new Error("O client_id ou product_id informado não existe!");
};

export default {
  createSale,
  getSales,
  getSale,
  deleteSale,
  updateSale,
};
