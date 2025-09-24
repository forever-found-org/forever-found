import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MeetingHistory() {
  const { adopterId } = useParams(); // assuming route is /adopter/:adopterId/meetings
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMeetings() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/meetings/adopter/${adopterId}`
        );
        if (!res.ok) throw new Error("Failed to fetch meeting history");
        const data = await res.json();
        setMeetings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMeetings();
  }, [adopterId]);

  if (loading)
    return (
      <p className="text-center mt-10 text-lg text-gray-600">
        Loading meetings...
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-lg text-red-500">{error}</p>
    );

  if (meetings.length === 0)
    return (
      <p className="text-center mt-10 text-lg text-gray-700">
        No meeting history found.
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 py-10 px-6 font-serif">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
        My Meeting History
      </h2>

      <div className="space-y-8 max-w-5xl mx-auto">
        {meetings.map((meeting) => (
          <div
            key={meeting._id}
            className="bg-white rounded-xl shadow-lg p-6 border-l-8 border-blue-600"
          >
            {/* Meeting Summary */}
            <div className="mb-4">
              <p>
                <span className="font-semibold text-blue-700">Status:</span>{" "}
                <span
                  className={`px-3 py-1 rounded-lg text-white ${
                    meeting.status === "pending"
                      ? "bg-yellow-500"
                      : meeting.status === "accepted"
                      ? "bg-green-600"
                      : meeting.status === "fixed"
                      ? "bg-blue-600"
                      : "bg-red-600"
                  }`}
                >
                  {meeting.status.toUpperCase()}
                </span>
              </p>
              {meeting.fixedMeetDate && (
                <p>
                  <span className="font-semibold text-blue-700">
                    Final Meeting:
                  </span>{" "}
                  {new Date(meeting.fixedMeetDate).toLocaleDateString()} at{" "}
                  {meeting.fixedTimeSlot}
                </p>
              )}
            </div>

            {/* Meeting Timeline */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Timeline
              </h3>
              <ol className="border-l-2 border-blue-400 ml-2 space-y-3">
                {meeting.history.map((event, idx) => (
                  <li key={idx} className="ml-4">
                    <div className="flex flex-col">
                      <span className="text-blue-700 font-medium">
                        {event.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        by {event.changedBy} on{" "}
                        {new Date(event.timestamp).toLocaleString()}
                      </span>
                      {event.note && (
                        <span className="text-sm text-gray-700 italic">
                          {event.note}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeetingHistory;
