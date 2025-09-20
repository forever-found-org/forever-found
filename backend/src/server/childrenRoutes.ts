import express from "express";
import { getChildren } from "./childrenController";

const router = express.Router();
router.get("/", getChildren);

export default router;
