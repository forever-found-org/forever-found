import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Adopter_Approval_details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [adopter, setAdopter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rejectReason, setRejectReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  /* Aadhaar */
  const [showAadhaar, setShowAadhaar] = useState(false);
  const [aadhaarData, setAadhaarData] = useState(null);

  useEffect(() => {
    fetchAdopter();
  }, []);

  const fetchAdopter = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/adopters/${id}`
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      setAdopter(data);
    } catch {
      alert("Failed to load adopter details");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- APPROVE ---------------- */
  const handleApprove = async () => {
    try {
      setActionLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/admin/adopters/${id}/approve`,
        { method: "PATCH" }
      );
      if (!res.ok) throw new Error();
      navigate("/admin/adopter-approval");
    } catch {
      alert("Failed to approve adopter");
    } finally {
      setActionLoading(false);
    }
  };

  /* ---------------- REJECT ---------------- */
  const handleReject = async () => {
    if (!rejectReason.trim()) {
      return alert("Rejection reason is required");
    }

    try {
      setActionLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/admin/adopters/${id}/reject`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reason: rejectReason }),
        }
      );
      if (!res.ok) throw new Error();
      navigate("/admin/adopter-approval");
    } catch {
      alert("Failed to reject adopter");
    } finally {
      setActionLoading(false);
    }
  };

  /* ---------------- AADHAAR ---------------- */
  const fetchAadhaar = async () => {
    if (!window.confirm("This contains sensitive Aadhaar data. Continue?"))
      return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/adopters/${id}/aadhaar`
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      setAadhaarData(data);
      setShowAadhaar(true);
    } catch {
      alert("Failed to fetch Aadhaar details");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!adopter) return <p className="text-center mt-10">Adopter not found</p>;

  return (
    <div className="min-h-screen bg-[#fff0e5] font-serif pt-10">
      <div className="max-w-5xl mx-auto bg-[#fffdfc] p-6 rounded-md shadow-lg border">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold uppercase tracking-wide">
            Adopter Verification
          </h2>
          <button
            onClick={() => navigate("/admin/adopter-approval")}
            className="px-3 py-1 border rounded bg-[#fff0e5]"
          >
            ← Back
          </button>
        </div>

        {/* PERSONAL */}
        <Section title="Personal Information" bg="bg-[#f2e8cf]">
          <Grid>
            <Info label="Full Name" value={adopter.fullName} />
            <Info label="Religion" value={adopter.religion} />
            <Info label="Gender" value={adopter.gender} />
            <Info label="Date of Birth" value={adopter.dateOfBirth} />
          </Grid>
        </Section>

        {/* CONTACT */}
        <Section title="Contact Details" bg="bg-[#dbeaf3]">
          <Grid>
            <Info label="Email" value={adopter.email} />
            <Info label="Phone" value={adopter.contactNumber} />
            <Info
              label="Alternate Phone"
              value={adopter.alternateContactNumber || "-"}
            />
            <Info label="Address" value={adopter.address} wide />
          </Grid>
        </Section>

        {/* FAMILY & FINANCIAL */}
        <Section title="Family & Financial Information" bg="bg-[#f2e8cf]">
          <Grid>
            <Info label="Marital Status" value={adopter.maritalStatus} />
            <Info
              label="Biological Children"
              value={adopter.numberOfBiologicalChildren}
            />
            <Info label="Occupation" value={adopter.occupation} />
            <Info label="Salary (₹)" value={adopter.salaryPerAnnum} />
          </Grid>
        </Section>

        {/* MEDICAL */}
        <Section title="Medical Information" bg="bg-[#dbeaf3]">
          <Info
            label="Health Status"
            value={
              adopter.healthStatus?.length
                ? adopter.healthStatus.join(", ")
                : "Healthy"
            }
          />

          {/* Medical Certificate */}
          {adopter.medicalCertificates ? (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-1">
                Medical Certificate
              </p>
              <img
                src={adopter.medicalCertificates}
                alt="Medical Certificate"
                className="border rounded-md max-h-80"
              />
            </div>
          ) : (
            <p className="mt-3 text-sm italic text-gray-500">
              No medical certificate uploaded
            </p>
          )}
        </Section>


        {/* DOCUMENTS */}
        <Section title="Identity Verification" bg="bg-[#f2f7f4]">
          <button
            onClick={fetchAadhaar}
            className="text-teal-700 underline font-semibold"
          >
            View Aadhaar Details
          </button>
        </Section>

        {/* ACTION BAR */}
        <div className="mt-10 flex items-center justify-between gap-6">

          {/* APPROVE - LEFT */}
          <button
            onClick={handleApprove}
            disabled={actionLoading}
            className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700"
          >
            Approve
          </button>

          {/* REJECT - RIGHT */}
          <div className="flex gap-3 items-center">
            <input
              type="text"
              placeholder="Rejection reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="border px-3 py-2 rounded-lg w-64"
            />
            <button
              onClick={handleReject}
              disabled={actionLoading}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
            >
              Reject
            </button>
          </div>
        </div>
      </div>

      {/* AADHAAR MODAL */}
      {showAadhaar && aadhaarData && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-12 rounded-md w-96 shadow-lg">
            <h3 className="text-lg font-bold mb-3">Aadhaar Details</h3>

            <p className="mb-2">
              <span className="font-semibold">Aadhaar Number:</span>{" "}
              {aadhaarData.aadharNumber}
            </p>

            <img
              src={aadhaarData.aadharImage}
              alt="Aadhaar"
              className="border rounded mb-4"
            />

            <button
              onClick={() => setShowAadhaar(false)}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Adopter_Approval_details;

/* ---------------- HELPERS ---------------- */

const Section = ({ title, children, bg }) => (
  <div className={`border rounded-md p-4 my-4 ${bg}`}>
    <h3 className="text-lg underline font-semibold mb-3">{title}</h3>
    {children}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-2 gap-4">{children}</div>
);

const Info = ({ label, value, wide }) => (
  <div className={wide ? "col-span-2" : ""}>
    <p className="text-sm text-gray-600">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);
