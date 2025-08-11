const RepositoryConfig = require("../../../shared/config/repository");

class ProductService {
  constructor() {
    this.productRepository = RepositoryConfig.getRepository("product");
    this.supplierRepository = RepositoryConfig.getRepository("supplier");
  }

  async getAllProducts(page = 1, limit = 10) {
    try {
      return await this.productRepository.findAll(page, limit);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const product = await this.productRepository.findById(id);
      if (!product) {
        throw new Error("Producto no encontrado");
      }
      return product;
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      throw error;
    }
  }

  async createProduct(productData) {
    try {
      const { name, supplier_name } = productData;

      // Verificar si el producto ya existe
      const existingProduct = await this.productRepository.findByName(name);
      if (existingProduct) {
        throw new Error("El producto ya está registrado");
      }

      // Buscar el proveedor
      const supplier = await this.supplierRepository.findByName(supplier_name);
      if (!supplier) {
        throw new Error("Proveedor no encontrado");
      }

      // Crear el producto con el id del proveedor
      const productToCreate = {
        ...productData,
        id_supplier: supplier.id_supplier,
      };

      return await this.productRepository.create(productToCreate);
    } catch (error) {
      console.error("Error al crear un producto:", error);
      throw error;
    }
  }

  async updateProduct(id, productData) {
    try {
      const { supplier_name, ...updateData } = productData;

      // Si se proporciona un nuevo proveedor, obtener su ID
      if (supplier_name) {
        const supplier = await this.supplierRepository.findByName(
          supplier_name
        );
        if (!supplier) {
          throw new Error("Proveedor no encontrado");
        }
        updateData.id_supplier = supplier.id_supplier;
      }

      return await this.productRepository.update(id, updateData);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      return await this.productRepository.delete(id);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      throw error;
    }
  }
}

module.exports = new ProductService();
