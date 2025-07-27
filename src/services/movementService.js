const Movement = require("../models/movementModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

// FUNCIÓN PARA OBTENER TODOS LOS MOVIMIENTOS (CON PAGINACIÓN)
const getAllMovements = async (page, limit) => {
  try {
    // Calcular el offset
    const offset = (page - 1) * limit;

    // Obtener movimientos con count y rows
    const { count, rows } = await Movement.findAndCountAll({
      limit: limit,
      offset: offset,
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

    // Calcular el total de página
    const totalPages = Math.ceil(count / limit);

    return {
      movements: rows,
      totalMovements: count,
      totalPages: totalPages,
      currentPage: page,
    };
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
  const { type, quantity, date, comments, product_name, user_name } =
    movementData;
  try {
    // Buscar el producto por su nombre
    const product = await Product.findOne({ where: { name: product_name } });
    if (!product) {
      throw new Error("Producto no encontrado");
    }

    // Buscar el usuario por su nombre
    const user = await User.findOne({ where: { name: user_name } });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const movement = await Movement.create({
      type,
      quantity,
      date,
      comments,
      id_product: product.id_product,
      id_user: user.id_user,
    });

    return movement;
  } catch (error) {
    console.error("Error al crear movimiento:", error);
    throw error;
  }
};

// FUNCIÓN PARA ACTUALIZAR UN MOVIMIENTO
const updateMovement = async (id, movementData) => {
  const { type, quantity, date, comments, product_name, user_name } =
    movementData;
  try {
    const movement = await Movement.findByPk(id);
    if (!movement) {
      throw new Error("El movimiento no existe");
    }
    // Buscar el producto por nombre si se proporciona
    let id_product;
    if (product_name) {
      const product = await Product.findOne({
        where: { name: product_name },
      });
      if (!product) {
        throw new Error("Producto no encontrado");
      }
      id_product = product.id_product;
    }

    // Buscar el usuario por nombre si se proporciona
    let id_user;
    if (user_name) {
      const user = await User.findOne({ where: { name: user_name } });
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      id_user = user.id_user;
    }

    await movement.update({
      type,
      quantity,
      date,
      comments,
      id_product: id_product || movement.id_product,
      id_user: id_user || movement.id_user,
    });

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
