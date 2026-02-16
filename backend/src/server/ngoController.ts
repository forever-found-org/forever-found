import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import NGO from "../db/ngoModel";
import crypto from "crypto";
import { sendVerificationEmail } from "../sendEmail";


export const registerNGO = async (req: Request, res: Response) => {
  try {
    const {
      name,
      location,
      city,
      state,
      yearOfEstablishment,
      website,
      contact,
      alternateContact,
      contactPersonName,
      contactPersonDesignation,
      email,
      registrationNumber,
      caraRegistrationNumber,
      about,
      pass,
      numberOfChildren,
      testimonials,
      socialId,
    } = req.body;

    const existing = await NGO.findOne({
      $or: [{ email }, { registrationNumber }, { caraRegistrationNumber }],
    });

    if (existing) {
      return res.status(400).json({
        message: "NGO already registered with provided details",
      });
    }

    const hashedPassword = await bcrypt.hash(pass, 10);

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const logo = files?.logo?.[0]?.path;
    const registrationCert = files?.registrationCert?.[0]?.path;
    const caraCert = files?.caraCert?.[0]?.path;

    if (!logo || !registrationCert || !caraCert) {
      return res.status(400).json({
        message:
          "Logo, Registration Certificate & CARA Certificate are required",
      });
    }

    const gallery = [
      { type: "registration", url: registrationCert },
      { type: "cara", url: caraCert },
    ];

    if (files?.gallery) {
      files.gallery.slice(0, 3).forEach((file) => {
        gallery.push({ type: "gallery", url: file.path });
      });
    }

    let parsedTestimonials = [];
    if (testimonials) {
      try {
        parsedTestimonials = JSON.parse(testimonials);
      } catch {
        return res.status(400).json({
          message: "Invalid testimonials format",
        });
      }
    }

    // ✅ Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");

    const ngo = await NGO.create({
      name,
      location,
      city,
      state,
      yearOfEstablishment: yearOfEstablishment
        ? Number(yearOfEstablishment)
        : undefined,
      numberOfChildren: numberOfChildren
        ? Number(numberOfChildren)
        : 0,
      website,
      contact,
      alternateContact,
      contactPersonName,
      contactPersonDesignation,
      email,
      registrationNumber,
      caraRegistrationNumber,
      about,
      logo,
      gallery,
      testimonials: parsedTestimonials,
      socialId,
      password: hashedPassword,
      status: "pending",
      rejectionReason: null,
      canEdit: true,

      // Email verification fields
      emailVerified: false,
      emailVerificationToken,
      emailVerificationExpires: Date.now() + 2 * 60 * 60 * 1000,
    });

    // Send verification email
    await sendVerificationEmail(
      email,
      emailVerificationToken,
      "ngos",
      ngo._id.toString()
    );

    return res.status(201).json({
      message: "NGO registration successful. Await admin approval.",
      ngoId: ngo._id,
    });
  } catch (error) {
    console.error("REGISTER NGO ERROR:", error);
    return res.status(500).json({
      message: "NGO registration failed",
    });
  }
};

// verifying email
export const verifyNGOEmail = async (req: Request, res: Response) => {
  try {
    const ngo = await NGO.findOne({
      emailVerificationToken: req.params.token,
    });

    // If token not found (already used OR invalid)
    if (!ngo) {
      return res.json({
        message: "Email already verified or invalid token",
      });
    }

    // If already verified
    if (ngo.emailVerified) {
      return res.json({ message: "Email already verified" });
    }

    // If token expired
    if (
      !ngo.emailVerificationExpires ||
      ngo.emailVerificationExpires.getTime() < Date.now()
    ) {
      return res.status(400).json({ message: "Token expired" });
    }

    // Mark as verified
    ngo.emailVerified = true;
    ngo.emailVerificationToken = null;
    ngo.emailVerificationExpires = null;

    await ngo.save();

    return res.json({ message: "Email verified successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Verification failed" });
  }
};




