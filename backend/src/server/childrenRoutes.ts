import express from "express";
import multer from "multer";
import { findChildrenMatches } from "./childrenController";
import { getChilByID } from "./childrenController";
import { createChild } from "./childrenController";
import { upload } from "../multer";
import { getChildrenByNgo } from "./childrenController";
import { updateChild } from "./childrenController";

const router = express.Router();
router.post("/match", findChildrenMatches);
//view children
router.get("/ngo/:ngoId", getChildrenByNgo);
router.get("/:id",getChilByID);
//creating new child
router.post("/create", upload.array("gallery"), createChild);


router.put("/update/:id", upload.array("gallery"), updateChild);


export default router;
