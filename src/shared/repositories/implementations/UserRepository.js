const IUserRepository = require("../interfaces/IUserRepository");
const User = require("../../models/userModel");

class UserRepository extends IUserRepository {
  async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const { count, rows } = await User.findAndCountAll({
      limit,
      offset,
      attributes: { exclude: ["password", "verificationCode"] },
      order: [["id_user", "ASC"]],
    });

    return {
      users: rows,
      totalUsers: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  }

  async findById(id) {
    return await User.findByPk(id, {
      attributes: { exclude: ["password", "verificationCode"] },
    });
  }

  async findByName(name) {
    return await User.findOne({
      where: { name },
      attributes: { exclude: ["password", "verificationCode"] },
    });
  }

  async create(userData) {
    return await User.create(userData);
  }

  async update(id, userData) {
    const user = await this.findById(id);
    if (!user) throw new Error("Usuario no encontrado");
    return await user.update(userData);
  }
  async delete(id) {
    const user = await this.findById(id);
    if (!user) throw new Error("Usuario no encontrado");

    // 🚫 Evitar borrar un usuario con rol ADMIN
    if (user.role && user.role.toUpperCase() === "ADMIN") {
      throw new Error("No se puede eliminar un usuario con rol ADMIN");
    }

    await user.destroy();
    return user;
  }

  async deactivate(id) {
    const user = await this.findById(id);
    if (!user) throw new Error("Usuario no encontrado");

    // 🚫 Evitar desactivar un usuario con rol ADMIN
    if (user.role && user.role.toUpperCase() === "ADMIN") {
      throw new Error("No se puede desactivar un usuario con rol ADMIN");
    }

    if (!user.status) throw new Error("Usuario ya está desactivado");
    return await user.update({ status: false });
  }

  async reactivate(id) {
    const user = await this.findById(id);
    if (!user) throw new Error("Usuario no encontrado");
    if (user.status) throw new Error("Usuario ya está activo");
    return await user.update({ status: true });
  }
}

module.exports = UserRepository;
