import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PendingRequestDetails_NGO() {
  const params = useParams();
  const ngoId = params.id;
  const meetingId = params.meetingId;
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showSlots, setShowSlots] = useState(false);
  const [slots, setSlots] = useState([
    { date: "", startTime: "", endTime: "" },
    { date: "", startTime: "", endTime: "" },
    { date: "", startTime: "", endTime: "" }
  ]);

  const BUSINESS_TIMES = [
    "09:00 AM", "09:30 AM",
    "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM",
    "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM",
    "06:00 PM"
  ];

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/meetings/${meetingId}`);
        if (!res.ok) throw new Error("Failed to fetch meeting details");
        const data = await res.json();
        setMeeting(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (meetingId) fetchMeeting();
  }, [meetingId]);

  const handleAcceptClick = () => setShowSlots(true);

  const handleSubmitSlots = async () => {
  if (!meeting) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const meetDateChoices = [];
  const timeSlotChoices = [];

  // helper: convert AM/PM to minutes
  const toMinutes = t => {
    if (!t) return 0;
    const [h, m, ampm] = t.match(/(\d+):(\d+) (\w+)/).slice(1);
    let hour = parseInt(h) % 12 + (ampm === "PM" ? 12 : 0);
    return hour * 60 + parseInt(m);
  };

  for (let { date, startTime, endTime } of slots) {
    if (!date || !startTime || !endTime) continue;

    const slotDate = new Date(date);
    if (slotDate < today) {
      alert(`Date cannot be before today: ${date}`);
      return;
    }

    // Check max duration (2 hours)
    const duration = toMinutes(endTime) - toMinutes(startTime);
    if (duration > 120) {
      alert(`Slot ${startTime} - ${endTime} exceeds maximum duration of 2 hours.`);
      return;
    }

    meetDateChoices.push(date);
    timeSlotChoices.push(`${startTime} - ${endTime}`);
  }

  if (meetDateChoices.length === 0) {
    alert("Please enter at least one valid slot.");
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/meetings/${meetingId}/accept`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ meetDateChoices, timeSlotChoices }),
    });

    if (!res.ok) throw new Error("Failed to update meeting");

    const updatedMeeting = await res.json();
    setMeeting(updatedMeeting);
    setShowSlots(false);
    alert("Meeting Approved! Check status in Meeting Status feature");
    navigate(`/ngo-home/${ngoId}/meeting-status`);
  } catch (err) {
    console.error(err);
    alert("Error updating meeting: " + err.message);
  }
};


  const handleReject = async () => {
    if (!meeting) return;

    try {
      const res = await fetch(`http://localhost:5000/api/meetings/${meetingId}/reject`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to reject meeting");

      const updatedMeeting = await res.json();
      setMeeting(updatedMeeting);
      alert("Meeting rejected successfully!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Error rejecting meeting: " + err.message);
    }
  };

  if (loading) return <p className="text-center mt-20 text-lg text-gray-600">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  const adopter = meeting.adopterId;

  // Mask sensitive info
  const maskedAadhar = meeting.adopter?.aadharNumber
    ? meeting.adopter.aadharNumber.slice(0, 4) + "-XXXX-" + meeting.adopter.aadharNumber.slice(-4)
    : "Not provided";

  const getTodayDate = () => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset()); // adjust to local timezone
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-orange-50 to-amber-100 p-6 font-serif">
      <div className="flex justify-between items-center max-w-3xl mx-auto mb-4">
        <h2 className="text-4xl ml-4 font-bold text-orange-800 drop-shadow-md">Meeting Details</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-2 mr-2 bg-amber-700 text-white font-medium rounded-xl shadow hover:text-black hover:scale-105"
        >
          Back
        </button>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Adopter Info Card */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-amber-200">
          <h3 className="text-2xl font-semibold text-orange-900 text-center mb-4 border-b border-amber-200 pb-2">Adopter Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><span className="font-semibold text-orange-700">Full Name:</span> {meeting.adopter?.fullName}</p>
            <p><span className="font-semibold text-orange-700">Email:</span> {meeting.adopter?.email}</p>
            <p><span className="font-semibold text-orange-700">Contact Number:</span> {meeting.adopter?.contactNumber}</p>
            <p><span className="font-semibold text-orange-700">Alternate Contact:</span> {meeting.adopter?.alternateContactNumber || "Not provided"}</p>
            <p className="col-span-2"><span className="font-semibold text-orange-700">Address:</span> {meeting.adopter?.address}</p>
            <p><span className="font-semibold text-orange-700">Gender:</span> {meeting.adopter?.gender}</p>
            <p><span className="font-semibold text-orange-700">Date of Birth:</span>{meeting.adopter?.dateOfBirth} </p>
            <p><span className="font-semibold text-orange-700">Marital Status:</span> {meeting.adopter?.maritalStatus}</p>
            <p><span className="font-semibold text-orange-700">Occupation:</span> {meeting.adopter?.occupation}</p>
            <p><span className="font-semibold text-orange-700">Salary per Annum:</span> {meeting.adopter?.salaryPerAnnum}</p>
            <p><span className="font-semibold text-orange-700">Number of Biological Children:</span> {meeting.adopter?.numberOfBiologicalChildren}</p>
            <p><span className="font-semibold text-orange-700">Aadhar Number:</span> {maskedAadhar}</p>
            <p className="col-span-2"><span className="font-semibold text-orange-700">Health Status:</span> {meeting.adopter?.healthStatus?.length ? meeting.adopter.healthStatus.join(", ") : "No info provided"}</p>
          </div>
        </div>

        {/* Children Info Card */}
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-amber-200">
          <h3 className="text-xl font-semibold text-orange-900 mb-3 border-b border-amber-200 pb-1">Children for Adoption</h3>
          <p>{meeting.childIds?.map(c => c.name).join(", ") || "No children info"}</p>
        </div>

        {/* Action Buttons */}
        {!showSlots && (
          <div className="flex justify-end gap-4">
            <button onClick={handleReject} className="px-6 py-2 bg-red-400 text-white rounded-xl shadow hover:bg-red-500 transition">Reject</button>
            <button onClick={handleAcceptClick} className="px-6 py-2 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition">Accept</button>
          </div>
        )}

        {/* Time Slots Section */}
        {showSlots && (
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-amber-200 space-y-4">
            <h3 className="text-xl font-semibold text-orange-900 mb-2 border-b border-amber-200 pb-1">Enter Meeting Time Slots</h3>
            <div className="space-y-3">
              {slots.map((slot, i) => (
                <div key={i} className="flex gap-3">
                  <input
                    type="date"
                    className="border border-gray-300 rounded-lg p-2 flex-1"
                    min={getTodayDate()}
                    value={slot.date}
                    onChange={(e) => {
                      const newSlots = [...slots];
                      newSlots[i].date = e.target.value;
                      setSlots(newSlots);
                    }}
                  />

                  {/* Start Time Dropdown */}
                  <select
                    className="border border-gray-300 rounded-lg p-2 flex-1"
                    value={slot.startTime}
                    onChange={(e) => {
                      const newSlots = [...slots];
                      newSlots[i].startTime = e.target.value;
                      setSlots(newSlots);
                    }}
                  >
                    <option value="">Select start time</option>
                    {BUSINESS_TIMES.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>

                  {/* End Time Dropdown */}
                  <select
                    className="border border-gray-300 rounded-lg p-2 flex-1"
                    value={slot.endTime}
                    onChange={(e) => {
                      const newSlots = [...slots];
                      newSlots[i].endTime = e.target.value;
                      setSlots(newSlots);
                    }}
                  >
                    <option value="">Select end time</option>
                    {BUSINESS_TIMES.filter(time => {
                      if (!slot.startTime) return true;
                      // convert AM/PM to minutes
                      const toMinutes = t => {
                        let [h, m, ampm] = t.match(/(\d+):(\d+) (\w+)/).slice(1);
                        let hour = parseInt(h) % 12 + (ampm === "PM" ? 12 : 0);
                        return hour * 60 + parseInt(m);
                      };
                      return toMinutes(time) > toMinutes(slot.startTime);
                    }).map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>

                </div>
              ))}
            </div>
            <div className="flex justify-end gap-4">
              <button onClick={handleSubmitSlots} className="px-6 py-2 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition">Submit Slots</button>
              <button onClick={() => setShowSlots(false)} className="px-6 py-2 bg-gray-300 rounded-xl shadow hover:bg-gray-400 transition">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PendingRequestDetails_NGO;
