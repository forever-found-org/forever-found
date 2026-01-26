import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Adopter from "../db/adopterModel";

export const registerAdopter = async (req: Request, res: Response) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const {
      name,
      religion,
      gender,
      dob,
      maritalStatus,
      email,
      contact,
      address,
      altcontact,
      bioChildren,
      occupation,
      salary,
      aadhar,
      socialId,
      pass,
      healthStatus,
    } = req.body;

    // Check duplicate
    const existing = await Adopter.findOne({
      $or: [{ email }, { aadharNumber: aadhar }],
    });

    if (existing) {
      return res.status(400).json({
        message: "Email or Aadhar already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(pass, 10);

    // Extract uploaded files (Cloudinary URLs)
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const aadharImage = files?.aadharimg?.[0]?.path;

    const medicalCertificates = files?.medicalCertificates
      ? files.medicalCertificates.map((file) => file.path)
      : [];

    if (!aadharImage) {
      return res.status(400).json({
        message: "Aadhar image is required",
      });
    }

    // Convert healthStatus string → array
    const healthArray =
      typeof healthStatus === "string"
        ? healthStatus.split(",").map((h: string) => h.trim())
        : [];

    const adopter = await Adopter.create({
      fullName: name,
      religion,
      gender: gender
        ? gender.charAt(0).toUpperCase() + gender.slice(1)
        : undefined,
      dateOfBirth: dob,
      maritalStatus,
      email,
      contactNumber: contact,
      address,
      alternateContactNumber: altcontact,
      numberOfBiologicalChildren: Number(bioChildren),
      occupation,
      salaryPerAnnum: Number(salary),
      aadharNumber: aadhar,
      aadharImage,
      socialId,
      password: hashedPassword,
      healthStatus: healthArray,
      medicalCertificates,
      status: "pending",
      isBlocked: false,
    });

    return res.status(201).json({
      message: "Adopter registration successful. Await admin approval.",
      adopterId: adopter._id,
    });
  } catch (error) {
    console.error("REGISTER ADOPTER ERROR:", error);
    return res.status(500).json({
      message: "Registration failed",
    });
  }
};



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
