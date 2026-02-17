import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Adopter_History() {
  const { adopterId } = useParams();
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAdoptions() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/adopter/${adopterId}/adoption-history`
        );

        if (!res.ok) throw new Error("Failed to fetch adoption history");

        const data = await res.json();
        setAdoptions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAdoptions();
  }, [adopterId]);

  if (loading)
    return (
      <p className="text-center mt-10 text-lg text-gray-600">
        Loading adoption history...
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-lg text-red-500">{error}</p>
    );

  if (adoptions.length === 0)
    return (
      <p className="text-center mt-10 text-lg text-gray-700">
        No adopted children found.
      </p>
    );

  return (
    <div className="w-screen p-6 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen font-serif">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-green-900 ml-6">
          Adopted Children
        </h2>

        <button
          onClick={() => navigate(`/adopter-home/${adopterId}`)}
          className="px-3 py-2 mr-3 mb-2 bg-amber-700 text-white font-semibold rounded-2xl shadow-md hover:bg-amber-800 hover:shadow-lg hover:scale-105"
        >
          Home
        </button>
      </div>

      <div className="space-y-3 w-full mx-auto">
        {adoptions.map((child) => (
          <div
            key={child._id}
            onClick={() =>navigate(`/adopter/${adopterId}/adoption-history/${child._id}`)}
            className="bg-white rounded-2xl p-4 border border-green-200 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-green-900">
                {child.name}
              </h3>

              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-200 text-green-800 shadow-sm">
                Adopted
              </span>
            </div>

            <div className="mt-2 space-y-1 text-gray-700">
              <p>
                <span className="font-semibold text-green-700">Age:</span>{" "}
                {child.age}
              </p>

              <p>
                <span className="font-semibold text-green-700">Gender:</span>{" "}
                {child.gender}
              </p>

              <p>
                <span className="font-semibold text-green-700">NGO:</span>{" "}
                {child.ngoId?.name || "Not Available"}
              </p>

              <p>
                <span className="font-semibold text-green-700">
                  Adoption Date:
                </span>{" "}
                {new Date(child.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Adopter_History;
