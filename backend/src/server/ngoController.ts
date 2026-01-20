import { Request, Response } from "express";
import NGO from "../db/ngoModel";

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

// --- Update NGO Details (gallery + testimonials included) ---
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
      existingGallery, // 👈 ADD THIS
    } = req.body;

    // ---------------- Text fields ----------------
    ngo.about = about ?? ngo.about;
    ngo.website = website ?? ngo.website;
    ngo.contact = contact ?? ngo.contact;
    ngo.alternateContact = alternateContact ?? ngo.alternateContact;
    ngo.city = city ?? ngo.city;
    ngo.state = state ?? ngo.state;
    ngo.location = location ?? ngo.location;
    ngo.numberOfChildren = numberOfChildren ?? ngo.numberOfChildren;
    ngo.testimonials = testimonials
      ? JSON.parse(testimonials)
      : ngo.testimonials;

    // ---------------- GALLERY FIX ----------------
    let updatedGallery: string[] = [];

    // 1️⃣ Keep remaining images (after delete)
    if (existingGallery) {
      updatedGallery = JSON.parse(existingGallery);
    }

    // 2️⃣ Add newly uploaded images
    if (req.files && Array.isArray(req.files)) {
      const uploadedImages = (req.files as Express.Multer.File[]).map(
        (file) => file.path
      );

      updatedGallery.push(...uploadedImages);
    }

    // 3️⃣ Enforce max limit = 3
    ngo.gallery = updatedGallery.slice(0, 3);

    // ------------------------------------------------

    await ngo.save();
    res.json(ngo);
  } catch (error) {
    console.error("Error updating NGO:", error);
    res.status(500).json({ message: "Failed to update NGO" });
  }
};
