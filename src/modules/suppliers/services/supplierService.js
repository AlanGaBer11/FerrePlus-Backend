const RepositoryConfig = require("../../../shared/config/repository");
class SupplierService {
  constructor() {
    this.supplierRepository = RepositoryConfig.getRepository("supplier");
  }

  async getAllSuppliers(page = 1, limit = 10) {
    try {
      return await this.supplierRepository.findAll(page, limit);
    } catch (error) {
      console.error("Error al obtener proveedores:", error);
      throw error;
    }
  }

  async getSupplierById(id) {
    try {
      const supplier = await this.supplierRepository.findById(id);
      if (!supplier) {
        throw new Error("Proveedor no encontrado");
      }
      return supplier;
    } catch (error) {
      console.error("Error al obtener el proveedor:", error);
      throw error;
    }
  }

  async createSupplier(supplierData) {
    try {
      const existingSupplier = await this.supplierRepository.findByName(
        supplierData.name
      );
      if (existingSupplier) {
        throw new Error("El proveedor ya está registrado");
      }

      return await this.supplierRepository.create(supplierData);
    } catch (error) {
      console.error("Error al crear un proveedor:", error);
      throw error;
    }
  }

  async updateSupplier(id, supplierData) {
    try {
      return await this.supplierRepository.update(id, supplierData);
    } catch (error) {
      console.error("Error al actualizar el proveedor:", error);
      throw error;
    }
  }

  async deleteSupplier(id) {
    try {
      return await this.supplierRepository.delete(id);
    } catch (error) {
      console.error("Error al eliminar el proveedor:", error);
      throw error;
    }
  }
}

module.exports = new SupplierService();
