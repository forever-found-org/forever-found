import express from "express";
import { findChildrenMatches } from "./childrenController";
import { getChilByID } from "./childrenController";

const router = express.Router();
router.post("/match", findChildrenMatches);
router.get("/:id",getChilByID);

export default router;
