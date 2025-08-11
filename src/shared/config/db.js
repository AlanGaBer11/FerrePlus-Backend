const { Sequelize } = require("sequelize");

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.sequelize = new Sequelize({
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
    this.sequelize
      .authenticate()
      .then(() =>
        console.log(
          "Conexión a PostgreSQL establecida correctamente con Sequelize."
        )
      )
      .catch((error) =>
        console.error("Error al conectar a PostgreSQL:", error)
      );

    Database.instance = this;
  }

  getConnection() {
    return this.sequelize;
  }
}

// Exportar una única instancia
const database = new Database();
module.exports = database.getConnection();
