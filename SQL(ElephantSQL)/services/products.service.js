import ProductsRepository from "../repositories/products.repository.js";
import SuppliersRepository from "../repositories/suppliers.repository.js";

// Criado validação do supplier para criação e update de product

const createProduct = async (product) => {
  if (await SuppliersRepository.getSupplier(product.supplier_id))
    return await ProductsRepository.insertProduct(product);

  throw new Error("O supplier_id informado não existe!");
};

const getProducts = async () => await ProductsRepository.getProducts();

const getProduct = async (id) => await ProductsRepository.getProduct(id);

const deleteProduct = async (id) => await ProductsRepository.deleteProduct(id);

const updateProduct = async (product) => {
  if (await SuppliersRepository.getSupplier(product.supplier_id))
    await ProductsRepository.updateProduct(product);
    
  throw new Error("O supplier_id informado não existe!");
};

export default {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
