import { Request, Response } from "express";
import Meeting from "../db/meetingsModel";
// GET all meetings for an adopter
export const getMeetingsByAdopter = async (req: Request, res: Response) => {
  try {
    const { adopterId } = req.params;

    const meetings = await Meeting.find({ adopterId })
      .populate("ngoId", "name email contact") // pick fields you want
      .populate("childIds", "name age gender") // pick fields you want
      .sort({ createdAt: -1 }); // latest first

    if (!meetings || meetings.length === 0) {
      return res.status(404).json({ message: "No meetings found" });
    }

    res.status(200).json(meetings);
  } catch (error: any) {
    console.error("Error fetching meetings:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
