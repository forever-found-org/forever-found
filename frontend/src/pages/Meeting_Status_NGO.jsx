import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Meeting_Status_NGO() {
  const navigate = useNavigate();
  const { id: ngoId } = useParams();
  const [meetings, setMeetings] = useState([]);
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");

  const statusMap = {
    accepted: "Approved",
    fixed: "Scheduled",
    rejected: "Rejected",
    cancelled: "Cancelled",
  };

  const statusColorMap = {
    accepted: "bg-green-200 text-green-800",
    fixed: "bg-blue-200 text-blue-800",
    rejected: "bg-red-200 text-red-800",
    cancelled: "bg-gray-200 text-gray-800",
  };

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/meetings/ngo/${ngoId}/status`);
        if (!res.ok) throw new Error("Failed to fetch meetings");
        const data = await res.json();
        setMeetings(data);
        setFilteredMeetings(data); // initially show all
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMeetings();
  }, [ngoId]);

  // Update filtered meetings whenever filter or meetings change
  useEffect(() => {
    if (filter === "All") {
      setFilteredMeetings(meetings);
    } else {
      const statusKey = Object.keys(statusMap).find(
        (key) => statusMap[key] === filter
      );
      setFilteredMeetings(meetings.filter((m) => m.status === statusKey));
    }
  }, [filter, meetings]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  const handleHome = () => {
    const ngoData = JSON.parse(localStorage.getItem("ngo") || "{}");
    navigate(`/ngo-home/${ngoData.id}`);
  };

  return (
    <div className="w-screen p-6 bg-gradient-to-br from-orange-50 to-amber-100 min-h-screen font-serif">
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-orange-800 ml-6">Meeting Status</h2>
        
        <div className="ml-16">
        {/* Filter Dropdown */}
          <label className=" mr-2 font-semibold text-orange-700">Filter by status:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-1 rounded-lg border border-amber-300 shadow-sm"
          >
            <option>All</option>
            <option>Approved</option>
            <option>Scheduled</option>
            <option>Rejected</option>
            <option>Cancelled</option>
          </select>
          </div>
      <button
          onClick={handleHome}
          className="px-3 py-2 mr-2 bg-amber-700 text-white font-semibold rounded-2xl shadow-md hover:bg-amber-800 hover:shadow-lg hover:scale-105"
        >
          Home
        </button>
      </div>

      {filteredMeetings.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No meetings to show.</p>
      ) : (
        <div className="space-y-5 w-full mx-auto max-w-3xl">
          {filteredMeetings.map((meeting) => (
            <div
              key={meeting._id}
              onClick={() =>
                navigate(`/ngo-home/${ngoId}/meeting-status-details/${meeting._id}`)
              }
              className="bg-white rounded-2xl p-5 border border-amber-200 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-orange-900">
                  {meeting.adopterId?.fullName || "No name"}
                </h3>
                <p
                  className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
                    statusColorMap[meeting.status] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {statusMap[meeting.status] || meeting.status}
                </p>
              </div>

              <div className="mt-2 space-y-1 text-gray-700">
                <p>
                  <span className="font-semibold text-orange-700">Email:</span>{" "}
                  {meeting.adopterId?.email || "Not available"}
                </p>
                <p>
                  <span className="font-semibold text-orange-700">Children Requested:</span>{" "}
                  {meeting.childIds?.map((c) => c.name).join(", ") || "No children"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Meeting_Status_NGO;
