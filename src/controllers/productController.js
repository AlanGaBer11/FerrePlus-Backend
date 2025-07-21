const productProcess = require("../processes/productProcess");

const getAllProducts = async (req, res) => {
  try {
    const products = await productProcess.getAllProducts();
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No hay productos" });
    }
    res
      .status(200)
      .json({ success: false, message: "Productos obtenidos", products });
  } catch (err) {
    console.error("Error al obtener los productos", err);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productProcess.getProductById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Producto no encontrado" });
    }
    res
      .status(200)
      .json({ success: true, message: "Producto obtenido", product });
  } catch (err) {
    console.error("Error al obtener el producto", err);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, category, price, stock, id_supplier } = req.body;
    if (!name || !category || !price || !stock || !id_supplier) {
      return res
        .status(400)
        .json({ success: false, message: "Todos los campos son obligatorios" });
    }
    const newProduct = await productProcess.createProduct(
      name,
      category,
      price,
      stock,
      id_supplier
    );
    res
      .status(201)
      .json({ success: true, message: "Producto creado", newProduct }); //
  } catch (err) {
    console.error("Error al crear el producto", err);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, category, price, stock, id_supplier } = req.body;
    if (!name || !category || !price || !stock || !id_supplier) {
      return res
        .status(400)
        .json({ success: false, message: "Todos los campos son obligatorios" });
    }
    const updatedProduct = await productProcess.updateProduct(
      req.params.id,
      name,
      category,
      price,
      stock,
      id_supplier
    );
    res.status(200).json({
      success: true,
      message: "Producto actualizado",
      updatedProduct,
    });
  } catch (err) {
    console.error("Error al actualizar el producto", err);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productProcess.deleteProduct(req.params.id);
    if (!deletedProduct) {
      res
        .status(404)
        .json({ success: false, message: "Producto no encontrado" });
    }
    res.status(200).json({
      success: true,
      message: "Producto eliminado",
    });
  } catch (err) {
    console.error("Error al eliminar el producto", err);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
