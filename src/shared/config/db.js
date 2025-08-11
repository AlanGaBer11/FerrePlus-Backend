const { Sequelize } = require("sequelize");

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    const config = {
      logging: false,
      define: {
        timestamps: true,
        underscored: true,
      },
    };

    if (process.env.NODE_ENV === "production") {
      this.sequelize = new Sequelize(process.env.POSTGRES_URI_PROD, {
        ...config,
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      });
    } else {
      this.sequelize = new Sequelize({
        ...config,
        database: process.env.DB_NAME_LOCAL,
        username: process.env.DB_USER_LOCAL,
        password: process.env.DB_PASSWORD_LOCAL,
        host: process.env.DB_HOST_LOCAL,
        port: process.env.DB_PORT_LOCAL,
        dialect: "postgres",
      });
    }

    // Probar la conexión de manera asíncrona
    this.initializeConnection();

    Database.instance = this;
  }

  async initializeConnection() {
    try {
      await this.sequelize.authenticate();
      console.log(
        "✅ Conexión a PostgreSQL establecida correctamente con Sequelize."
      );
    } catch (error) {
      console.error("❌ Error al conectar a PostgreSQL:", error);
      throw error; // Re-throw para manejo superior
    }
  }

  getConnection() {
    return this.sequelize;
  }
}

// Exportar una única instancia
const database = new Database();
module.exports = database.getConnection();
