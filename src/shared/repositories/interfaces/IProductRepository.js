const IBaseRepository = require("./IBaseRepository");

class IProductRepository extends IBaseRepository {
  async findByName(name) {
    throw new Error("Método no implementado");
  }
}

module.exports = IProductRepository;
