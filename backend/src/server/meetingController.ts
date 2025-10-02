import { Request, Response } from "express";
import Meeting from "../db/meetingsModel";
// GET all meetings for an adopter
export const getMeetingsByAdopter = async (req: Request, res: Response) => {
  try {
    const { adopterId } = req.params;

    const meetings = await Meeting.find({ adopterId })
      .populate("ngoId", "name location email contact") // pick fields you want
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

export const createMeeting = async (req: Request, res: Response) => {
  try {
    const { adopterId, ngoId, childIds } = req.body;

    // Create a new meeting document
    const newMeeting = new Meeting({
      adopterId,
      ngoId,
      childIds,
      status: "pending", // default status is pending
      history: [
        {
          status: "pending",
          changedBy: "adopter",
          timestamp: new Date(),
          note: "Meeting requested by adopter",
        },
      ],
    });

    // Save the new meeting to the database
    await newMeeting.save();

    // Return the newly created meeting as a response
    res.status(201).json(newMeeting);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create meeting" });
  }
};

// Fetch pending meetings for a specific NGO
export const getPendingMeetingsForNGO = async (req: Request, res: Response) => {
  try {
    const { ngoId } = req.params; // NGO ID from route params

    const meetings = await Meeting.find({ ngoId, status: "pending" })
      .populate("adopterId", "fullName email address contact")
      .populate("childIds", "name age gender")
      .sort({ createdAt: -1 });

    // If no meetings, return empty array with message
    if (!meetings || meetings.length === 0) {
      return res.status(200).json({
        message: "No pending meeting requests found",
        meetings: [],
      });
    }

    res.status(200).json(meetings);
  } catch (error: any) {
    console.error("Error fetching pending meetings:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch single meeting details including NGO, children, and time slots
export const getMeetingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // meetingId

    const meeting = await Meeting.findById(id)
      .populate(
        "adopterId",
        "fullName email contactNumber alternateContactNumber address gender dateOfBirth maritalStatus occupation salaryPerAnnum numberOfBiologicalChildren aadharNumber healthStatus"
      )//adopter details
      .populate("childIds", "name age gender medicalCondition") // Child details
      .populate("ngoId", "name location email contact"); // NGO details

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    // Send all necessary fields for frontend
    res.status(200).json({
      _id: meeting._id,
      status: meeting.status,
      childIds: meeting.childIds,
      ngoId: meeting.ngoId,
      adopter: meeting.adopterId,
      meetDateChoices: meeting.meetDateChoices || [],
      timeSlotChoices: meeting.timeSlotChoices || [],
      fixedMeetDate: meeting.fixedMeetDate || null,
      fixedTimeSlot: meeting.fixedTimeSlot || null,
      history: meeting.history || [],
    });
  } catch (error: any) {
    console.error("Error fetching meeting:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


//accept meeting
export const acceptMeeting = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // meetingId
    const { meetDateChoices, timeSlotChoices } = req.body;

    if (
      !meetDateChoices || !timeSlotChoices ||
      meetDateChoices.filter((d: string) => d.trim() !== "").length === 0 ||
      timeSlotChoices.filter((t: string) => t.trim() !== "").length === 0
    ) {
      return res.status(400).json({ message: "At least one date and time slot is required" });
    }

    if (meetDateChoices.length !== timeSlotChoices.length) {
      return res.status(400).json({ message: "Dates and times count must match" });
    }

    const updatedMeeting = await Meeting.findByIdAndUpdate(
      id,
      {
        meetDateChoices: meetDateChoices.filter((d: string) => d.trim() !== ""),
        timeSlotChoices: timeSlotChoices.filter((t: string) => t.trim() !== ""),
        status: "accepted",
        $push: {
          history: {
            status: "accepted",
            changedBy: "ngo",
            timestamp: new Date(),
            note: "Meeting slots proposed by NGO",
          },
        },
      },
      { new: true }
    ).populate("adopterId").populate("childIds"); // optional: populate for frontend

    if (!updatedMeeting) return res.status(404).json({ message: "Meeting not found" });

    res.status(200).json(updatedMeeting);
  } catch (err: any) {
    console.error("Error accepting meeting:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Reject meeting
export const rejectMeeting = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedMeeting = await Meeting.findByIdAndUpdate(
      id,
      {
        status: "rejected",
        $push: {
          history: {
            status: "rejected",
            changedBy: "ngo",
            timestamp: new Date(),
            note: "Meeting rejected by NGO",
          },
        },
      },
      { new: true }
    );

    if (!updatedMeeting) return res.status(404).json({ message: "Meeting not found" });

    res.status(200).json(updatedMeeting);
  } catch (err: any) {
    console.error("Error rejecting meeting:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET all non-pending meetings for NGO
export const getNonPendingMeetingsForNGO = async (req: Request, res: Response) => {
  try {
    const { ngoId } = req.params;

    const meetings = await Meeting.find({ ngoId, status: { $ne: "pending" } })
      .populate("adopterId", "fullName email address contact")
      .populate("childIds", "name age gender")
      .sort({ createdAt: -1 });

    // Return empty array instead of 404
    res.status(200).json(meetings);
  } catch (err: any) {
    console.error("Error fetching non-pending meetings:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Fetch meetings for NGO by status
export const getMeetingsByStatusForNGO = async (req: Request, res: Response) => {
  try {
    const { meetingId } = req.params; // use the correct param
    const meeting = await Meeting.findById(meetingId)
      .populate(
        "adopterId",
        "fullName email contactNumber alternateContactNumber address gender dateOfBirth maritalStatus occupation salaryPerAnnum numberOfBiologicalChildren aadharNumber healthStatus"
      )
      .populate("childIds", "name")

    if (!meeting) return res.status(404).json({ message: "Meeting not found" });
    if (meeting.status === "pending")
      return res.status(400).json({ message: "This is a pending meeting, use getMeetingById instead" });

    res.status(200).json({
      _id: meeting._id,
      status: meeting.status,
      adopter: meeting.adopterId, // make sure key matches your frontend
      childIds: meeting.childIds,
      ngoId: meeting.ngoId,
      meetDateChoices: meeting.meetDateChoices || [],
      timeSlotChoices: meeting.timeSlotChoices || [],
      fixedMeetDate: meeting.fixedMeetDate || null,
      fixedTimeSlot: meeting.fixedTimeSlot || null,
      history: meeting.history || [],
    });
  } catch (error: any) {
    console.error("Error fetching meeting details:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};






