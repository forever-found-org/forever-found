import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Adoption_History_Details() {
  const { adopterId, childId } = useParams();
  const navigate = useNavigate();
  const [child, setChild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/adopter/${adopterId}/adoption-history/${childId}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch details");
        return res.json();
      })
      .then((data) => {
        setChild(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [adopterId, childId]);

  if (loading)
    return (
      <p className="text-center mt-10 text-lg text-gray-600">
        Loading details...
      </p>
    );

  if (!child)
    return (
      <p className="text-center mt-10 text-red-500">
        No adoption record found.
      </p>
    );

  // Filter NGO gallery images (only public ones)
  const ngoGallery =
    child.ngoId?.gallery?.filter((img) => img.type === "gallery") || [];

  const FormField = ({ label, value }) => (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <div className="border rounded-lg px-3 py-2 bg-gray-50 text-gray-800">
        {value || "N/A"}
      </div>
    </div>
  );

  return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6 font-serif">

            {/* ===== Header Section ===== */}
            <div className="flex items-center justify-between mb-8">
            <div className="w-32"></div>
            <h1 className="text-3xl font-bold text-green-900 text-center">
                Adoption Details
            </h1>
            <button
                onClick={() => navigate(`/adopter/${adopterId}/adoption-history`)}
                className="px-5 py-2 mr-4 bg-amber-700 text-white rounded-xl shadow hover:bg-amber-800 transition"
            >
                ← Back
            </button>
            </div>

            {/* ================= CHILD DETAILS ================= */}
            <div className="bg-white shadow-xl rounded-2xl p-8 mb-10">
            <h2 className="text-2xl font-bold text-green-900 border-b pb-3 mb-6">
                Child Adoption Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
                <FormField label="Full Name" value={child.name} />
                <FormField label="Age" value={child.age} />
                <FormField label="Gender" value={child.gender} />
                <FormField
                label="Date of Birth"
                value={
                    child.dateOfBirth
                    ? new Date(child.dateOfBirth).toLocaleDateString()
                    : "Not Available"
                }
                />
                <FormField label="Health Status" value={child.healthStatus} />
                <FormField label="Education Level" value={child.educationLevel} />
                <FormField
                label="Adopted On"
                value={
                    child.updatedAt
                    ? new Date(child.updatedAt).toLocaleDateString()
                    : "N/A"
                }
                />
            </div>
            </div>

            {/* ================= NGO DETAILS ================= */}
            <div className="bg-white shadow-xl rounded-2xl p-8 mb-10">
            <h2 className="text-2xl font-bold text-green-900 border-b pb-3 mb-6">
                NGO Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <FormField label="Name" value={child.ngoId?.name} />
                <FormField label="Location" value={child.ngoId?.location} />
                <FormField label="City" value={child.ngoId?.city} />
                <FormField label="State" value={child.ngoId?.state} />
                <FormField
                label="Website"
                value={
                    child.ngoId?.website ? (
                    <a
                        href={child.ngoId.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                    >
                        {child.ngoId.website}
                    </a>
                    ) : (
                    "N/A"
                    )
                }
                />
                <FormField label="Contact" value={child.ngoId?.contact} />
                <FormField label="Email" value={child.ngoId?.email} />
            </div>
            </div>

        </div>
        );
    }
export default Adoption_History_Details;