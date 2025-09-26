import { useEffect, useState } from "react";

function Child_Details({ childId, onClose }) {
  const [child, setChild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!childId) return;

    const fetchChild = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/children/${childId}`);
        if (!res.ok) throw new Error("Failed to fetch child details");
        const data = await res.json();
        setChild(data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Could not fetch child details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchChild();
  }, [childId]);

  if (!childId) return null;

  return (
    <div className="fixed inset-0 z-50 font-serif flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="relative bg-violet-50 rounded-2xl shadow-lg max-w-md w-full p-6 z-10 border border-purple-100">
        {loading ? (
          <p className="text-center text-purple-700">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="flex flex-col gap-3 text-gray-700">
            {/* Child Name */}
            <h2 className="text-3xl font-bold text-purple-900 text-center">
              {child.name}
            </h2>

            {/* Details */}
            <div className="space-y-2 text-base">
              <p><strong>Age:</strong> {child.age}</p>
              <p><strong>Gender:</strong> {child.gender}</p>
              <p><strong>Date of Birth:</strong> {new Date(child.dateOfBirth).toLocaleDateString()}</p>
              <p><strong>Health Status:</strong> {child.healthStatus}</p>
              <p><strong>Education Level:</strong> {child.educationLevel}</p>
              <p><strong>Status:</strong> {child.adoptionStatus}</p>
            </div>

            {/* Verification Badge */}
            {child.gallery && child.gallery.length > 0 ? (
              <div className="mt-2 bg-green-50 border border-green-200 text-green-700 rounded-lg px-3 py-1 text-sm text-center">
                ✅ This child is verified for adoption
              </div>
            ) : (
              <div className="mt-2 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg px-3 py-1 text-sm text-center">
                ⚠️ This child is not yet verified for adoption
              </div>
            )}
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-5 w-full py-2 bg-purple-300 hover:bg-purple-400 text-purple-900 rounded-lg font-medium transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Child_Details;
