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

