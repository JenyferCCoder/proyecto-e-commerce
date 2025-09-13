import { Router } from "express";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";

const router = Router();

// Crear usuario
router.post("/", async (req, res) => {
  try {
    const { first_name, email, password } = req.body;

    // Validación campos requeridos
    if (!first_name || !email || !password) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    // Verificar si el email ya existe
    const exist = await UserModel.findOne({ email });
    if (exist) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    // Contraseña Hash
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      first_name,
      email,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar usuario
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar usuario
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar usuario por id

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado correctamente", user: deletedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
