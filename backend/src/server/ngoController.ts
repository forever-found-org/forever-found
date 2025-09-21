import { Request, Response } from "express";
import NGO from "../db/ngoModel";

// Fetch all NGOs (for cards page)
export const getAllNGOs = async (req: Request, res: Response) => {
  try {
    const ngos = await NGO.find({}, "name location image");
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
    res.json(ngo);
  } catch (error) {
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
