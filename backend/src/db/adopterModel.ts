import mongoose from "mongoose";

const adopterSchema = new mongoose.Schema({
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
  aadharImage: { type: String, required: true },
  socialId: { type: String, required: true },
  password: { type: String, required: true }, // should be hashed in production

  // Medical details
  healthStatus: {
    type: [String], // e.g. ["Diabetes", "Hypertension"]
    default: [],
  },
  medicalCertificates: {
    type: [String], // file paths/URLs of uploaded certificates
    default: [],
  },

  // Verification status
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

const Adopter = mongoose.model("Adopter", adopterSchema);
export default Adopter;
