const movementProcess = require("../processes/movementProcess");

const getAllMovements = async (req, res) => {
  try {
    // Obtener parámetros de paginación
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Validar que los valores seean positivos
    if (page < 1 || limit < 1) {
      return res.status(400).json({
        success: false,
        message: "Los parámetros page y limit deben ser números positivos",
      });
    }

    // Limitar el máximo de elementos por página
    const maxLimit = 100;
    const finalLimit = limit > maxLimit ? maxLimit : limit;

    // Obtener movimientos con paginación
    const result = await movementProcess.getAllMovements(page, finalLimit);
    if (!result.movements || result.movements.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No hay movimientos en está página" });
    }

    res.status(200).json({
      success: true,
      message: "Movimientos obtenidos",
      movements: result.movements,
      pagination: {
        currentPage: page,
        totalPages: result.totalPages,
        totalMovements: result.totalMovements,
        movementsPerPage: finalLimit,
        hasNextPage: page < result.totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (err) {
    console.error("Error al obtener movimientos", err);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

const getMovementById = async (req, res) => {
  try {
    const movement = await movementProcess.getMovementById(req.params.id);
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
    const { type, quantity, date, comments, product_name, user_name } =
      req.body;
    if (
      !type ||
      !quantity ||
      !date ||
      !comments ||
      !product_name ||
      !user_name
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Todos los campos son obligatorios" });
    }
    const newMovement = await movementProcess.createMovement({
      type,
      quantity,
      date,
      comments,
      product_name,
      user_name,
    });
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
    const { type, quantity, date, comments, product_name, user_name } =
      req.body;
    if (
      !type ||
      !quantity ||
      !date ||
      !comments ||
      !product_name ||
      !user_name
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Todos los campos son obligatorios" });
    }
    const updatedMovement = await movementProcess.updateMovement(
      req.params.id,
      {
        type,
        quantity,
        date,
        comments,
        product_name,
        user_name,
      }
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
    const deletedMovement = await movementProcess.deleteMovement(req.params.id);
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
