import express from "express";
import mongoose from "mongoose";
import usersRouter from "./routes/users.routes.js";
import sessionsRouter from "./routes/sessions.routes.js";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/users", usersRouter);
app.use("/api/sessions", sessionsRouter);

// Conexión DB
mongoose.connect("mongodb://127.0.0.1:27017/proy_ecommerce")
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error de conexión a MongoDB", err));

export default app;
