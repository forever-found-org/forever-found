import { Request, Response } from "express";
import Child from "../db/childrenModel";

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
    };

    if (gender && gender !== "Any") query.gender = gender;
    //if (religion && religion !== "Any") query.religion = religion;
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


export const getChilByID=async(req:Request,res:Response)=>{
    try{
      const {id}=req.params;
      const child = await Child.findById(id);
      if (!child) return res.status(404).json({ message: "Child not found" });
      res.json(child);
    }
    catch(err){
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
}

// Controller to create a new child
export const createChild = async (req: Request, res: Response) => {
  try {
    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILES:", req.files);
    // Destructure fields from the request body
    const { ngoId, name, age, gender, dateOfBirth, healthStatus, educationLevel } = req.body;

    // Validate required fields
    if (!ngoId || !name || !age || !gender) {
      return res.status(400).json({ message: "NGO ID, name, age, and gender are required" });
    }

    // Extract uploaded file names from Multer
    const gallery = req.files
      ? (req.files as Express.Multer.File[]).map(file => file.filename)
      : [];

    // Create new Child document
    const newChild = new Child({
      ngoId,
      name,
      age,
      gender,
      dateOfBirth,
      healthStatus,
      educationLevel,
      gallery,             // array of file names
      adoptionStatus: "Available", // default
      adopterId: null             // default
    });

    // Save to MongoDB
    await newChild.save();

    // Respond with success
    res.status(201).json({ message: "Child created successfully", child: newChild });
  } catch (error) {
    console.error("Error creating child:", error);
    res.status(500).json({ message: "Server error" });
  }
};



//view children
export const getChildrenByNgo = async (req: Request, res: Response) => {
  try {
    const { ngoId } = req.params;

    if (!ngoId) {
      return res.status(400).json({ message: "NGO ID is required" });
    }

    const children = await Child.find({ ngoId }).select("-adopterId -gallery");
    res.json(children);
  } catch (error) {
    console.error("Error fetching children:", error);
    res.status(500).json({ message: "Server error" });
  }
};