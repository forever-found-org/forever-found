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

    verified: { type: Boolean, default: false },

    about: String,
    numberOfChildren: { type: Number, default: 0 },
    image: String,

    testimonials: [
      {
        name: String,
        role: String,
        feedback: String,
      },
    ],
    gallery: [String],

    socialId: String,
    password: { type: String, required: true, minlength: 8 },
    passwordResetToken: String,
    passwordResetExpires: Date,

    //Blocking related
    canEdit: { type: Boolean, default: true },
    blockReason: { type: String, default: null },
    blockedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

const NGO = mongoose.model("NGO", ngoSchema);
export default NGO;
