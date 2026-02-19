import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AdopterProfile() {
  const { id } = useParams(); // adopter id from URL
  const navigate = useNavigate();
  const [adopter, setAdopter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAdopter() {
      try {
        const res = await fetch(`http://localhost:5000/api/adopter/${id}`);
        if (!res.ok) throw new Error("Failed to fetch adopter details");
        const data = await res.json();
        setAdopter(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAdopter();
  }, [id]);

  if (loading)
    return <p className="text-center mt-20 text-xl font-serif font-semibold text-gray-700">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-20 text-xl font-serif font-semibold text-red-500">
        {error}
      </p>
    );
  if (!adopter)
    return (
      <p className="text-center mt-20 text-xl font-serif font-semibold text-gray-700">
        No adopter data available.
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 py-10 px-4 font-serif">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8 border-b pb-8 mb-8">
          <div className="w-36 h-36 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-5xl font-bold">
            {adopter.fullName.charAt(0).toUpperCase()}
          </div>
          <div className="mt-4 md:mt-0">
            <h2 className="text-3xl md:text-4xl font-bold capitalize text-blue-900">{adopter.fullName}</h2>
            <p className="text-lg md:text-xl text-gray-600 mt-2">{adopter.email}</p>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 text-gray-800 text-lg md:text-xl">
          <p><span className="font-semibold text-blue-700">DOB:</span> {adopter.dateOfBirth || "-"}</p>
          <p><span className="font-semibold text-blue-700">Occupation:</span> {adopter.occupation}</p>
          <p><span className="font-semibold text-blue-700">Salary:</span> ₹{adopter.salaryPerAnnum}</p>
          <p><span className="font-semibold text-blue-700">Contact Number:</span> {adopter.contactNumber}</p>
          <p><span className="font-semibold text-blue-700">Alternate Contact:</span> {adopter.alternateContactNumber || "-"}</p>
          <p><span className="font-semibold text-blue-700">Address:</span> {adopter.address}</p>
          <p><span className="font-semibold text-blue-700">Aadhaar:</span> {adopter.aadharNumber}</p>
          <p><span className="font-semibold text-blue-700">Religion:</span> {adopter.religion}</p>
          <p><span className="font-semibold text-blue-700">Gender:</span> {adopter.gender}</p>
          <p><span className="font-semibold text-blue-700">Marital Status:</span> {adopter.maritalStatus}</p>
          <p><span className="font-semibold text-blue-700">Biological Children:</span> {adopter.numberOfBiologicalChildren}</p>
          <p>
            <span className="font-semibold text-blue-700">Health status:</span>{" "}
            {adopter.healthStatus?.length ? adopter.healthStatus.join(", ") : "-"}
          </p>
        </div>
        
        {/* Medical Certificates */}
        <div className="mt-6">
          <p>
            <span className="text-lg md:text-xl font-semibold text-blue-700">
              Medical Certificates:
            </span>
          </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {adopter.medicalCertificates?.map((cert, index) => (
              <img
                key={index}
                src={cert}
                alt={`Medical Certificate ${index + 1}`}
                className="border rounded-lg shadow w-full max-h-80 object-contain"
              />
            ))}
          </div>
        </div>

        {/* Back n Edit button */}
        <div className="flex items-center justify-between">
            <div className="mt-10 text-center">
          <button
            onClick={() => navigate(`/adopter-home/${id}`) }
            className="px-8 py-3 bg-green-600 text-white font-bold text-lg rounded-lg hover:bg-green-700 transition-colors"
          >
            Back To Home
          </button>
        </div>
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate(`/adopter-home/${id}/profile/edit`)}
            className="px-8 py-3 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Profile
          </button>
        </div>
        </div>
        
      </div>
    </div>
  );
}
