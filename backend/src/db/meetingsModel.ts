import mongoose, { Schema, Document } from "mongoose";

export interface IMeeting extends Document {
  adopterId: Schema.Types.ObjectId;
  ngoId: Schema.Types.ObjectId;
  childIds: Schema.Types.ObjectId[];
  status: "pending" | "accepted" | "rejected" | "cancelled" | "fixed";
  confirmMeet?: boolean; // adopter review before NGO confirms
  meetDateChoices: Date[]; // max 3
  timeSlotChoices: string[]; // max 3, complementary to meetDateChoices
  fixedMeetDate?: Date;
  fixedTimeSlot?: string;
  history: {
    status: string;
    changedBy: "adopter" | "ngo" | "admin" | "system";
    timestamp: Date;
    note?: string; // optional reason for rejection/cancellation
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const meetingSchema = new Schema<IMeeting>(
  {
    adopterId: { type: Schema.Types.ObjectId, ref: "Adopter", required: true },
    ngoId: { type: Schema.Types.ObjectId, ref: "NGO", required: true },
    childIds: [{ type: Schema.Types.ObjectId, ref: "Child" }],
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "cancelled", "fixed"],
      default: "pending",
    },
    confirmMeet: { type: Boolean, default: false },
    meetDateChoices: [{ type: Date }],
    timeSlotChoices: [{ type: String }],
    fixedMeetDate: { type: Date },
    fixedTimeSlot: { type: String },
    history: [
      {
        status: { type: String, required: true },
        changedBy: {
          type: String,
          enum: ["adopter", "ngo", "admin", "system"],
          required: true,
        },
        timestamp: { type: Date, default: Date.now },
        note: String,
      },
    ],
  },
  { timestamps: true }
);

const Meeting = mongoose.model<IMeeting>("Meeting", meetingSchema);

export default Meeting;
