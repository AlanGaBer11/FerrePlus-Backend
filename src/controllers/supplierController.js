const supplierService = require("../services/supplierService");

const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await supplierService.getAllSuppliers();
    if (!suppliers || suppliers === 0) {
      return res
        .status(404)
        .json({ succes: false, message: "No hay proveedores" });
    }
    res
      .status(200)
      .json({ succes: true, message: "Proveedores obtenidos", suppliers });
  } catch (err) {
    console.error("Error al obtener los proveedores", err);
    res
      .status(500)
      .json({ succes: false, message: "Error interno en el servidor" });
  }
};

const getSupplierById = async (req, res) => {
  try {
    const supplier = await supplierService.getSupplierById(req.params.id);
    if (!supplier) {
      return res
        .status(404)
        .json({ succes: false, message: "Proveedor no encontrado" });
    }
    res
      .status(200)
      .json({ succes: true, message: "Proveedor obtenido", supplier });
  } catch (err) {
    console.error("Error al obtener el proveedor", err);
    res
      .status(500)
      .json({ succes: false, message: "Error interno del servidor" });
  }
};

const createSupplier = async (req, res) => {
  try {
    const { name, phone, address, email } = req.body;
    if (!name || !phone || !address || !email) {
      return res
        .status(400)
        .json({ succes: false, message: "Todos los campos son obligatorios" });
    }
    const newSupplier = await supplierService.createSupplier(
      name,
      phone,
      address,
      email
    );
    res
      .status(201)
      .json({ succes: true, message: "Proveedor creado", newSupplier });
  } catch (err) {
    console.error("Error al crear el proveedor", err);
    // Si es un error de proveedor duplicado
    if (err.message === "El proveedor ya está registrado") {
      return res.status(409).json({ success: false, message: err.message });
    }

    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

const updatedSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, address, email } = req.body;
    const updatedSupplier = await supplierService.updateSupplier(
      id,
      name,
      phone,
      address,
      email
    );
    if (!updatedSupplier) {
      return res
        .status(404)
        .json({ succes: false, message: "Proveedor no encontrado" });
    }
    res.status(200).json({
      succes: true,
      message: "Proveedor actualizado",
      updatedSupplier,
    });
  } catch (err) {
    console.error("Error al actualizar el proveedor", err);
    res
      .status(500)
      .json({ succes: false, message: "Error interno del servidor" });
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const deletedSupplier = await supplierService.deleteSupplier(req.params.id);
    if (!deletedSupplier) {
      return res
        .status(404)
        .json({ succes: false, message: "Proveedor no encontrado" });
    }
    res.status(200).json({ succes: true, message: "Proveedor eliminado" });
  } catch (err) {
    console.error("Erro al eliminar el proveedor", err);
    res
      .status(500)
      .json({ succes: false, message: "Error interno del servidor" });
  }
};

module.exports = {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updatedSupplier,
  deleteSupplier,
};
