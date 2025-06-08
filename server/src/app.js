import cors from "cors";
import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { errorHandler } from "./middlewares/error.middlewares.js";
import { routes } from "./routes/index.js";

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(routes);

app.use(errorHandler);

export { httpServer };
