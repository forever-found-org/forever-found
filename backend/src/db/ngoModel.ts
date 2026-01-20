import mongoose from "mongoose";

const ngoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    yearOfEstablishment: Number,
    website: String,

    contact: { type: String, required: true },
    alternateContact: { type: String, default: null },

    contactPersonName: { type: String, default: null },
    contactPersonDesignation: { type: String, default: null },

    email: { type: String, required: true, unique: true },
    registrationNumber: String,
    caraRegistrationNumber: String,

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    rejectionReason: {
      type: String,
      default: null,
    },

    about: String,
    numberOfChildren: { type: Number, default: 0 },
    logo: { type: String, default: ""},

    testimonials: [
      {
        name: String,
        role: String,
        feedback: String,
      },
    ],
    gallery: { type: [String],default: [] },
    socialId: String,
    password: { type: String, required: true, minlength: 8 },
    passwordResetToken: String,
    passwordResetExpires: Date,

    // Optional admin control (not approval-related)
    canEdit: { type: Boolean, default: true },
    blockReason: { type: String, default: null },
    blockedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const NGO = mongoose.model("NGO", ngoSchema);
export default NGO;
