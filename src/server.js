require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

// IMPORAR RUTAS
const userRoute = require("./routes/userRoute");
const supplierRoute = require("./routes/supplierRoute");
const productRoute = require("./routes/productRoutes");

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

app.use(cors());
app.use(bodyParser.json());

// RUTA DE BIENVENIDA
app.get("/", (req, res) => {
  res.send("Bienvenido a FerrePlus");
});

// RUTAS
app.use("/api/users", userRoute);
app.use("/api/suppliers", supplierRoute);
app.use("/api/products", productRoute);

// INICIAR EL SERVIDOR
app.listen(PORT, () => {
  console.log(`Escuchando en el puerto http://localhost:${PORT}`);
});

// RUTAS QUE NO EXISTEN
app.use((req, res, next) => {
  res.status(404).send("Ruta no encontrada");
});
