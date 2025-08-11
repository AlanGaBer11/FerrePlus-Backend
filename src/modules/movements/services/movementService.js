const RepositoryConfig = require("../../../shared/config/repository");

class MovementService {
  constructor() {
    this.movementRepository = RepositoryConfig.getRepository("movement");
    this.productRepository = RepositoryConfig.getRepository("product");
    this.userRepository = RepositoryConfig.getRepository("user");
  }

  async getAllMovements(page = 1, limit = 10) {
    try {
      return await this.movementRepository.findAll(page, limit);
    } catch (error) {
      console.error("Error al obtener movimientos:", error);
      throw error;
    }
  }

  async getMovementById(id) {
    try {
      const movement = await this.movementRepository.findById(id);
      if (!movement) {
        throw new Error("Movimiento no encontrado");
      }
      return movement;
    } catch (error) {
      console.error("Error al obtener el movimiento:", error);
      throw error;
    }
  }

  async createMovement(movementData) {
    try {
      const { product_name, user_name, type, quantity, ...otherData } =
        movementData;

      // Buscar producto y usuario
      const product = await this.productRepository.findByName(product_name);
      if (!product) throw new Error("Producto no encontrado");

      const user = await this.userRepository.findByName(user_name);
      if (!user) throw new Error("Usuario no encontrado");

      // Actualizar stock del producto
      const newStock =
        type === "Entrada"
          ? product.stock + quantity
          : product.stock - quantity;

      if (newStock < 0) {
        throw new Error("Stock insuficiente para realizar la salida");
      }

      // Crear el movimiento
      const movement = await this.movementRepository.create({
        ...otherData,
        type,
        quantity,
        id_product: product.id_product,
        id_user: user.id_user,
      });

      return movement;
    } catch (error) {
      console.error("Error al crear movimiento:", error);
      throw error;
    }
  }

  async updateMovement(id, movementData) {
    try {
      const { product_name, user_name, ...updateData } = movementData;

      // Si se proporciona un nuevo producto
      if (product_name) {
        const product = await this.productRepository.findByName(product_name);
        if (!product) throw new Error("Producto no encontrado");
        updateData.id_product = product.id_product;
      }

      // Si se proporciona un nuevo usuario
      if (user_name) {
        const user = await this.userRepository.findByName(user_name);
        if (!user) throw new Error("Usuario no encontrado");
        updateData.id_user = user.id_user;
      }

      return await this.movementRepository.update(id, updateData);
    } catch (error) {
      console.error("Error al actualizar el movimiento:", error);
      throw error;
    }
  }

  async deleteMovement(id) {
    try {
      return await this.movementRepository.delete(id);
    } catch (error) {
      console.error("Error al eliminar el movimiento:", error);
      throw error;
    }
  }
}

module.exports = new MovementService();
