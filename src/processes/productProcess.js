const productService = require("../services/productService");

const getAllProducts = async () => {
  try {
    const products = await productService.getAllProducts();
    return products;
  } catch (err) {
    console.error("Error al obtener productos", err);
    throw err;
  }
};

const getProductById = async (id) => {
  try {
    const product = await productService.getProductById(id);
    return product;
  } catch (err) {
    console.error("Error al obtener producto", err);
    throw err;
  }
};

const createProduct = async (name, category, price, stock, id_supplier) => {
  try {
    const productData = { name, category, price, stock, id_supplier };
    const newProduct = await productService.createProduct(productData);
    return newProduct;
  } catch (err) {
    console.error("Error al crear producto", err);
    throw err;
  }
};

const updateProduct = async (id, name, category, price, stock, id_supplier) => {
  try {
    const productData = { name, category, price, stock, id_supplier, id };
    const updatedProduct = await productService.updateProduct(id, productData);
    return updatedProduct;
  } catch (err) {
    console.error("Error al actualizar producto", err);
    throw err;
  }
};

const deleteProduct = async (id) => {
  try {
    const deletedProduct = await productService.deleteProduct(id);
    return deletedProduct;
  } catch (err) {
    console.error("Error al eliminar producto", err);
    throw err;
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
