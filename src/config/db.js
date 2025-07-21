const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "postgres",
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  },
});

// Probar la conexión
sequelize
  .authenticate()
  .then(() =>
    console.log(
      "Conexión a PostgreSQL establecida correctamente con Sequelize."
    )
  )
  .catch((error) => console.error("Error al conectar a PostgreSQL:", error));

module.exports = sequelize;
