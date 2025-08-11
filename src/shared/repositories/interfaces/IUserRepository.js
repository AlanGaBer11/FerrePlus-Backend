const IBaseRepository = require("./IBaseRepository");

class IUserRepository extends IBaseRepository {
  async deactivate(id) {
    throw new Error("Método no implementado");
  }
  async reactivate(id) {
    throw new Error("Método no implementado");
  }

  async findByName(name) {
    throw new Error("Método no implementado");
  }
}

module.exports = IUserRepository;
