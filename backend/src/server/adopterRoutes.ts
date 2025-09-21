import express from "express";
import { loginAdopter } from "./adopterControllers"; // import your controller
import { getAdopterById } from "./adopterControllers";
import { updateAdopter } from "./adopterControllers";
const router = express.Router();

// POST /api/adopters/login
router.post("/login", loginAdopter);
router.get("/:id",getAdopterById);
router.put("/:id", updateAdopter);


// Later you can add more routes, e.g., /:id, /update, etc.

export default router;
