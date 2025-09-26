import express from "express";
import { getMeetingsByAdopter , createMeeting } from "./meetingController";

const router = express.Router();

// Route: /api/meetings/adopter/:adopterId
router.get("/adopter/:adopterId", getMeetingsByAdopter);
router.post("/", createMeeting);

export default router;
