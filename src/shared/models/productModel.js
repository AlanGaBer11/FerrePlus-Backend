const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Supplier = require("./supplierModel");

const Product = sequelize.define(
  "Product",
  {
    id_product: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    id_supplier: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Supplier,
        key: "id_supplier",
      },
    },
  },
  {
    tableName: "products",
    timestamps: false,
    freezeTableName: true,
  }
);

Product.belongsTo(Supplier, {
  foreignKey: "id_supplier",
  as: "supplier",
});

module.exports = Product;
