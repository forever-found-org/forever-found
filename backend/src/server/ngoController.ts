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
