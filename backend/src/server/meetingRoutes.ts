    import express from "express";
    import { getMeetingsByAdopter , createMeeting, getPendingMeetingsForNGO, getMeetingById } from "./meetingController";
    import { acceptMeeting, rejectMeeting, getNonPendingMeetingsForNGO } from "./meetingController";

    const router = express.Router();

    // Route: /api/meetings/adopter/:adopterId
    router.get("/adopter/:adopterId", getMeetingsByAdopter);
    router.post("/", createMeeting);

    router.get("/ngo/:ngoId/pending", getPendingMeetingsForNGO);
    router.get("/ngo/:ngoId/status", getNonPendingMeetingsForNGO);
    router.get("/:id", getMeetingById);

    router.patch("/:id/accept", acceptMeeting);
    router.patch("/:id/reject", rejectMeeting);


    export default router;
