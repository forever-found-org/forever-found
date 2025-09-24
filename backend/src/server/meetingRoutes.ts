import express from "express";
import { getMeetingsByAdopter } from "./meetingController";

const router = express.Router();

// Route: /api/meetings/adopter/:adopterId
router.get("/adopter/:adopterId", getMeetingsByAdopter);

export default router;
