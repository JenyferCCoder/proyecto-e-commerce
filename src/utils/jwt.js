import jwt from "jsonwebtoken";

const JWT_SECRET = "jenyferclave"; 

export const generateToken = user => {
  return jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = token => jwt.verify(token, JWT_SECRET);
