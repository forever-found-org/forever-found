import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const adminAuth = (req: any, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    // 1️⃣ Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    // 2️⃣ Extract token
    const token = authHeader.split(" ")[1];

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // 4️⃣ Attach admin data to request
    req.admin = decoded;

    next();

  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
