const movementService = require("../services/movementService");

const getAllMovements = async (req, res) => {
  try {
    const movements = await movementService.getAllMovements();
    if (!movements || movements.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No hay movimientos" });
    }
    res
      .status(200)
      .json({ success: true, message: "Movimientos obtenios", movements });
  } catch (err) {
    console.error("Error al obtener movimientos", err);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

const getMovementById = async (req, res) => {
  try {
    const movement = await movementService.getMovementById(req.params.id);
    if (!movement) {
      return res
        .status(404)
        .json({ success: false, message: "Movimiento no encontrado" });
    }
    res
      .status(200)
      .json({ success: true, message: "Movimiento obtenido", movement });
  } catch (err) {
    console.error("Error al obtener movimiento", err);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

const createMovement = async (req, res) => {
  try {
    const { type, quantity, date, comments, id_product, id_user } = req.body;
    if (!type || !quantity || !date || !comments || !id_product || !id_user) {
      return res
        .status(400)
        .json({ success: false, message: "Todos los campos son obligatorios" });
    }
    const newMovement = await movementService.createMovement(
      type,
      quantity,
      date,
      comments,
      id_product,
      id_user
    );
    res
      .status(201)
      .json({ success: true, message: "Movimiento creado", newMovement });
  } catch (err) {
    console.error("Error al crear movimiento", err);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

const updateMovement = async (req, res) => {
  try {
    const { type, quantity, date, comments, id_product, id_user } = req.body;
    if (!type || !quantity || !date || !comments || !id_product || !id_user) {
      return res
        .status(400)
        .json({ success: false, message: "Todos los campos son obligatorios" });
    }
    const updatedMovement = await movementService.updateMovement(
      req.params.id,
      type,
      quantity,
      date,
      comments,
      id_product,
      id_user
    );
    res.status(200).json({
      success: true,
      message: "Movimiento actualizado",
      updatedMovement,
    });
  } catch (err) {
    console.error("Error al actualizar el movimiento", err);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

const deleteMovement = async (req, res) => {
  try {
    const deletedMovement = await movementService.deleteMovement(req.params.id);
    if (!deletedMovement) {
      return res
        .status(404)
        .json({ success: false, message: "Movimiento no encontrado" });
    }
    res.status(200).json({
      success: true,
      message: "Movimiento eliminado",
    });
  } catch (err) {
    console.error("Error al eliminar movimiento", err);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

module.exports = {
  getAllMovements,
  getMovementById,
  createMovement,
  updateMovement,
  deleteMovement,
};
