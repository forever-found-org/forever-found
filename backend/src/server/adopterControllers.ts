import { Request, Response } from "express";
import Adopter from "../db/adopterModel";


export const loginAdopter = async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log("Login attempt for email:", email);

  try {
    const adopter = await Adopter.findOne({ email });
    console.log("Adopter found:", adopter);

    // 1️⃣ Not found
    if (!adopter) {
      return res.status(404).json({ error: "Adopter not found" });
    }

    // 2️⃣ BLOCK CHECK (ADD HERE ✅)
    if (adopter.isBlocked) {
      return res.status(403).json({
        message: "Your account has been blocked by admin",
        reason: adopter.blockReason || "No reason provided",
      });
    }

    // 3️⃣ Successful login
    res.json({
      id: adopter._id,
      email: adopter.email,
      name: adopter.fullName,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAdopterById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const adopter = await Adopter.findById(id).select("-password"); // exclude password
    if (!adopter) {
      return res.status(404).json({ error: "Adopter not found" });
    }

    res.json(adopter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateAdopter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    
    const {
      occupation,
      salaryPerAnnum,
      contactNumber,
      alternateContactNumber,
      address,
      religion,
      gender,
      maritalStatus,
      numberOfBiologicalChildren,
    } = req.body;

    const adopter = await Adopter.findByIdAndUpdate(
      id,
      {
        occupation,
        salaryPerAnnum,
        contactNumber,
        alternateContactNumber,
        address,
        religion,
        gender,
        maritalStatus,
        numberOfBiologicalChildren,
      },
      { new: true, runValidators: true } // return updated doc + validate schema
    ).select("-password"); // don’t send password back

    if (!adopter) {
      return res.status(404).json({ message: "Adopter not found" });
    }

    res.json(adopter);
  } catch (err: any) {
    console.error("Error updating adopter:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
