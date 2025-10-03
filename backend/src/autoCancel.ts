import Meeting from "./db/meetingsModel";

export async function cancelExpiredMeetings(): Promise<{ cancelledCount: number }> {
  const now = new Date();
  const cursor = Meeting.find({
    status: "accepted",
    meetDateChoices: { $exists: true, $ne: [] },
  }).cursor();

  let cancelledCount = 0;

  for await (const doc of cursor) {
    // Convert meet dates to Date objects
    const meetDates = doc.meetDateChoices.map(d => new Date(d));

    // Sort ascending
    meetDates.sort((a, b) => a.getTime() - b.getTime());

    // Drop last slot (adopter can still respond to it)
    const usableSlots = meetDates.slice(0, -1);

    // Check if **all usable slots have passed end-of-day**
    const allExpired = usableSlots.every(date => {
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      return now > endOfDay;
    });

    if (allExpired) {
      // Auto-cancel meeting
      const updated = await Meeting.findOneAndUpdate(
        { _id: doc._id, status: "accepted" },
        {
          $set: { status: "cancelled" },
          $push: {
            history: {
              status: "cancelled",
              changedBy: "system",
              timestamp: now,
              note: "Auto-cancelled: adopter did not confirm before last usable slot.",
            },
          },
        },
        { new: true, runValidators: true }
      );

      if (updated) cancelledCount++;
    }
  }

  return { cancelledCount };
}
