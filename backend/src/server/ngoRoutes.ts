import express from "express";
import cloudUpload from "../cloudUpload";
import { registerNGO } from "./ngoController";
import { getAllNGOs, getNGODetails, validateNgoId, loginNGO,updateNGODetails } from "./ngoController";

const router = express.Router();

//signup
router.post(
  "/signup",
  cloudUpload.fields([
    { name: "logo", maxCount: 1 },
    { name: "registrationCert", maxCount: 1 },
    { name: "caraCert", maxCount: 1 },
    { name: "gallery", maxCount: 3 },
  ]),
  registerNGO
);

// Fetch all NGOs for cards page
router.get("/", getAllNGOs);

// Fetch full details for a single NGO
router.get("/:id", getNGODetails);

// Validate NGO ID during child insertion
router.post("/validate-ngo", validateNgoId);

// --- NEW: NGO login route ---
router.post("/login", loginNGO);

router.put("/:id",cloudUpload.array("newGallery", 3), updateNGODetails);

export default router;
