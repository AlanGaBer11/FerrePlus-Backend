const corsOptions = {
  origin: [
    "http://localhost:5173", // Frontend en desarrollo
    "https://ferreplus-frontend.vercel.app", // Producción
  ],
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  optionsSuccessStatus: 200,
  maxAge: 86400, // 24 horas
};

module.exports = { corsOptions };
