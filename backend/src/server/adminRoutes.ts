import express from "express";
import { loginAdmin,getApprovedNGOsForAdmin,getAllChildrenForAdmin,getAllAdopters } from "./adminController";
const router = express.Router();

router.post("/login", loginAdmin);
router.get("/ngos", getApprovedNGOsForAdmin);

router.get("/children", getAllChildrenForAdmin);

router.get("/adopters", getAllAdopters);


export default router;
