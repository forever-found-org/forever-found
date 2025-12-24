import express from "express";
import { loginAdmin } from "./adminController";
const router = express.Router();

router.post("/login", loginAdmin);

export default router;
