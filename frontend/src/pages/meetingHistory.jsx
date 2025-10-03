import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function MeetingHistory() {
  const { adopterId } = useParams(); // route is /adopter/:adopterId/meetings
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all"); // Status filter state
  const navigate = useNavigate();

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

  // Filter meetings by selected status
  const filteredMeetings =
    statusFilter === "all"
      ? meetings
      : meetings.filter((m) => m.status === statusFilter);

  return (
    <div className="w-screen p-6 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen font-serif">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-blue-900 ml-6">Meeting History</h2>
        <button
          onClick={() => navigate(`/adopter-home/${adopterId}`)}
          className="px-3 py-2 mr-3 mb-2 bg-amber-700 text-white font-semibold rounded-2xl shadow-md hover:bg-amber-800 hover:shadow-lg hover:scale-105"
        >
          Home
        </button>
      </div>

      {/* Status Filter */}
      <div className="mb-4 ml-6">
        <label className="mr-3 font-semibold text-gray-700">Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="fixed">Fixed</option>
          <option value="rejected">Rejected</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="space-y-3 w-full mx-auto">
        {filteredMeetings.length > 0 ? (
          filteredMeetings.map((meeting) => (
            <div
              key={meeting._id}
              onClick={() =>
                navigate(`/adopter/${adopterId}/meetings/${meeting._id}`)
              }
              className="bg-white rounded-2xl p-4 border border-blue-200 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-blue-900">
                  {meeting.ngoId?.name || "No NGO"}
                </h3>
                <p
                  className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
                    meeting.status === "pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : meeting.status === "accepted"
                      ? "bg-green-200 text-green-800"
                      : meeting.status === "fixed"
                      ? "bg-blue-200 text-blue-800"
                      : meeting.status === "rejected"
                      ? "bg-red-200 text-red-800"
                      : meeting.status === "cancelled"
                      ? "bg-red-300 text-red-900"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <span className="font-semibold">Status:</span>{" "}
                  {meeting.status === "accepted" ? "Accepted" : meeting.status}
                </p>
              </div>

              <div className="mt-2 space-y-1 text-gray-700">
                <p>
                  <span className="font-semibold text-blue-700">Email:</span>{" "}
                  {meeting.ngoId?.email || "Not available"}
                </p>
                <p>
                  <span className="font-semibold text-blue-700">Location:</span>{" "}
                  {meeting.ngoId?.location || "Not provided"}
                </p>
                <p>
                  <span className="font-semibold text-blue-700">Children Requested:</span>{" "}
                  {meeting.childIds?.map((c) => c.name).join(", ") || "No children"}
                </p>
              </div>

              {meeting.fixedMeetDate && (
                <p className="mt-2 text-sm text-gray-600 italic">
                  Final Meeting Fixed:{" "}
                  {new Date(meeting.fixedMeetDate).toLocaleDateString()} at{" "}
                  {meeting.fixedTimeSlot}
                </p>
              )}

              {/* {meeting.status === "cancelled" && (
                <p className="mt-2 text-red-600 font-semibold">
                  Meeting cancelled by you
                </p>
              )} */}

              <p className="text-blue-500 mt-2 text-sm italic">
                Click to view more details
              </p>
            </div>
          ))
        ) : (
          <p className="text-center mt-10 text-gray-600">
            No meetings found for this status.
          </p>
        )}
      </div>
    </div>
  );
}

export default MeetingHistory;
