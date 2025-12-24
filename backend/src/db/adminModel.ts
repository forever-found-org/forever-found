import mongoose from "mongoose";
const adminSchema=new mongoose.Schema({
    name: {
    type: String,
    required: true
    },

    email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: "ADMIN"
  },

  status: {
    type: String,
    enum: ["ACTIVE", "BLOCKED"],
    default: "ACTIVE"
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  lastLogin: {
    type: Date
  },

  updatedAt: {
  type: Date,
  default: Date.now
}

});
const Admin = mongoose.model("Admin", adminSchema);
export default Admin;