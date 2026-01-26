import express from "express";
import cloudUpload from "../cloudUpload";
import { registerAdopter } from "./adopterControllers";
import { loginAdopter } from "./adopterControllers"; // import your controller
import { getAdopterById } from "./adopterControllers";
import { updateAdopter } from "./adopterControllers";

const router = express.Router();

router.post( "/signup", cloudUpload.fields([
    { name: "aadharimg", maxCount: 1 },
    { name: "medicalCertificates", maxCount: 5 },
  ]),
  registerAdopter
);

// POST /api/adopters/login
router.post("/login", loginAdopter);
router.get("/:id",getAdopterById);
router.put("/:id", updateAdopter);


export default router;
