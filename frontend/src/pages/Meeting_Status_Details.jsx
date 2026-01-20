import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Meeting_Status_Details() {
  const { id: ngoId, meetingId } = useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const statusMap = {
    accepted: "Approved",
    fixed: "Scheduled",
    rejected: "Rejected",
    cancelled: "Cancelled",
  };

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/meetings/${meetingId}`);
        if (!res.ok) throw new Error("Failed to fetch meeting details");
        const data = await res.json();


        if (data.status === "pending") {
          navigate(-1); // redirect back if pending
          return;
        }

        setMeeting(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (meetingId) fetchMeeting();
  }, [meetingId, navigate]);

  if (loading) return <p className="text-center mt-20 text-lg text-gray-600">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (!meeting) return <p className="text-center mt-20 text-gray-600">No meeting found</p>;

  const maskedAadhar = meeting.adopter?.aadharNumber
    ? meeting.adopter.aadharNumber.slice(0, 4) + "-XXXX-" + meeting.adopter.aadharNumber.slice(-4)
    : "Not provided";

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-orange-50 to-amber-100 p-6 font-serif">
      {/* Header */}
      <div className="flex justify-between items-center max-w-3xl mx-auto mb-4">
        <h2 className="text-3xl font-bold text-orange-800 drop-shadow-md">Meeting Details</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-2 mr-2 bg-amber-700 text-white font-medium rounded-xl shadow hover:text-black hover:scale-105"
        >
          Back
        </button>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Adopter Info */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-amber-200">
          <h3 className="text-2xl font-semibold text-orange-900 text-center mb-4 border-b border-amber-200 pb-2">
            Adopter Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><span className="font-semibold text-orange-700">Full Name:</span> {meeting.adopter?.fullName}</p>
            <p><span className="font-semibold text-orange-700">Email:</span> {meeting.adopter?.email}</p>
            <p><span className="font-semibold text-orange-700">Contact:</span> {meeting.adopter?.contactNumber}</p>
            <p><span className="font-semibold text-orange-700">Alt Contact:</span> {meeting.adopter?.alternateContactNumber || "Not provided"}</p>
            <p className="col-span-2"><span className="font-semibold text-orange-700">Address:</span> {meeting.adopter?.address}</p>
            <p><span className="font-semibold text-orange-700">Gender:</span> {meeting.adopter?.gender}</p>
            <p><span className="font-semibold text-orange-700">DOB:</span> {meeting.adopter?.dateOfBirth}</p>
            <p><span className="font-semibold text-orange-700">Marital Status:</span> {meeting.adopter?.maritalStatus}</p>
            <p><span className="font-semibold text-orange-700">Occupation:</span> {meeting.adopter?.occupation}</p>
            <p><span className="font-semibold text-orange-700">Salary:</span> {meeting.adopter?.salaryPerAnnum}</p>
            <p><span className="font-semibold text-orange-700">Biological Children:</span> {meeting.adopter?.numberOfBiologicalChildren}</p>
            <p><span className="font-semibold text-orange-700">Aadhar:</span> {maskedAadhar}</p>
            <p className="col-span-2"><span className="font-semibold text-orange-700">Health Status:</span> {meeting.adopter?.healthStatus?.join(", ") || "No info"}</p>
          </div>
        </div>

        {/* Children Info */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-amber-200">
          <h3 className="text-xl font-semibold text-orange-900 mb-3 border-b border-amber-200 pb-1">
            Children for Adoption
          </h3>
          <p>{meeting.childIds?.map(c => c.name).join(", ") || "No children info"}</p>
        </div>

        {/* Status Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-amber-200">
          <h3 className="text-xl font-semibold text-orange-900 mb-3 border-b border-amber-200 pb-1">
            Meeting Status: <span className="capitalize">{statusMap[meeting.status]}</span>
          </h3>

          {/* Accepted / Approved */}
            {meeting.status === "accepted" && meeting.meetDateChoices?.length > 0 && (
            <div>
                <p className="text-gray-700 mb-2">Slots provided by NGO:</p>
                <ul className="list-disc list-inside text-gray-800">
                {meeting.meetDateChoices.map((date, idx) => {
                    const slot = meeting.timeSlotChoices?.[idx] || "No time slot"; // <-- use timeSlots
                    const formattedDate = date ? new Date(date).toLocaleDateString() : "No date provided";
                    return (
                    <li key={idx}>
                        {formattedDate} — {slot}
                    </li>
                    );
                })}
                </ul>
            </div>
            )}


          {/* Fixed / Scheduled */}
          {meeting.status === "fixed" && meeting.fixedMeetDate && (
            <p className="text-green-700 font-medium">
              ✅ Meeting fixed for {new Date(meeting.fixedMeetDate).toLocaleDateString()} at {meeting.fixedTimeSlot || "No time provided"}
            </p>
          )}

          {/* Rejected */}
          {meeting.status === "rejected" && (
            <p className="text-red-600 font-medium">❌ This meeting was rejected by NGO.</p>
          )}

          {/* Cancelled */}
          {meeting.status === "cancelled" && (
            <p className="text-red-500 font-medium">🚫 The adopter cancelled all proposed slots.</p>
          )}
        </div>

        {/* Timeline Section */}
        <section className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Timeline</h3>
          {meeting.history?.length > 0 ? (
            <ol className="border-l-2 border-blue-400 ml-2 space-y-3">
              {meeting.history.map((event, idx) => (
                <li key={idx} className="ml-4">
                  <div className="flex flex-col">
                    <span className="text-blue-700 font-medium">{event.status}</span>
                    <span className="text-sm text-gray-500">
                      by {event.changedBy} on {new Date(event.timestamp).toLocaleString()}
                    </span>
                    {event.note && <span className="text-sm text-gray-700 italic">{event.note}</span>}
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-600 italic">No history available</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Meeting_Status_Details;
