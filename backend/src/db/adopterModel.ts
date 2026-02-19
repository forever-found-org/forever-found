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

    // 🔔 Profile Edit Request (Admin Notification)
    hasEditRequest: {
      type: Boolean,
      default: false,
    },

    editRequestedAt: {
      type: Date,
      default: null,
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
    // --- Email verification ---
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
      default: null,
      required: false,
    },
    emailVerificationExpires: {
      type: Date,
      default: null,
      required: false,
    },

    // --- Phone verification ---
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    phoneOTP: {
      type: String,
      default: null,
      required: false
    },
    phoneOTPExpires: {
      type: Date,
      default: null,
      required: false
    },

    // --- Session tokens ---
    sessions: [
      {
        token: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        expiresAt: { type: Date, required: true },
        userAgent: { type: String },
        ipAddress: { type: String },
      },
    ],

  },
  { timestamps: true }
);

const Adopter = mongoose.model("Adopter", adopterSchema);
export default Adopter;
