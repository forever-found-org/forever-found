import express from "express";
import cloudUpload from "../cloudUpload";
import { registerAdopter,verifyAdopterEmail } from "./adopterControllers";
import { loginAdopter } from "./adopterControllers"; // import your controller
import { getAdopterById } from "./adopterControllers";
import { updateAdopter } from "./adopterControllers";
import { getAdoptionHistoryByAdopter,getSingleAdoptedChild } from "./adopterControllers";

const router = express.Router();

//signup
router.post( "/signup", cloudUpload.fields([
    { name: "aadharimg", maxCount: 1 },
    { name: "medicalCertificates", maxCount: 5 },
  ]),
  registerAdopter
);

// EMAIL VERIFICATION
router.get("/verify-email/:token", verifyAdopterEmail);

// PHONE VERIFICATION (OTP)
//router.post("/verify-phone", verifyAdopterPhone);

// POST /api/adopters/login
router.post("/login", loginAdopter);
router.get("/:id",getAdopterById);
router.put("/:id",cloudUpload.array("medicalCertificates"), updateAdopter);

// Adoption history
router.get("/:adopterId/adoption-history", getAdoptionHistoryByAdopter);
router.get( "/:adopterId/adoption-history/:childId",getSingleAdoptedChild);

export default router;