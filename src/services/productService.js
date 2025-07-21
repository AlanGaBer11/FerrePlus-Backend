const Product = require("../models/productModel");
const Supplier = require("../models/supplierModel");

// FUNCIÓN PARA OBTENER TODOS LOS PRODUCTOS
const getAllProducts = async () => {
  try {
    const products = await Product.findAll({
      attributes: ["id_product", "name", "category", "price", "stock"], // Especificamos los atributos
      include: [
        {
          model: Supplier,
          as: "supplier",
          attributes: ["id_supplier", "name"],
        },
      ],
      order: [["id_product", "ASC"]],
    });
    return products;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

// FUNCIÓN PARA OBTENER UN PRODUCTO POR ID
const getProductById = async (id) => {
  try {
    const product = await Product.findByPk(id, {
      attributes: ["id_product", "name", "category", "price", "stock"], // Especificamos los atributos a mostrar
      include: [
        {
          model: Supplier,
          as: "supplier",
          attributes: ["id_supplier", "name"],
        },
      ],
    });
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw error;
  }
};

// FUNCIÓN PARA CREAR UN PRODUCTO
const createProduct = async (productData) => {
  const { name, category, price, stock, id_supplier } = productData;
  try {
    // Verificar si el producto ya existe
    const existingProduct = await Product.findOne({ where: { name } });
    if (existingProduct) {
      throw new Error("El producto ya está registrado");
    }

    const product = await Product.create({
      name,
      category,
      price,
      stock,
      id_supplier,
    });

    return product;
  } catch (error) {
    console.error("Error al crear un producto:", error);
    throw error;
  }
};

// FUNCIÓN PARA ACTUALIZAR UN PRODUCTO
const updateProduct = async (id, productData) => {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error("El producto no existe");
    }

    await product.update(productData);
    return product;
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw error;
  }
};

// FUNCIÓN PARA ELIMINAR UN PRODUCTO
const deleteProduct = async (id) => {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error("El producto no existe");
    }

    await product.destroy();
    return product;
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
