const Supplier = require("../../../shared/models/supplierModel");

// FUNCIÓN PARA OBTENER TODOS LOS PROVEEDORES (CON PAGINACIÓN)
const getAllSuppliers = async (page, limit) => {
  try {
    // Calcular el offset
    const offset = (page - 1) * limit;

    // Obtener proveedores con count y rows

    const { count, rows } = await Supplier.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [["id_supplier", "ASC"]],
    });

    // Calcula el total de páginas
    const totalPages = Math.ceil(count / limit);

    return {
      suppliers: rows,
      totalSuppliers: count,
      totalPages: totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error al obtener proveedores:", error);
    throw error;
  }
};

// FUNCIÓN PARA OBTENER UN PROVEEDOR POR ID
const getSupplierById = async (id) => {
  try {
    const supplier = await Supplier.findByPk(id);
    if (!supplier) {
      throw new Error("Proveedor no encontrado");
    }
    return supplier;
  } catch (error) {
    console.error("Error al obtener el proveedor:", error);
    throw error;
  }
};

// FUNCIÓN PARA CREAR UN PROVEEDOR
const createSupplier = async (supplierData) => {
  const { name, phone, address, email } = supplierData;
  try {
    // VERIFICAR SI EL PROVEEDOR YA EXISTE POR SU NOMBRE
    const existingSupplier = await Supplier.findOne({
      where: { name },
    });

    if (existingSupplier) {
      throw new Error("El proveedor ya está registrado");
    }

    const supplier = await Supplier.create({
      name,
      phone,
      address,
      email,
    });

    return supplier;
  } catch (error) {
    console.error("Error al crear un proveedor:", error);
    throw error;
  }
};

// FUNCIÓN PARA ACTUALIZAR UN PROVEEDOR
const updateSupplier = async (id, supplierData) => {
  try {
    const supplier = await Supplier.findByPk(id);
    if (!supplier) {
      throw new Error("El proveedor no existe");
    }

    await supplier.update(supplierData);
    return supplier;
  } catch (error) {
    console.error("Error al actualizar el proveedor:", error);
    throw error;
  }
};

// FUNCIÓN PARA ELIMINAR UN PROVEEDOR
const deleteSupplier = async (id) => {
  try {
    const supplier = await Supplier.findByPk(id);
    if (!supplier) {
      throw new Error("El proveedor no existe");
    }

    await supplier.destroy();
    return supplier;
  } catch (error) {
    console.error("Error al eliminar el proveedor:", error);
    throw error;
  }
};

module.exports = {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
