const { Pool } = require("pg");

class Database {
  constructor() {
    if (!Database.instance) {
      this.pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
      });

      this.pool
        .connect()
        .then(() => console.log("Conexión a PostgreSQL Establecida"))
        .catch((err) =>
          console.error("Error en la Conexión a PostgreSQL:", err)
        );

      Database.instance = this;
    }

    return Database.instance;
  }

  query(text, params) {
    return this.pool.query(text, params);
  }
}

const instance = new Database();
Object.freeze(instance);

module.exports = instance;
