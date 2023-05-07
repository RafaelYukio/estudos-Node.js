import express from "express";
import cors from "cors";
import winston from "winston";
import clientsRouter from "./routes/clients.route.js";
import productsRouter from "./routes/products.route.js";
import suppliersRouter from "./routes/suppliers.route.js";
import salesRouter from "./routes/sales.route.js";

// Configurações para logger
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} ${message}`;
});
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "store-api.log" }),
  ],
  format: combine(label({ label: "store-api" }), timestamp(), myFormat),
});

const app = express();
// app.use são os middlewares
app.use(express.json());
app.use(cors());
app.use("/clients", clientsRouter);
app.use("/products", productsRouter);
app.use("/suppliers", suppliersRouter);
app.use("/sales", salesRouter);
// Middleware para erros (executa no next do catch no controller)
// precisa ter os quatro parâmetros para funcionar
app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});
app.listen(3000, () => console.log("API Started!"));
