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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 z-10 transform transition-transform duration-200 scale-100">
        {loading ? (
          <p className="text-center font-serif">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center font-serif">{error}</p>
        ) : (
          <div className="flex flex-col gap-2 font-serif">
            <h2 className="text-2xl font-bold">{child.name}</h2>
            <p><strong>Age:</strong> {child.age}</p>
            <p><strong>Gender:</strong> {child.gender}</p>
            <p><strong>Date of Birth:</strong> {new Date(child.dateOfBirth).toLocaleDateString()}</p>
            <p><strong>Health Status:</strong> {child.healthStatus}</p>
            <p><strong>Education Level:</strong> {child.educationLevel}</p>
            <p><strong>Religion:</strong> {child.religion}</p>
            <p><strong>Status:</strong> {child.adoptionStatus}</p>
            {child.gallery && child.gallery.length > 0 ? (
  <p className="text-red-600 italic">
    *This child is verified for adoption (has a CWC certificate)
  </p>
) : (
  <p className="text-red-600 ">
    *This child is not yet verified for adoption
  </p>
)}
            
          </div>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Child_Details;
