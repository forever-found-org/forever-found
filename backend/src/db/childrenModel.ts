import mongoose from "mongoose";
const childSchema = new mongoose.Schema({
  ngoId: { type: mongoose.Schema.Types.ObjectId, ref: "NGO", required: true },
  name: String,
  age: Number,
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  dateOfBirth: Date,
  healthStatus: String,
  educationLevel: String,
  religion: String,
  gallery: [String],  
  adoptionStatus: {
    type: String,
    enum: ["Available", "Adopted"],
    default: "Available"
  },
  adopterId: { type: mongoose.Schema.Types.ObjectId, ref: "Adopter", default: null } // only set when adopted
});

const Child = mongoose.model("Child", childSchema);
export default Child;