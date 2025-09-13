import { Router } from "express";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "secretDev"; // usa .env en producción

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación de campos requeridos
    if (!email || !password) {
      return res.status(400).json({ error: "Email y password son requeridos" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login exitoso", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
