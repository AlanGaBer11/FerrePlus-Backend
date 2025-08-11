const Supplier = require("../../models/supplierModel");
const ISupplierRepository = require("../interfaces/ISupplierRepository");

class SupplierRepository extends ISupplierRepository {
  async findAll(page = 1, limit = 10) {
    // Calcular el offset
    const offset = (page - 1) * limit;

    // Obtener proveedores con count y rows

    const { count, rows } = await Supplier.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [["id_supplier", "ASC"]],
    });

    // Calcula el total de páginas
    const totalPages = Math.ceil(count / limit);

    return {
      suppliers: rows,
      totalSuppliers: count,
      totalPages: totalPages,
      currentPage: page,
    };
  }

  async findById(id) {
    return await Supplier.findByPk(id);
  }

  async findByName(name) {
    return await Supplier.findOne({ where: { name } });
  }

  async create(supplierData) {
    return await Supplier.create(supplierData);
  }

  async update(id, supplierData) {
    const supplier = await this.findById(id);
    if (!supplier) throw new Error("Proveedor no encontrado");
    return await supplier.update(supplierData);
  }

  async delete(id) {
    const supplier = await this.findById(id);
    if (!supplier) throw new Error("Proveedor no encontrado");
    await supplier.destroy();
    return supplier;
  }
}

module.exports = SupplierRepository;
