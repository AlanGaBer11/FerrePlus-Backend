const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Product = require("./productModel");
const User = require("./userModel");

const Movement = sequelize.define(
  "Movement",
  {
    id_movement: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        isIn: [["Entrada", "Salida"]],
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id_product",
      },
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id_user",
      },
    },
  },
  {
    tableName: "movements",
    timestamps: false,
    freezeTableName: true,
  }
);

Movement.belongsTo(Product, {
  foreignKey: "id_product",
  as: "product",
});

Movement.belongsTo(User, {
  foreignKey: "id_user",
  as: "user",
});

module.exports = Movement;
