const db = require('../config/db')

// FUNCIÓN PARA OBTENER TODOS LOS MOVIMIENTOS
const getAllMovements = async () => {
  try {
    const result = await db.query('SELECT * FROM movements')
    return result.rows
  } catch (err) {
    console.error('Error al obtener movimientos', err)
    throw err
  }
}

// FUNCIÓN PARA OBTENER UN MOVIMIENTO POR ID
const getMovementById = async (id) => {
  try {
    const result = await db.query(
      'SELECT * FROM movements WHERE id_movement = $1',
      [id]
    )
    return result.rows[0]
  } catch (err) {
    console.error('Error al obtener movimiento', err)
    throw err
  }
}

// FUNCIÓN PARA CREAR UN MOVIMIENTO
const createMovement = async (movementData) => {
  const { type, quantity, date, comments, id_product, id_user } = movementData
  try {
    // Verificar si el producto existe
    const productCheck = await db.query(
      'SELECT * FROM products WHERE id_product = $1',
      [id_product]
    )
    if (productCheck.rows.length === 0) {
      throw new Error('El producto no existe')
    }

    const result = await db.query(
      'INSERT INTO movements (type, quantity, date, comments, id_product, id_user) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [type, quantity, date, comments, id_product, id_user]
    )
    return result.rows[0]
  } catch (err) {
    console.error('Error al crean movimiento', err)
    throw err
  }
}

// FUNCIÓN PARA ACTUALIZAR UN MOVIMIENTO
const updateMovement = async (id, movementData) => {
  const { type, quantity, date, comments, id_product, id_user } = movementData
  try {
    // Verificar si el movimiento existe
    const movementCheck = await db.query(
      'SELECT * FROM movements WHERE id_movement = $1',
      [id]
    )
    if (movementCheck.rows.length === 0) {
      throw new Error('El movimiento no existe')
    }

    const result = await db.query(
      'UPDATE movements SET type = $1, quantity = $2, date = $3, comments = $4, id_product = $5, id_user = $6 WHERE id_movement = $7 RETURNING *',
      [type, quantity, date, comments, id_product, id_user, id]
    )
    return result.rows[0]
  } catch (err) {
    console.error('Error al actualizar movimiento', err)
    throw err
  }
}

// FUNCIÓN PARA ELIMINAR UN MOVIMIENTO
const deleteMovement = async (id) => {
  try {
    // VERIFICAMOS SI EL MOVIMIENTO EXISTE
    const movementCheck = await db.query(
      'SELECT * FROM movements WHERE id_movement = $1',
      [id]
    )
    if (movementCheck.rows.length === 0) {
      throw new Error('El movimiento no existe')
    }
    const result = await db.query(
      'DELETE FROM movements WHERE id_movement = $1 RETURNING*',
      [id]
    )
    return result.rows[0]
  } catch (err) {
    console.error(('Erro al eliminar movimiento', err))
    throw err
  }
}

module.exports = {
  getAllMovements,
  getMovementById,
  createMovement,
  updateMovement,
  deleteMovement
}
