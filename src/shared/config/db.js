const { Sequelize } = require("sequelize");

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    /*     this.sequelize = new Sequelize({
  database: process.env.DB_NAME_LOCAL,
  username: process.env.DB_USER_LOCAL,
  password: process.env.DB_PASSWORD_LOCAL,
  host: process.env.DB_HOST_LOCAL,
  port: process.env.DB_PORT_LOCAL,
  dialect: "postgres",
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  },
}); */

    this.sequelize = new Sequelize(process.env.POSTGRES_URI_PROD, {
      dialect: "postgres",
      logging: false,
      define: {
        timestamps: true,
        underscored: true,
      },
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    });

    // Probar la conexión
    this.sequelize
      .authenticate()
      .then(() =>
        console.log(
          "✅ Conexión a PostgreSQL establecida correctamente con Sequelize."
        )
      )
      .catch((error) =>
        console.error("❌ Error al conectar a PostgreSQL:", error)
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
