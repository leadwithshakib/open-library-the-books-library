import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { errorHandler } from "./middlewares/error.middlewares.js";

const app = express();
const httpServer = createServer(app);

app.use(errorHandler);

export { httpServer };
