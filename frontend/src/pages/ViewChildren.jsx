import { useEffect, useState } from "react";
import UpdateChildren from "./UpdateChildren";
import { useNavigate } from "react-router-dom";

function ViewChildren() {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingChild, setEditingChild] = useState(null);

  const navigate=useNavigate();
  // Fetch children on mount
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const ngoData = JSON.parse(localStorage.getItem("ngo"));
        const ngoId = ngoData?._id || ngoData?.id;
        const res = await fetch(`/api/children/ngo/${ngoId}`);

        if (!res.ok) throw new Error("Failed to fetch children");
        const data = await res.json();
        setChildren(data);
      } catch (err) {
        console.error(err);
        alert("Error fetching children");
      } finally {
        setLoading(false);
      }
    };
    fetchChildren();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (children.length === 0) return <p>No children registered yet.</p>;

  // Update child in state after successful edit
  const handleUpdate = (updatedChild) => {
    setChildren((prev) =>
      prev.map((c) => (c._id === updatedChild._id ? updatedChild : c))
    );
    setEditingChild(null); // close modal
  };

  const ngoData = JSON.parse(localStorage.getItem("ngo")) || {};
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/ngo-home/${ngoData.id}`);
  };

  return (
    <div className="max-w-full font-serif p-9 bg-gradient-to-br from-yellow-50 via-orange-100 to-red-50 rounded-2xl shadow-lg relative max-h-screen overflow-y-auto">
      <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-orange-700 mb-6 ml-4 text-center uppercase">
        REGISTERED CHILDREN
      </h2>
      <button onClick={handleClick} className="bg-amber-600 border border-amber-600 rounded-md p-2 mb-6 font-semibold hover:bg-amber-700 hover:shadow-lg hover:scale-105">Home</button>
      </div>


      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-xl shadow-md">
          <thead>
            <tr className="bg-orange-100">
              <th className="py-2 px-4 border">Child ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Age</th>
              <th className="py-2 px-4 border">Gender</th>
              <th className="py-2 px-4 border">Date of Birth</th>
              <th className="py-2 px-4 border">Health Status</th>
              <th className="py-2 px-4 border">Education Level</th>
              <th className="py-2 px-4 border">Adoption Status</th>
              <th className="py-2 px-4 border">Update</th>
            </tr>
          </thead>

          <tbody>
            {children.map((child) => (
              <tr
                key={child._id}
                className="text-center hover:bg-orange-50 transition-colors"
              >
                <td className="py-2 px-4 border">{child._id}</td>
                <td className="py-2 px-4 border">{child.name}</td>
                <td className="py-2 px-4 border">{child.age}</td>
                <td className="py-2 px-4 border">{child.gender}</td>
                <td className="py-2 px-4 border">
                  {child.dateOfBirth
                    ? new Date(child.dateOfBirth).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="py-2 px-4 border">{child.healthStatus || "N/A"}</td>
                <td className="py-2 px-4 border">{child.educationLevel || "N/A"}</td>
                <td className="py-2 px-4 border">{child.adoptionStatus}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => setEditingChild(child)}
                    className="text-white bg-blue-600 border rounded-xl px-4 py-1 hover:bg-blue-800 hover:scale-105 transition"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingChild && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 p-4">
          <div className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <UpdateChildren
              child={editingChild}
              onClose={() => setEditingChild(null)}
              onUpdate={handleUpdate}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewChildren;
