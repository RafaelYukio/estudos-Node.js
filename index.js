import express from "express";
import winston from "winston";
import cors from "cors";
import pedidosRouter from "./routes/pedidos.route.js";
import { promises as fs } from "fs";

// express para crianção do endpoints (métodos)
// winston para criação dos logs
// sem cors, a api e a pág. precisam estar no mesmo servidor

const { readFile } = fs;

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "pedidos.log" }),
  ],
  format: combine(label({ label: "pedidos" }), timestamp(), myFormat),
});
global.pedidos = async () => JSON.parse(await readFile("pedidos.json"));

const app = express();
app.use(express.json());
// para liberar o cors
// libera toda a api:
app.use(cors());
app.use("/pedidos", pedidosRouter);

// teste de erro cors, servindo arquivo estático
app.use(express.static("public"));

app.listen(3000, async () => {
  try {
    global.pedidos();
    global.logger.info("API Started!");
  } catch (err) {
    global.logger.error("Erro ao ler pedidos.json!", err);
  }
});
