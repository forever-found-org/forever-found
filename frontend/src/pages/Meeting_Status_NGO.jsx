import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Meeting_Status_NGO() {
  const navigate = useNavigate();
  const { id: ngoId } = useParams();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/meetings/ngo/${ngoId}/status`);
        if (!res.ok) throw new Error("Failed to fetch meetings");
        const data = await res.json();
        // filter out pending meetings
        const filtered = data.filter(m => m.status !== "pending");
        setMeetings(filtered);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [ngoId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

  const handleHome = () => {
    const ngoData = JSON.parse(localStorage.getItem("ngo")) || {};
    navigate(`/ngo-home/${ngoData.id}`);
  };

  return (
    <div className="w-screen p-6 bg-gradient-to-br from-orange-50 to-amber-100 min-h-screen font-serif">
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-orange-800 ml-6">
          Meeting Status
        </h2>
        <button
          onClick={handleHome}
          className="px-3 py-2 mr-2 bg-amber-700 text-white font-semibold rounded-2xl shadow-md hover:bg-amber-800 hover:shadow-lg hover:scale-105"
        >
          Home
        </button>
      </div>

      {meetings.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No meetings to show.</p>
      ) : (
        <div className="space-y-5 w-full mx-auto max-w-3xl">
          {meetings.map((meeting) => (
            <div
              key={meeting._id}
              onClick={() =>
                navigate(`/ngo-home/${ngoId}/meeting-status/${meeting._id}`)
              }
              className="bg-white rounded-2xl p-5 border border-amber-200 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-orange-900">
                  {meeting.adopterId?.fullName || "No name"}
                </h3>
                <p
                  className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
                    meeting.status === "accepted"
                      ? "bg-green-200 text-green-800"
                      : meeting.status === "rejected"
                      ? "bg-red-200 text-red-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {meeting.status === "accepted" ? "Approved" : "Rejected"}
                </p>
              </div>

              <div className="mt-2 space-y-1 text-gray-700">
                <p>
                  <span className="font-semibold text-orange-700">Email:</span>{" "}
                  {meeting.adopterId?.email || "Not available"}
                </p>
                <p>
                  <span className="font-semibold text-orange-700">
                    Children Requested:
                  </span>{" "}
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
