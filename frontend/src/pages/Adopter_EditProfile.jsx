import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditAdopterProfile() {
  const { id } = useParams(); // adopter id from URL
  const navigate = useNavigate();
  const [adopter, setAdopter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [existingCertificates, setExistingCertificates] = useState([]);
  const [newCertificates, setNewCertificates] = useState([]);


  const [formData, setFormData] = useState({
    occupation: "",
    salaryPerAnnum: "",
    contactNumber: "",
    alternateContactNumber: "",
    address: "",
    religion: "",
    gender: "",
    maritalStatus: "",
    numberOfBiologicalChildren: "",
    healthStatus: "",
  });
  

  useEffect(() => {
    async function fetchAdopter() {
      try {
        const res = await fetch(`http://localhost:5000/api/adopter/${id}`);
        if (!res.ok) throw new Error("Failed to fetch adopter details");
        const data = await res.json();
        setAdopter(data);
        setFormData({
          occupation: data.occupation || "",
          salaryPerAnnum: data.salaryPerAnnum || "",
          contactNumber: data.contactNumber || "",
          alternateContactNumber: data.alternateContactNumber || "",
          address: data.address || "",
          religion: data.religion || "",
          gender: data.gender || "",
          maritalStatus: data.maritalStatus || "",
          numberOfBiologicalChildren: data.numberOfBiologicalChildren || 0,
          healthStatus: data.healthStatus?.join(", ") || "",
        });
        setExistingCertificates(data.medicalCertificates || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAdopter();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCertificateUpload = (e) => {
  setNewCertificates(Array.from(e.target.files));
};


  const handleSave = async () => {
  setSaving(true);

  try {
    const formDataToSend = new FormData();

    // Append normal fields
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    // Append new certificates
    newCertificates.forEach((file) => {
      formDataToSend.append("medicalCertificates", file);
    });

    const res = await fetch(
      `http://localhost:5000/api/adopter/${id}`,
      {
        method: "PUT",
        body: formDataToSend,
      }
    );

    if (!res.ok) throw new Error("Failed to update profile");

    navigate(`/adopter-home/${id}`);
  } catch (err) {
    setError(err.message);
  } finally {
    setSaving(false);
  }
};



  if (loading)
    return <p className="text-center mt-20 text-xl font-serif font-semibold text-gray-700">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-20 text-xl font-serif font-semibold text-red-500">{error}</p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 py-10 px-4 font-serif">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl p-10">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">Edit Profile</h2>

        {/* Read-only fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <p>
            <span className="font-semibold text-blue-700">Full Name:</span> {adopter.fullName}
          </p>
          <p>
            <span className="font-semibold text-blue-700">Email:</span> {adopter.email}
          </p>
          <p>
            <span className="font-semibold text-blue-700">DOB:</span> {adopter.dateOfBirth}
          </p>
          <p>
            <span className="font-semibold text-blue-700">Aadhaar:</span> {adopter.aadharNumber}
          </p>
        </div>

        {/* Editable fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 text-lg md:text-xl">
          <div>
            <label className="font-semibold text-blue-700">Occupation:</label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="font-semibold text-blue-700">Salary (₹):</label>
            <input
              type="number"
              name="salaryPerAnnum"
              value={formData.salaryPerAnnum}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="font-semibold text-blue-700">Contact Number:</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="font-semibold text-blue-700">Alternate Contact:</label>
            <input
              type="text"
              name="alternateContactNumber"
              value={formData.alternateContactNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="font-semibold text-blue-700">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="font-semibold text-blue-700">Religion:</label>
            <input
              type="text"
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="font-semibold text-blue-700">Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="font-semibold text-blue-700">Marital Status:</label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            >
              <option value="">Select</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>
          <div>
            <label className="font-semibold text-blue-700">Number of Biological Children:</label>
            <input
              type="number"
              name="numberOfBiologicalChildren"
              value={formData.numberOfBiologicalChildren}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              min={0}
            />
          </div>
          <div>
            <label className="font-semibold text-blue-700">
              Health Status:
            </label>
            <input
              type="text"
              name="healthStatus"
              value={formData.healthStatus}
              onChange={handleChange}
              placeholder="e.g. No chronic illness, Asthma"
              className="w-full border p-2 rounded mt-1"
            />
            <p className="text-sm text-gray-500 mt-1 ml-1">
              Enter multiple conditions separated by commas.
            </p>
          </div>

          {/* Existing Certificates */}
<div className="md:col-span-2">
  <label className="font-semibold text-blue-700">
    Existing Medical Certificates:
  </label>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
    {existingCertificates.map((cert, index) => (
      <img
        key={index}
        src={cert}
        alt="Medical Certificate"
        className="rounded-lg shadow border"
      />
    ))}
  </div>
</div>

{/* Upload New Certificates */}
<div className="md:col-span-2 mt-6">
  <label className="font-semibold text-blue-700">
    Upload Additional Certificate:
  </label>
  <input
    type="file"
    multiple
    accept="image/*"
    onChange={handleCertificateUpload}
    className="w-full border p-2 rounded mt-1"
  />
</div>


        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-10">
          <button
            onClick={() => navigate(`/adopter-home/${id}/profile`)}
            className="px-8 py-3 bg-green-600 text-white font-bold text-lg rounded-lg hover:bg-green-700 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
