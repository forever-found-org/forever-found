import express from "express";
import { loginAdmin,getApprovedNGOsForAdmin,getAllChildrenForAdmin,getAllAdopters } from "./adminController";
import { getAdopterDetails,getAdopterMeetings,blockAdopter,unblockAdopter,getAdopterAadhaar,getAdoptedChildren } from "./adminController";
import { getNGODetails,blockNgo,unblockNgo,getMeetingsForNGO,getAdoptedChildrenByNGO } from "./adminController";
import { getChildDetailsForAdmin,getMeetingsByChildForAdmin,blockChild,unblockChild } from "./adminController";
const router = express.Router();

router.post("/login", loginAdmin);
router.get("/ngos", getApprovedNGOsForAdmin);
router.get("/ngos/:id", getNGODetails);
router.patch("/ngos/:id/block", blockNgo);
router.patch("/ngos/:id/unblock", unblockNgo);
router.get("/ngos/:id/meetings", getMeetingsForNGO);
router.get("/ngos/:id/adopted-children", getAdoptedChildrenByNGO);

router.get("/children", getAllChildrenForAdmin);
router.get("/children/:id", getChildDetailsForAdmin);
router.get("/children/:id/meetings", getMeetingsByChildForAdmin);
router.patch("/children/:id/block", blockChild);
router.patch("/children/:id/unblock", unblockChild);

router.get("/adopters", getAllAdopters);
router.get("/adopters/:id", getAdopterDetails);
router.get("/adopters/:id/meetings", getAdopterMeetings);
router.patch("/adopters/:id/block", blockAdopter);
router.patch("/adopters/:id/unblock", unblockAdopter);
router.get("/adopters/:id/aadhaar", getAdopterAadhaar);
router.get("/adopters/:id/adopted-children", getAdoptedChildren);

export default router;
