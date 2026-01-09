import { Request, Response } from "express";
import Child from "../db/childrenModel";
import Meeting from "../db/meetingsModel";

// Map age groups to ranges
const ageGroups: Record<string, [number, number]> = {
  "2-4": [2, 4],
  "5-8": [5, 8],
  "9-11": [9, 11],
  "12-18": [12, 18],
};

export const findChildrenMatches = async (req: Request, res: Response) => {
  try {
    const { ngoId, gender, ageGroup } = req.body;

    if (!ngoId) {
      return res.status(400).json({ message: "NGO ID is required" });
    }

    // Build dynamic query
    const query: any = {
      ngoId,
      adoptionStatus: "Available",
      canEdit: "true"
    };

    if (gender && gender !== "Any") query.gender = gender;
    if (ageGroup && ageGroup !== "Any") {
      const [minAge, maxAge] = ageGroups[ageGroup] || [0, 100];
      query.age = { $gte: minAge, $lte: maxAge };
    }

    const children = await Child.find(query);
    res.json(children);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//child details
export const getChildWithEffectiveStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const child = await Child.findById(id);
    if (!child) return res.status(404).json({ message: "Child not found" });

    // Fetch all active meetings for this child
    const meetings = await Meeting.find({ 
      childIds: child._id,
      status: { $in: ["pending", "accepted", "fixed"] }
    });

    // Determine effective status
    let effectiveStatus = child.adoptionStatus === "Available" ? "available" : null;
    if (meetings.some(m => m.status === "fixed")) effectiveStatus = "fixed";
    else if (meetings.some(m => m.status === "accepted")) effectiveStatus = "accepted";
    else if (meetings.some(m => m.status === "pending")) effectiveStatus = "pending";

    res.json({ child, effectiveStatus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to create a new child
export const createChild = async (req: Request, res: Response) => {
  try {
    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILES:", req.files);

    const { ngoId, name, age, gender, dateOfBirth, healthStatus, educationLevel } = req.body;

    if (!ngoId || !name || !age || !gender) {
      return res.status(400).json({ message: "NGO ID, name, age, and gender are required" });
    }

    const gallery = req.files
      ? (req.files as Express.Multer.File[]).map(file => file.filename)
      : [];

    const newChild = new Child({
      ngoId,
      name,
      age,
      gender,
      dateOfBirth,
      healthStatus,
      educationLevel,
      gallery,
      adoptionStatus: "Available",
      adopterId: null,
    });

    await newChild.save();
    res.status(201).json({ message: "Child created successfully", child: newChild });
  } catch (error) {
    console.error("Error creating child:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// View children by NGO
export const getChildrenByNgo = async (req: Request, res: Response) => {
  try {
    const { ngoId } = req.params;

    if (!ngoId) {
      return res.status(400).json({ message: "NGO ID is required" });
    }

    const children = await Child.find({ ngoId }).select("-adopterId");
    res.json(children);
  } catch (error) {
    console.error("Error fetching children:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update child (new)
export const updateChild = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const child = await Child.findById(id);

    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }

    // Update only allowed fields
    const { age, healthStatus, educationLevel } = req.body;
    if (age !== undefined) child.age = age;
    if (healthStatus !== undefined) child.healthStatus = healthStatus;
    if (educationLevel !== undefined) child.educationLevel = educationLevel;

    // Handle new medical certificate uploads
    if (req.files && Array.isArray(req.files)) {
      const uploadedFiles = (req.files as Express.Multer.File[]).map(f => f.filename);

      // Append new medical certificates to the gallery
      child.gallery = [...child.gallery, ...uploadedFiles];
    }

    await child.save();

    // Return full child details including gallery
    res.json({ message: "Child updated successfully", child });
  } catch (error) {
    console.error("Error updating child:", error);
    res.status(500).json({ message: "Server error" });
  }
};