// --- Login NGO by email ---
export const loginNGO = async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log("NGO login attempt for email:", email);

  try {
    const ngo = await NGO.findOne({ email });
    console.log("NGO found:", ngo);

    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }

    // Send minimal info to frontend
    res.json({
      id: ngo._id,
      name: ngo.name,
      email: ngo.email,
    });
  } catch (err) {
    console.error("Error logging in NGO:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch all NGOs (for cards page)
export const getAllNGOs = async (req: Request, res: Response) => {
  try {
    const ngos = await NGO.find({}, "name location logo city state");
    res.json(ngos);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch NGOs" });
  }
};

// Fetch details of one NGO
export const getNGODetails = async (req: Request, res: Response) => {
  try {
    const ngo = await NGO.findById(req.params.id);
    if (!ngo) return res.status(404).json({ message: "NGO not found" });

    // Explicitly return all fields
    res.json({
      id: ngo._id,
      name: ngo.name,
      location: ngo.location,
      city:ngo.city,
      state:ngo.state,
      logo: ngo.logo,
      yearOfEstablishment: ngo.yearOfEstablishment,
      website: ngo.website,
      contact: ngo.contact,
      email: ngo.email,
      ngoRegistrationNumber: ngo.registrationNumber, // make sure this exists in DB
      caraRegistrationNumber: ngo.caraRegistrationNumber,
      about: ngo.about,
      numberOfChildren: ngo.numberOfChildren,
      gallery: ngo.gallery,
      testimonials: ngo.testimonials,
      socialId: ngo.socialId,
      emailVerified: ngo.emailVerified,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch NGO details" });
  }
};

// Validate NGO ID
export const validateNgoId = async (req: Request, res: Response) => {
  try {
    const { ngoId } = req.body;

    // Step 1: Check if ID format is valid (MongoDB ObjectId is 24 hex chars)
    if (!ngoId || !ngoId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid NGO ID format" });
    }

    // Step 2: Check if NGO exists in DB
    const ngo = await NGO.findById(ngoId);
    if (!ngo) {
      return res.status(404).json({ error: "NGO ID does not exist" });
    }

    // Step 3: If both checks pass, ID is valid
    return res.status(200).json({ message: "NGO ID is valid" });
  } catch (error) {
    console.error("Error validating NGO ID:", error);
    res.status(500).json({ error: "Server error while validating NGO ID" });
  }
};

export const updateNGODetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ngo = await NGO.findById(id);

    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }

    const {
      about,
      website,
      contact,
      alternateContact,
      testimonials,
      city,
      state,
      location,
      numberOfChildren,
      existingGallery,
    } = req.body;

    // ---------- TEXT ----------
    ngo.about = about ?? ngo.about;
    ngo.website = website ?? ngo.website;
    ngo.contact = contact ?? ngo.contact;
    ngo.alternateContact = alternateContact ?? ngo.alternateContact;
    ngo.city = city ?? ngo.city;
    ngo.state = state ?? ngo.state;
    ngo.location = location ?? ngo.location;
    ngo.numberOfChildren = numberOfChildren ?? ngo.numberOfChildren;

    if (testimonials) {
      ngo.testimonials = JSON.parse(testimonials);
    }

    // ---------- GALLERY ----------
    let updatedGallery: { type: "registration" | "cara" | "gallery"; url: string }[] = [];

    // Keep existing images
    if (existingGallery) {
      updatedGallery = JSON.parse(existingGallery);
    }

    // Add new uploads
    if (req.files && Array.isArray(req.files)) {
      (req.files as Express.Multer.File[]).forEach((file) => {
        updatedGallery.push({
          type: "gallery",
          url: file.path,
        });
      });
    }

    // Enforce max gallery images (only gallery type)
    const finalGallery = [
      ...updatedGallery.filter(img => img.type !== "gallery"),
      ...updatedGallery.filter(img => img.type === "gallery").slice(0, 3),
    ];

    // ✅ IMPORTANT FIX
    ngo.set("gallery", finalGallery);

    await ngo.save();
    res.json(ngo);
  } catch (error) {
    console.error("Error updating NGO:", error);
    res.status(500).json({ message: "Failed to update NGO" });
  }
};
