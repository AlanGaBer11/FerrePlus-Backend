const db = require('../config/db')

// FUNCIÓN PARA OBTENER TODOS LOS PRODUCTOS
const getAllProducts = async () => {
  try {
    const result = await db.query(
      'SELECT p.id_product, p.name, p.category, p.price, p.stock, s.name AS supplier_name FROM products p JOIN suppliers s ON p.id_supplier = s.id_supplier'
    )
    return result.rows
  } catch (err) {
    console.error('Error al obtener productos', err)
    throw err
  }
}

// FUNCIÓN PARA OBTENER UN PRODUCTO POR ID
const getProductById = async (id) => {
  try {
    const result = await db.query(
      'SELECT p.id_product, p.name, p.category, p.price, p.stock, s.name AS supplier_name FROM products p JOIN suppliers s ON p.id_supplier = s.id_supplier WHERE p.id_product = $1',
      [id]
    )
    return result.rows[0]
  } catch (err) {
    console.error('Error al obtener producto', err)
    throw err
  }
}

// FUNCTION PARA CREAR UN PRODUCTO
const createProduct = async (productData) => {
  const { name, category, price, stock, id_supplier } = productData
  try {
    // Verificar si el producto ya existe por nombre
    const nameCheck = await db.query('SELECT * FROM products WHERE name = $1', [
      name
    ])
    if (nameCheck.rows.length > 0) {
      throw new Error('El producto ya está registrado')
    }

    const result = await db.query(
      'INSERT INTO products (name, category, price, stock, id_supplier) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, category, price, stock, id_supplier]
    )
    return result.rows[0]
  } catch (err) {
    console.error('Error al crear un producto', err)
    throw err
  }
}

// FUNCTION PARA ACTUALIZAR UN PRODUCTO
const updateProduct = async (id, productData) => {
  const { name, category, price, stock, id_supplier } = productData
  try {
    // Verificar si el producto existe
    const productCheck = await db.query(
      'SELECT * FROM products WHERE id_product = $1',
      [id]
    )
    if (productCheck.rows.length === 0) {
      throw new Error('Producto no encontrado')
    }

    const result = await db.query(
      'UPDATE products SET name = $1, category = $2, price = $3, stock = $4, id_supplier = $5 WHERE id_product = $6 RETURNING *',
      [name, category, price, stock, id_supplier, id]
    )
    return result.rows[0]
  } catch (err) {
    console.error('Error al actualizar el producto', err)
    throw err
  }
}

// FUNCIÓN PARA ELIMINAR UN PRODUCTO
const deleteProduct = async (id) => {
  try {
    const result = await db.query(
      'DELETE FROM products WHERE id_product = $1 RETURNING *',
      [id]
    )
    if (result.rows.length === 0) {
      throw new Error('El producto no existe')
    }
    return result.rows[0]
  } catch (err) {
    console.error('Error al eliminar el producto:', err)
    throw err
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}
