import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import Adopter from "../db/adopterModel";
import Child from "../db/childrenModel";
import { sendVerificationEmail } from "../sendEmail";

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

    //generating verification tokens
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");
    //const phoneOTP = Math.floor(100000 + Math.random() * 900000).toString();

    //creating adopter
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
      emailVerified: false,
      phoneVerified: false,
      emailVerificationToken,
      emailVerificationExpires: Date.now() + 2 * 60 * 60 * 1000,
      //phoneOTP,
      //phoneOTPExpires: Date.now() + 10 * 60 * 1000,
    });

    //sending verification email
    await sendVerificationEmail(email, emailVerificationToken, "adopter", adopter._id.toString());

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

//verify email
export const verifyAdopterEmail = async (req: Request, res: Response) => {
  try {
    const adopter = await Adopter.findOne({
      emailVerificationToken: req.params.token,
    });

    // If token not found
    if (!adopter) {
      // Check if already verified (token was cleared)
      const alreadyVerified = await Adopter.findOne({
        emailVerified: true,
      });

      if (alreadyVerified) {
        return res.json({ message: "Email already verified" });
      }

      return res.status(400).json({ message: "Invalid token" });
    }

    if (adopter.emailVerified) {
      return res.json({ message: "Email already verified" });
    }

    if (
      !adopter.emailVerificationExpires ||
      adopter.emailVerificationExpires.getTime() < Date.now()
    ) {
      return res.status(400).json({ message: "Token expired" });
    }

    adopter.emailVerified = true;
    adopter.emailVerificationToken = null;
    adopter.emailVerificationExpires = null;

    await adopter.save();

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(500).json({ message: "Verification failed" });
  }
};



/*verify phone
export const verifyAdopterPhone = async (req: Request, res: Response) => {
  const { adopterId, otp } = req.body;

  try {
    const adopter = await Adopter.findById(adopterId);

    if (!adopter) {
      return res.status(404).json({ message: "Adopter not found" });
    }

    if (adopter.phoneOTP !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (!adopter.phoneOTPExpires || adopter.phoneOTPExpires.getTime() < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    adopter.phoneVerified = true;
    adopter.phoneOTP = null;
    adopter.phoneOTPExpires = null;

    await adopter.save();

    res.json({ message: "Phone verified successfully" });
  } catch (err) {
    res.status(500).json({ message: "Phone verification failed" });
  }
};*/

//login adopter
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

//single adopter
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

//update adopter
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

//get adopter adoption history
export const getAdoptionHistoryByAdopter = async (
  req: Request,
  res: Response
) => {
  try {
    const { adopterId } = req.params;

    const adoptedChildren = await Child.find({
      adopterId,
      adoptionStatus: "Adopted",
    })
      .populate("ngoId", "name email location")
      .sort({ updatedAt: -1 });

    res.status(200).json(adoptedChildren);
  } catch (error) {
    console.error("Adoption history error:", error);
    res.status(500).json({
      message: "Failed to fetch adoption history",
    });
  }
};

//single child adoption details
export const getSingleAdoptedChild = async (
  req: Request,
  res: Response
) => {
  try {
    const { adopterId, childId } = req.params;

    const child = await Child.findOne({
      _id: childId,
      adopterId,
      adoptionStatus: "Adopted",
    }).populate("ngoId");

    if (!child) {
      return res.status(404).json({
        message: "Adoption record not found",
      });
    }

    res.status(200).json(child);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch adoption details",
    });
  }
};
