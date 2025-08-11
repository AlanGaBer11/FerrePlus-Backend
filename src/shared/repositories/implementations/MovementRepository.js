const IMovementRepository = require("../interfaces/IMovementRepository");
const Movement = require("../../models/movementModel");
const Product = require("../../models/productModel");
const User = require("../../models/userModel");

class MovementRepository extends IMovementRepository {
  async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
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

    return {
      movements: rows,
      totalMovements: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  }

  async findById(id) {
    return await Movement.findByPk(id, {
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
  }

  async create(movementData) {
    return await Movement.create(movementData);
  }

  async update(id, movementData) {
    const movement = await this.findById(id);
    if (!movement) throw new Error("Movimiento no encontrado");
    return await movement.update(movementData);
  }

  async delete(id) {
    const movement = await this.findById(id);
    if (!movement) throw new Error("Movimiento no encontrado");
    await movement.destroy();
    return movement;
  }
}

module.exports = MovementRepository;
