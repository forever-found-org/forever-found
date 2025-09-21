import express from "express";
import multer from "multer";
import { findChildrenMatches } from "./childrenController";
import { getChilByID } from "./childrenController";
import { createChild } from "./childrenController";
import { upload } from "../multer";

const router = express.Router();
router.post("/match", findChildrenMatches);
router.get("/:id",getChilByID);
//creating new child
router.post("/create", upload.array("gallery"), createChild);

export default router;
