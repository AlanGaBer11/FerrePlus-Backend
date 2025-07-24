const supplierService = require("..//services/supplierService");

const getAllSuppliers = async () => {
  try {
    const suppliers = await supplierService.getAllSuppliers();
    return suppliers;
  } catch (err) {
    console.error("Erro al obtener proveedores", err);
    throw err;
  }
};

const getSupplierById = async (id) => {
  try {
    const supplier = await supplierService.getSupplierById(id);
    return supplier;
  } catch (err) {
    console.error("Error al obtener proveedor", err);
    throw err;
  }
};

const createSupplier = async (supplierData) => {
  try {
    // const supplierData = { name, phone, address, email };
    const newSupplier = await supplierService.createSupplier(supplierData);
    return newSupplier;
  } catch (err) {
    console.error("Error al crear proveedor", err);
    throw err;
  }
};

const updateSupplier = async (id, supplierData) => {
  try {
    // const supplierData = { name, phone, address, email };
    const updatedSupplier = await supplierService.updateSupplier(
      id,
      supplierData
    );
    return updatedSupplier;
  } catch (err) {
    console.error("Error al actualizar proveedor:", err);
    throw err;
  }
};

const deleteSupplier = async (id) => {
  try {
    const deleteSupplier = await supplierService.deleteSupplier(id);
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
