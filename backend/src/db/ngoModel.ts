  import mongoose from "mongoose";

  const ngoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    yearOfEstablishment: Number,
    website: String,
    contact: String,
    email: String,
    registrationNumber: String,
    caraRegistrationNumber: String,
    verified: Boolean,
    about: String,
    numberOfChildren: Number,
    image: String,
    testimonials: [
      {
        name: String,
        role: String,
        feedback: String,
      },
    ],
    gallery: [String],
  });

  const NGO = mongoose.model("NGO", ngoSchema);

  export default NGO;
