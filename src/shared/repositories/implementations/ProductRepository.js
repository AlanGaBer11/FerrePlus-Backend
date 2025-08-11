const IProductRepository = require("../interfaces/IProductRepository");
const Product = require("../../models/productModel");
const Supplier = require("../../models/supplierModel");

class ProductRepository extends IProductRepository {
  async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const { count, rows } = await Product.findAndCountAll({
      limit: limit,
      offset: offset,
      attributes: ["id_product", "name", "category", "price", "stock"],
      include: [
        {
          model: Supplier,
          as: "supplier",
          attributes: ["id_supplier", "name"],
        },
      ],
      order: [["id_product", "ASC"]],
    });

    return {
      products: rows,
      totalProducts: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  }

  async findById(id) {
    return await Product.findByPk(id, {
      attributes: ["id_product", "name", "category", "price", "stock"],
      include: [
        {
          model: Supplier,
          as: "supplier",
          attributes: ["id_supplier", "name"],
        },
      ],
    });
  }

  async findByName(name) {
    return await Product.findOne({
      where: { name },
      include: [
        {
          model: Supplier,
          as: "supplier",
          attributes: ["id_supplier", "name"],
        },
      ],
    });
  }

  async create(productData) {
    return await Product.create(productData);
  }

  async update(id, productData) {
    const product = await this.findById(id);
    if (!product) throw new Error("Producto no encontrado");
    return await product.update(productData);
  }

  async delete(id) {
    const product = await this.findById(id);
    if (!product) throw new Error("Producto no encontrado");
    await product.destroy();
    return product;
  }
}

module.exports = ProductRepository;
