import express from "express";
import { getAllNGOs, getNGODetails, validateNgoId } from "./ngoController";

const router = express.Router();

router.get("/", getAllNGOs);          // Fetch all NGOs for cards page
router.get("/:id", getNGODetails);    // Fetch full details for single NGO
router.post("/validate-ngo", validateNgoId); //for ngo validation durinf insertion of new child
export default router;
