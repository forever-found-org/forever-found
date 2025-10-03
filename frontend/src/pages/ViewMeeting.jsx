import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ViewMeeting() {
  const { adopterId, meetingId } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [fixed, setFixed] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMeetingDetails() {
      try {
        const res = await fetch(`http://localhost:5000/api/meetings/${meetingId}`);
        if (!res.ok) throw new Error("Failed to fetch meeting details");
        const data = await res.json();
        setMeeting(data);

        if (data.status === "fixed") {
          setSelectedSlot({
            date: new Date(data.fixedMeetDate),
            time: data.fixedTimeSlot,
          });
          setFixed(true);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMeetingDetails();
  }, [meetingId]);

  if (loading) return <p className="text-center mt-10 text-lg text-gray-600">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-lg text-red-500">{error}</p>;
  if (!meeting) return <p className="text-center mt-10 text-lg text-gray-700">Meeting not found</p>;

  const now = new Date();

  // Prepare slots with disabled flag if expired
  const slots = meeting.meetDateChoices?.map((date, idx) => {
  const slotDate = new Date(date);

  // Check if the slot's day is today or in the past
  const expired = slotDate.setHours(0, 0, 0, 0) <= now.setHours(0, 0, 0, 0);

  return {
    date: slotDate,
    time: meeting.timeSlotChoices[idx],
    expired,
  };
}) || [];


  async function handleCancel() {
    if (cancelling) return; // prevent double clicks
    setCancelling(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/meetings/${meetingId}/cancel`,
        { method: "PATCH", headers: { "Content-Type": "application/json" } }
      );

      if (!res.ok) throw new Error("Failed to cancel meeting");

      const updatedMeeting = await res.json();
      setMeeting(updatedMeeting);
    } catch (err) {
      alert(err.message);
    } finally {
      setCancelling(false);
    }
  }

  async function handlefix() {
    if (!selectedSlot) {
      alert("Please select a time slot before fixing the meeting.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/meetings/${meetingId}/fix`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fixedMeetDate: selectedSlot.date,
          fixedTimeSlot: selectedSlot.time,
        }),
      });

      if (!res.ok) throw new Error("Failed to fix meeting");

      const updatedMeeting = await res.json();
      setMeeting(updatedMeeting);
      setFixed(true);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 py-10 px-6 font-serif">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-blue-900 ml-32">Meeting Details</h2>
        <button
          onClick={() => navigate(`/adopter/${adopterId}/meetings`)}
          className="border bg-amber-500 rounded-md px-4 py-2 font-serif mr-32 hover:bg-amber-600 hover:scale-105 transition"
        >
          Back
        </button>
      </div>

      <div className="max-w-6xl mx-auto space-y-10">
        {/* NGO Details */}
        <section className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">NGO Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <p><span className="font-medium">Name:</span> {meeting.ngoId?.name}</p>
            <p><span className="font-medium">Location:</span> {meeting.ngoId?.location}</p>
            <p><span className="font-medium">City:</span> {meeting.ngoId?.city}</p>
            <p><span className="font-medium">State:</span> {meeting.ngoId?.state}</p>
            <p><span className="font-medium">Email:</span> {meeting.ngoId?.email}</p>
            <p><span className="font-medium">Contact:</span> {meeting.ngoId?.contact}</p>
          </div>
        </section>

        {/* Child Details */}
        <section className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Child Details</h3>
          {meeting.childIds && meeting.childIds.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {meeting.childIds.map((child) => (
                <div key={child._id} className="bg-blue-50 rounded-lg p-4 shadow hover:shadow-lg transition">
                  <p className="font-semibold text-blue-700 mb-1">{child.name}</p>
                  <p>Age: {child.age}</p>
                  <p>Gender: {child.gender}</p>
                  <p className="italic">Medical: {child.healthStatus || "None"}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 italic">No children linked to this meeting</p>
          )}
        </section>

        {/* Timeline Section */}
        <section className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Timeline</h3>
          {meeting.history && meeting.history.length > 0 ? (
            <ol className="border-l-2 border-blue-400 ml-2 space-y-3">
              {meeting.history.map((event, idx) => (
                <li key={idx} className="ml-4">
                  <div className="flex flex-col">
                    <span className="text-blue-700 font-medium">{event.status}</span>
                    <span className="text-sm text-gray-500">
                      by {event.changedBy} on {new Date(event.timestamp).toLocaleString()}
                    </span>
                    {event.note && (
                      <span className="text-sm text-gray-700 italic">{event.note}</span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-600 italic">No history available</p>
          )}
        </section>

        {/* Time Slots Section */}
        <section className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Meeting Slots</h3>

          <div className="mb-6">
            <p className="font-medium text-gray-800 mb-2">Time Slots Given by NGO:</p>
            {meeting.status === "pending" ? (
              <p className="text-gray-600 italic">Nothing given by NGO</p>
            ) : meeting.status === "accepted" && slots.length > 0 ? (
              <div className="space-y-2">
                {slots.map((slot, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center space-x-2 mb-2 ${
                      slot.expired ? "text-gray-400 cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    <input
                      type="radio"
                      name="slot"
                      disabled={fixed || slot.expired}
                      value={idx}
                      checked={
                        selectedSlot?.date?.getTime() === slot.date.getTime() &&
                        selectedSlot?.time === slot.time
                      }
                      onChange={() => setSelectedSlot(slot)}
                      className="cursor-pointer"
                    />
                    <span>{slot.date.toLocaleDateString()} at {slot.time}</span>
                  </label>
                ))}
              </div>
            ) : fixed && selectedSlot ? (
              <p>{selectedSlot.date.toLocaleDateString()} at {selectedSlot.time}</p>
            ) : (
              <p className="text-gray-600 italic">No slots available</p>
            )}
          </div>

          {/* Selected Slot */}
          <div className="mb-4">
            <p className="font-medium text-gray-800 mb-1">Selected Time Slot:</p>
            {selectedSlot ? (
              <p>{selectedSlot.date.toLocaleDateString()} at {selectedSlot.time}</p>
            ) : (
              <p className="text-gray-600 italic">Nothing selected</p>
            )}
          </div>

          {/* Cancel / Auto-cancel messages */}
          {meeting.status !== "cancelled" && meeting.status !== "fixed" && meeting.status !== "rejected" && meeting.status !== "pending" && (
            <button
              onClick={handleCancel}
              disabled={cancelling}
              className={`mr-2 px-5 py-2 rounded-md text-white transition hover:scale-105 ${
                cancelling ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {cancelling ? "Cancelling..." : "Cancel Meet"}
            </button>
          )}
          {meeting.status === "cancelled" && (
            <p className="mt-2 text-red-600 font-semibold">
              {meeting.history?.some(h => h.changedBy === "system")
                ? "Meeting has been auto-cancelled as you did not confirm any slot in time."
                : "Meeting cancelled by you"}
            </p>
          )}


          {meeting.status === "rejected" && (
            <p className="mt-2 text-red-600 font-semibold">Meeting rejected by NGO</p>
          )}

          {meeting.status === "fixed" && (
            <p className="mt-2 text-green-600 font-semibold">Meeting fixed on {new Date(meeting.fixedMeetDate).toLocaleDateString()} at {meeting.fixedTimeSlot}</p>
          )}

          {/* Fix Meet Button */}
          {!fixed && meeting.status === "accepted" && selectedSlot && (
            <button
              onClick={handlefix}
              className="mt-2 bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 hover:scale-105 transition"
            >
              Fix Meet
            </button>
          )}
        </section>
      </div>
    </div>
  );
}

export default ViewMeeting;
