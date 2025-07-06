const db = require("../config/db");

// FUNCIÓN PARA OBTENER TODOS LOS PROVEEDORES
const getAllSuppliers = async () => {
  try {
    const result = await db.query(
      "SELECT * FROM suppliers ORDER BY id_supplier ASC"
    );
    return result.rows;
  } catch (err) {
    console.error("Erro al obtener provedores", err);
    throw err;
  }
};

// FUNCIÓN PARA OBTENER UN PROVEEDOR POR ID
const getSupplierById = async (id) => {
  try {
    const result = await db.query(
      "SELECT * FROM suppliers WHERE id_supplier = $1",
      [id]
    );
    return result.rows[0];
  } catch (err) {
    console.error("Error al obtener el proveedor", err);
    throw err;
  }
};

// FUNCIÓN PARA CREAR UN PROVEEDOR
const createSupplier = async (supplierData) => {
  const { name, phone, address, email } = supplierData;
  try {
    // VERIFICAR SI EL PROVEEDOR YA ESXISTE POS SU NOMBRE
    const nameCheck = await db.query(
      "SELECT * FROM suppliers WHERE name = $1",
      [name]
    );
    if (nameCheck.rows.length > 0) {
      throw new Error("El proveedor ya esta registrado");
    }
    const result = await db.query(
      "INSERT INTO suppliers (name, phone, address, email) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, phone, address, email]
    );
    return result.rows[0];
  } catch (err) {
    console.error("Error al crear un proveedor", err);
    throw err;
  }
};

// FUNCIÓN PARA ACTUALIZAR UN PROVEEDOR
const updateSupplier = async (id, supplierData) => {
  const { name, phone, address, email } = supplierData;
  try {
    // Verificar si el proveedor existe
    const supplierCheck = await db.query(
      "SELECT * FROM suppliers WHERE id_supplier = $1",
      [id]
    );
    if (supplierCheck.rows.length === 0) {
      throw new Error("El proveedor no existe");
    }
    const result = await db.query(
      "UPDATE suppliers SET  name = $1, phone = $2, address = $3, email = $4 WHERE id_supplier = $5 RETURNING*",
      [name, phone, address, email, id]
    );
    return result.rows[0];
  } catch (err) {
    console.error("Error al actualizar el proveedor", err);
    throw err;
  }
};

// FUNCIÓN PARA ELIMIAR UN PROVEEDOR
const deleteSupplier = async (id) => {
  try {
    // Verificar si el proveedor existe
    const supplierCheck = await db.query(
      "SELECT * FROM suppliers WHERE id_supplier = $1",
      [id]
    );
    if (supplierCheck.rows.length === 0) {
      throw new Error("El proveedor no existe");
    }
    // SI EL PROVEEDOR EXISTE, SE ELIMINA
    const result = await db.query(
      "DELETE FROM suppliers WHERE id_supplier = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (err) {
    console.error("Error al eliminar el proveedor:", err);
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
