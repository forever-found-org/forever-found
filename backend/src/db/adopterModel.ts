import mongoose from "mongoose";

const adopterSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    religion: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    dateOfBirth: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactNumber: { type: String, required: true },
    address: { type: String, required: true },
    alternateContactNumber: { type: String },
    numberOfBiologicalChildren: { type: Number, default: 0 },
    occupation: { type: String, required: true },
    salaryPerAnnum: { type: Number, required: true },
    aadharNumber: { type: String, required: true, unique: true },
    aadharImage: { type: String, default: "" },
    socialId: { type: String, required: false },
    password: { type: String, required: true },

    // Medical details
    healthStatus: {
      type: [String],
      default: [],
    },
    medicalCertificates: {
      type: [String],
      default: [],
    },

    // Approval workflow
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    // Rejection details (NEW)
    rejectionReason: {
      type: String,
      default: null,
    },

    // Admin control (Blocking)
    isBlocked: {
      type: Boolean,
      default: false,
    },
    blockReason: {
      type: String,
      default: null,
    },
    blockedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Adopter = mongoose.model("Adopter", adopterSchema);
export default Adopter;
