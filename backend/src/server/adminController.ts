import { Request, Response } from "express";
import Admin from "../db/adminModel";

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    // admin not found
    if (!admin) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // admin blocked
    if (admin.status !== "ACTIVE") {
      return res.status(403).json({ error: "Admin account is blocked" });
    }

    // plain-text password check (TEMPORARY)
    if (admin.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // update last login time
    admin.lastLogin = new Date();
    await admin.save();

    // send minimal required data
    return res.status(200).json({
      success: true,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
