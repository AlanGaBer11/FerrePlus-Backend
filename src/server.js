require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const sequelize = require("./config/db");

// IMPORAR RUTAS
const userRoute = require("./routes/userRoute");
const supplierRoute = require("./routes/supplierRoute");
const productRoute = require("./routes/productRoutes");
const movementRoute = require("./routes/movementRoute");

// Sincronizar modelos con la base de datos
sequelize
  .sync({ alter: true }) // usar {force: true} solo en desarrollo
  .then(() => {
    console.log("Modelos sincronizados con la base de datos");
  })
  .catch((error) => {
    console.error("Error al sincronizar modelos:", error);
  });

// CONFIGURACIÓN DE CORS
const corsOptions = {
  origin: [
    "http://localhost:5173", // Frontend en desarrollo local
    "https://crochet-craft-frontend.vercel.app", // Frontend en producción //! Cambiar por el correcto
  ],
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

// INICIALIZAR LA APLICACIÓN
const app = express();

// CAPA DE SEGURIDAD
app.use(helmet());

const PORT = process.env.PORT || 3000;

// LÍMITE DE PETICIONES
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 MINUTO
  limit: 100, // 100 PETICIONES POR MINUTO,
  message: "¡Demasiadas peticiones!",
  standardHeaders: true,
  handler: (req, res) => {
    console.log("IP Bloqueada, alcanzo el límite de peticiones");
    res.status(409).json({ error: "Demasiadas peticiones!" });
  },
});

// APLICAR EL LÍMITE DE PETICIONES A TODAS LAS RUTAS
app.use(limiter);

// APLICAR CORS
app.use(cors(corsOptions));

app.use(bodyParser.json());

// RUTA DE BIENVENIDA
app.get("/", (req, res) => {
  res.send("Bienvenido a FerrePlus");
});

// RUTAS
app.use("/api/users", userRoute);
app.use("/api/suppliers", supplierRoute);
app.use("/api/products", productRoute);
app.use("/api/movements", movementRoute);

// INICIAR EL SERVIDOR
app.listen(PORT, () => {
  console.log(`Escuchando en el puerto http://localhost:${PORT}`);
});

// RUTAS QUE NO EXISTEN
app.use((req, res, next) => {
  res.status(404).send("Ruta no encontrada");
});
