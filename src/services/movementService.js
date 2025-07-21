const Movement = require("../models/movementModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

// FUNCIÓN PARA OBTENER TODOS LOS MOVIMIENTOS
const getAllMovements = async () => {
  try {
    const movements = await Movement.findAll({
      attributes: ["id_movement", "type", "quantity", "date", "comments"],
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id_product", "name"],
        },
        {
          model: User,
          as: "user",
          attributes: ["id_user", "name", "email"],
        },
      ],
      order: [["id_movement", "ASC"]],
    });
    return movements;
  } catch (error) {
    console.error("Error al obtener movimientos:", error);
    throw error;
  }
};

// FUNCIÓN PARA OBTENER UN MOVIMIENTO POR ID
const getMovementById = async (id) => {
  try {
    const movement = await Movement.findByPk(id, {
      attributes: ["id_movement", "type", "quantity", "date", "comments"],

      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id_product", "name"],
        },
        {
          model: User,
          as: "user",
          attributes: ["id_user", "name", "email"],
        },
      ],
    });
    if (!movement) {
      throw new Error("Movimiento no encontrado");
    }
    return movement;
  } catch (error) {
    console.error("Error al obtener el movimiento:", error);
    throw error;
  }
};

// FUNCIÓN PARA CREAR UN MOVIMIENTO
const createMovement = async (movementData) => {
  const { type, quantity, date, comments, id_product, id_user } = movementData;
  try {
    // Verificar si el producto existe
    const product = await Product.findByPk(id_product);
    if (!product) {
      throw new Error("El producto no existe");
    }

    const movement = await Movement.create({
      type,
      quantity,
      date,
      comments,
      id_product,
      id_user,
    });

    return movement;
  } catch (error) {
    console.error("Error al crear movimiento:", error);
    throw error;
  }
};

// FUNCIÓN PARA ACTUALIZAR UN MOVIMIENTO
const updateMovement = async (id, movementData) => {
  try {
    const movement = await Movement.findByPk(id);
    if (!movement) {
      throw new Error("El movimiento no existe");
    }

    await movement.update(movementData);
    return movement;
  } catch (error) {
    console.error("Error al actualizar el movimiento:", error);
    throw error;
  }
};

// FUNCIÓN PARA ELIMINAR UN MOVIMIENTO
const deleteMovement = async (id) => {
  try {
    const movement = await Movement.findByPk(id);
    if (!movement) {
      throw new Error("El movimiento no existe");
    }

    await movement.destroy();
    return movement;
  } catch (error) {
    console.error("Error al eliminar el movimiento:", error);
    throw error;
  }
};

module.exports = {
  getAllMovements,
  getMovementById,
  createMovement,
  updateMovement,
  deleteMovement,
};
