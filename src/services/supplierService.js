const supplierModel = require("../models/supplierModel");

const getAllSuppliers = async () => {
  try {
    const suppliers = await supplierModel.getAllSuppliers();
    return suppliers;
  } catch (err) {
    console.error("Erro al obtener proveedores", err);
    throw err;
  }
};

const getSupplierById = async (id) => {
  try {
    const supplier = await supplierModel.getSupplierById(id);
    return supplier;
  } catch (err) {
    console.error("Error al obtener proveedor", err);
    throw err;
  }
};

const createSupplier = async (name, phone, address, email) => {
  try {
    const supplierData = { name, phone, address, email };
    const newSupplier = await supplierModel.createSupplier(supplierData);
    return newSupplier;
  } catch (err) {
    console.error("Error al crear proveedor", err);
    throw err;
  }
};

const updateSupplier = async (id, name, phone, address, email) => {
  try {
    const userData = { name, phone, address, email };
    const updatedSupplier = await supplierModel.updateSupplier(id, userData);
    return updatedSupplier;
  } catch (err) {
    console.error("Error al actualizar proveedor:", err);
    throw err;
  }
};

const deleteSupplier = async (id) => {
  try {
    const deleteSupplier = await supplierModel.deleteSupplier(id);
    return deleteSupplier;
  } catch (err) {
    console.error("Error al eliminar proveedor:", err);
    throw err;
  }
};

module.exports = {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
