const Product = require("../models/productModel");
const Supplier = require("../models/supplierModel");

// FUNCIÓN PARA OBTENER TODOS LOS PRODUCTOS (CON PAGINACIÓN)
const getAllProducts = async (page, limit) => {
  try {
    // Calcular el offset
    const offset = (page - 1) * limit;

    // Obtener productos con count y rows
    const { count, rows } = await Product.findAndCountAll({
      limit: limit,
      offset: offset,
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

    // Calcular el total de páginas
    const totalPages = Math.ceil(count / limit);

    return {
      products: rows,
      totalProducts: count,
      totalPages: totalPages,
      currentPage: page,
    };
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
  const { name, category, price, stock, supplier_name } = productData;
  try {
    // Verificar si el producto ya existe
    const existingProduct = await Product.findOne({ where: { name } });
    if (existingProduct) {
      throw new Error("El producto ya está registrado");
    }

    // Buscar el proveedor por nombre
    const supplier = await Supplier.findOne({ where: { name: supplier_name } });
    if (!supplier) {
      throw new Error("Proveedor no encontrado");
    }

    const product = await Product.create({
      name,
      category,
      price,
      stock,
      id_supplier: supplier.id_supplier, // Usamos el ID del proveedor encontrado
    });

    return product;
  } catch (error) {
    console.error("Error al crear un producto:", error);
    throw error;
  }
};

// FUNCIÓN PARA ACTUALIZAR UN PRODUCTO
const updateProduct = async (id, productData) => {
  const { name, category, price, stock, supplier_name } = productData;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error("El producto no existe");
    }

    // Buscar el proveedor por nombre si se proporciona
    let id_supplier;
    if (supplier_name) {
      const supplier = await Supplier.findOne({
        where: { name: supplier_name },
      });
      if (!supplier) {
        throw new Error("Proveedor no encontrado");
      }
      id_supplier = supplier.id_supplier;
    }

    // Actualizar el producto con el id_supplier encontrado
    await product.update({
      name,
      category,
      price,
      stock,
      id_supplier: id_supplier || product.id_supplier,
    });

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
