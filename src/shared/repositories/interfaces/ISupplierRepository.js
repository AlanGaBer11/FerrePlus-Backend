const IBaseRepository = require("./IBaseRepository");

class ISupplierRepository extends IBaseRepository {
  async findByName(name) {
    throw new Error("Método no implementado");
  }
}

module.exports = ISupplierRepository;
