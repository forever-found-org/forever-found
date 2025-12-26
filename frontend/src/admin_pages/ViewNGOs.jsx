import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Users, Search } from "lucide-react";

function ViewNGOs() {
  const navigate = useNavigate();

  const [ngos, setNgos] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL"); // ALL | APPROVED | BLOCKED
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNGOs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/ngos");
        if (!res.ok) throw new Error();

        const data = await res.json();
        setNgos(data.ngos);
      } catch {
        setError("Unable to load NGOs");
      } finally {
        setLoading(false);
      }
    };

    fetchNGOs();
  }, []);

  // 🔍 Search + Filter Logic
  const filteredNGOs = ngos.filter((ngo) => {
    const matchesSearch = ngo.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "ALL" ||
      (filter === "APPROVED" && ngo.verified) ||
      (filter === "BLOCKED" && ngo.canEdit === false);

    return matchesSearch && matchesFilter;
  });

  // 📊 Stats
  const totalApproved = ngos.filter((n) => n.verified).length;
  const totalBlocked = ngos.filter((n) => n.canEdit === false).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600 font-serif">
        Loading NGOs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-serif">
        {error}
      </div>
    );
  }

  const handleHome=()=>{
    navigate("/admin/home");
    window.scrollTo(0,0);
  }

  return (
    <div className="min-h-screen p-4 bg-[#f1f5f9] font-serif">

      {/* Header */}
      <div className="relative flex items-center align-middle justify-center bg-white border-b border-slate-200 py-6 shadow-sm">
        <div>
            <h1 className="text-3xl font-bold text-center text-slate-800">
            Registered NGOs
            </h1>
            <p className="text-center text-slate-500 text-sm">
              Search, filter and manage NGOs
            </p>
        </div>
        <div className="absolute right-6 top-6">
            <button onClick={handleHome} className="border rounded-md bg-gray-100 border-slate-200 p-2 shadow-sm hover:bg-gray-200 hover:shadow-xl">Home</button>
        </div>
      </div>

      {/* Stats + Search + Filter Row */}
<div className="flex flex-wrap items-center justify-between gap-4 mb-8">

  {/* Left: Stats */}
  <div className="flex flex-wrap gap-4 mt-2">
    <StatCard
      label="Approved"
      value={totalApproved}
      color="text-green-600"
    />
    <StatCard
      label="Blocked"
      value={totalBlocked}
      color="text-red-600"
    />
  </div>

  {/* Right: Search + Filter */}
  <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">

    {/* Search */}
    <div className="relative w-full md:w-64">
      <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
      <input
        type="text"
        placeholder="Search NGO..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg
                   focus:ring-2 focus:ring-teal-500 focus:outline-none"
      />
    </div>

    {/* Filter */}
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="w-full md:w-44 py-2 px-3 border border-slate-300 rounded-lg
                 focus:ring-2 focus:ring-teal-500"
    >
      <option value="ALL">All NGOs</option>
      <option value="APPROVED">Approved</option>
      <option value="BLOCKED">Blocked</option>
    </select>

  </div>
  </div>



        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-100 text-slate-600 text-sm">
              <tr>
                <th className="text-left px-6 py-4">NGO Name</th>
                <th className="text-left px-6 py-4">City</th>
                <th className="text-left px-6 py-4">Children</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-left px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredNGOs.map((ngo) => (
                <tr key={ngo._id} className="border-t hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">{ngo.name}</td>
                  <td className="px-6 py-4">{ngo.city}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <Users className="w-4 h-4 text-teal-600" />
                    {ngo.numberOfChildren}
                  </td>
                  <td className="px-6 py-4">
                    {ngo.canEdit === false ? (
                      <span className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-700">
                        Blocked
                      </span>
                    ) : (
                      <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
                        Approved
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/admin/ngos/${ngo._id}`)}
                      className="text-teal-600 font-semibold hover:underline"
                    >
                      View →
                    </button>
                  </td>
                </tr>
              ))}

              {filteredNGOs.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-slate-500">
                    No NGOs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    
  );
}

export default ViewNGOs;

// 🔹 Reusable Stat Card
function StatCard({ label, value, color }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg px-5 py-3 shadow-sm min-w-[130px]">
      <p className="text-xs text-slate-500 uppercase tracking-wide">
        {label}
      </p>
      <p className={`text-2xl font-bold ${color}`}>
        {value}
      </p>
    </div>
  );
}

