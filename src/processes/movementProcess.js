const movementService = require("../services/movementService");

const getAllMovements = async (page, limit) => {
  try {
    const movements = await movementService.getAllMovements(page, limit);
    return movements;
  } catch (err) {
    console.error("Error al obtener movimientos", err);
    throw err;
  }
};

const getMovementById = async (id) => {
  try {
    const movement = await movementService.getMovementById(id);
    return movement;
  } catch (err) {
    console.error("Error al obtener movimiento", err);
    throw err;
  }
};

const createMovement = async (movementData) => {
  try {
    // const movementData = { type, quantity, date, comments, product_name, user_name };
    const newMovement = await movementService.createMovement(movementData);
    return newMovement;
  } catch (err) {
    console.error("Error al crear movimiento", err);
    throw err;
  }
};

const updateMovement = async (id, movementData) => {
  try {
    // const movementData = { type, quantity, date, comments, id_product, id_user };
    const updatedMovement = await movementService.updateMovement(
      id,
      movementData
    );
    return updatedMovement;
  } catch (err) {
    console.error("Error al actualizar movimiento", err);
    throw err;
  }
};

const deleteMovement = async (id) => {
  try {
    const deletedMovement = await movementService.deleteMovement(id);
    return deletedMovement;
  } catch (err) {
    console.error("Error al eliminar movimiento", err);
    throw err;
  }
};

module.exports = {
  getAllMovements,
  getMovementById,
  createMovement,
  updateMovement,
  deleteMovement,
};
