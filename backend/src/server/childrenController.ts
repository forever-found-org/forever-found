import { Request, Response } from "express";
import Child from "../db/childrenModel";

export const getChildren = async (req: Request, res: Response) => {
  try {
    const children = await Child.find().populate("ngoId", "name"); // bring NGO name
    res.json(children);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch children" });
  }
};
