import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";

function NGO_Approval() {
  const navigate = useNavigate();

  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPendingNGOs();
  }, []);

  const fetchPendingNGOs = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/admin/pending-ngos"
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch");
      }

      setNgos(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load NGO requests");
    } finally {
      setLoading(false);
    }
  };

  const handleHome = () => {
    navigate("/admin/home");
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-serif text-slate-600">
        Loading NGO requests...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-serif">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-6 shadow-sm relative">
        <div>
          <h1 className="text-3xl font-bold text-center text-slate-800">
            NGO Approval
          </h1>
          <p className="text-center text-slate-500 text-sm">
            Review pending NGO registration requests
          </p>
        </div>

        <div className="absolute right-6 top-6">
          <button
            onClick={handleHome}
            className="border rounded-md bg-gray-100 border-slate-200 px-4 py-2 shadow-sm hover:bg-gray-200 hover:shadow-md"
          >
            Home
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="mb-8">
          <PendingStatCard value={ngos.length} />
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-100 text-slate-600 text-sm">
              <tr>
                <th className="text-left px-6 py-4">NGO Name</th>
                <th className="text-left px-6 py-4">City</th>
                <th className="text-left px-6 py-4">Contact</th>
                <th className="text-left px-6 py-4">Children</th>
                <th className="text-left px-6 py-4">Requested On</th>
                <th className="text-left px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {ngos.map((ngo) => (
                <tr
                  key={ngo._id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {ngo.name}
                  </td>
                  <td className="px-6 py-4">{ngo.city}</td>
                  <td className="px-6 py-4">{ngo.contact}</td>
                  <td className="px-6 py-4">{ngo.numberOfChildren}</td>
                  <td className="px-6 py-4">
                    {new Date(ngo.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        navigate(`/admin/ngo-approval/${ngo._id}`)
                      }
                      className="text-teal-600 font-semibold hover:underline"
                    >
                      View →
                    </button>
                  </td>
                </tr>
              ))}

              {ngos.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-500">
                    No pending NGO requests
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default NGO_Approval;

/* 🔹 Pending Requests Stat Card */
function PendingStatCard({ value }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg px-6 py-4 shadow-sm flex items-center gap-4 w-fit">
      <Building2 className="text-yellow-600 w-6 h-6" />
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-wide">
          Pending Requests
        </p>
        <p className="text-2xl font-bold text-yellow-600">{value}</p>
      </div>
    </div>
  );
}
