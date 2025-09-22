import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewChildren() {
    const navigate = useNavigate();
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const ngoData = JSON.parse(localStorage.getItem("ngo"));

        const res = await fetch(`/api/children/ngo/${ngoData.id}`);
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

  if (children.length === 0) 
    return <p>No children registered yet.</p>;

  
  const ngoData = JSON.parse(localStorage.getItem("ngo")) || {};
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/ngo-home/${ngoData.id}`);
  };

return (
    <div className="max-w-full font-serif p-6 bg-gradient-to-br from-yellow-50 via-orange-100 to-red-50 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-orange-700 mb-4 text-center ">REGISTERED CHILDREN</h2>
            <button onClick={handleClick}  className="bg-amber-600 border border-amber-600 rounded-md p-2 mb-6 font-semibold hover:bg-amber-700 hover:shadow-lg hover:scale-105">Home</button>
        </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-xl shadow-md">
          <thead>
            <tr className="bg-orange-100">
              <th className="py-2 px-4 border">Child ID</th>
              <th className="py-2 px-4 border">NGO ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Age</th>
              <th className="py-2 px-4 border">Gender</th>
              <th className="py-2 px-4 border">Date of Birth</th>
              <th className="py-2 px-4 border">Health Status</th>
              <th className="py-2 px-4 border">Education Level</th>
              <th className="py-2 px-4 border">Adoption Status</th>
            </tr>
          </thead>
          <tbody>
            {children.map((child) => (
              <tr key={child._id} className="text-center hover:bg-orange-50 transition-colors">
                <td className="py-2 px-4 border">{child._id}</td>
                <td className="py-2 px-4 border">{child.ngoId}</td>
                <td className="py-2 px-4 border">{child.name}</td>
                <td className="py-2 px-4 border">{child.age}</td>
                <td className="py-2 px-4 border">{child.gender}</td>
                <td className="py-2 px-4 border">{child.dateOfBirth ? new Date(child.dateOfBirth).toLocaleDateString() : "N/A"}</td>
                <td className="py-2 px-4 border">{child.healthStatus || "N/A"}</td>
                <td className="py-2 px-4 border">{child.educationLevel || "N/A"}</td>
                <td className="py-2 px-4 border">{child.adoptionStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default ViewChildren;
