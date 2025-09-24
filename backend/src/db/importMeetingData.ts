import mongoose from "mongoose";
import dotenv from "dotenv";
import Meeting from "./meetingsModel"; // adjust path if meetingModel is elsewhere
import fs from "fs";
import path from "path";

dotenv.config();

const importData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ DB Connected");

    // Read meetings.json
    const filePath = path.join(__dirname, "../../meetings.json"); // adjust path if needed
    const rawData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(rawData);

    // Map to schema
    const formattedData = data.map((meeting: any) => ({
      adopterId: meeting.adopterId.$oid,
      ngoId: meeting.ngoId.$oid,
      childIds: meeting.childIds.map((c: any) => c.$oid),
      status: meeting.status,
      confirmMeet: meeting.confirmMeet || false,
      meetDateChoices: meeting.meetDateChoices?.map((d: any) => new Date(d.$date)) || [],
      timeSlotChoices: meeting.timeSlotChoices || [],
      fixedMeetDate: meeting.fixedMeetDate ? new Date(meeting.fixedMeetDate.$date) : undefined,
      fixedTimeSlot: meeting.fixedTimeSlot || undefined,
      history: meeting.history?.map((h: any) => ({
        status: h.status,
        changedBy: h.changedBy,
        timestamp: new Date(h.timestamp.$date),
        note: h.note || undefined,
      })) || [],
      createdAt: meeting.createdAt ? new Date(meeting.createdAt.$date) : new Date(),
      updatedAt: meeting.updatedAt ? new Date(meeting.updatedAt.$date) : new Date(),
    }));

    // Insert into DB using upsert by unique combination of adopterId + ngoId + createdAt
    for (const meeting of formattedData) {
      await Meeting.updateOne(
        { adopterId: meeting.adopterId, ngoId: meeting.ngoId, createdAt: meeting.createdAt },
        meeting,
        { upsert: true }
      );
    }

    console.log("✅ Meeting Data Imported Permanently!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error importing meeting data:", err);
    process.exit(1);
  }
};

importData();
