import express from "express";
import { getAllNGOs, getNGODetails, validateNgoId, loginNGO,updateNGODetails } from "./ngoController";

const router = express.Router();

// Fetch all NGOs for cards page
router.get("/", getAllNGOs);

// Fetch full details for a single NGO
router.get("/:id", getNGODetails);

// Validate NGO ID during child insertion
router.post("/validate-ngo", validateNgoId);

// --- NEW: NGO login route ---
router.post("/login", loginNGO);

router.put("/:id", updateNGODetails);

export default router;
