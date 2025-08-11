class RepositoryConfig {
  static getRepository(type) {
    const repositories = {
      user: require("../repositories/implementations/UserRepository"),
      supplier: require("../repositories/implementations/SupplierRepository"),
      product: require("../repositories/implementations/ProductRepository"),
      movement: require("../repositories/implementations/MovementRepository"),
    };

    return new repositories[type]();
  }
}

module.exports = RepositoryConfig;
