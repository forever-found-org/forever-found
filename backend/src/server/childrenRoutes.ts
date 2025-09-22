import express from "express";
import multer from "multer";
import { findChildrenMatches } from "./childrenController";
import { getChilByID } from "./childrenController";
import { createChild } from "./childrenController";
import { upload } from "../multer";
import { getChildrenByNgo } from "./childrenController";

const router = express.Router();
router.post("/match", findChildrenMatches);
router.get("/:id",getChilByID);
//creating new child
router.post("/create", upload.array("gallery"), createChild);
//view children
router.get("/ngo/:ngoId", getChildrenByNgo);

export default router;
