import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Admin_Nav from "../admin_components/Admin_home/Admin_nav";

function Admin_Profile() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [changing, setChanging] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await fetch("http://localhost:5000/api/admin/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) {
          localStorage.removeItem("adminToken");
          navigate("/admin/login");
          return;
        }

        const data = await res.json();
        setAdmin(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChangePassword = async () => {
    setError("");
    setSuccess("");

    // Frontend validations
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required"); return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match"); return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters"); return;
    }

    try {
      setChanging(true);
      const token = localStorage.getItem("adminToken");
      const res = await fetch("http://localhost:5000/api/admin/change-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message); return;
      }

      setSuccess("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Close modal after 2 seconds
      setTimeout(() => {
        setShowModal(false);
        setSuccess("");
      }, 2000);

    } catch (err) {
      setError("Something went wrong");
    } finally {
      setChanging(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl font-serif text-[#006D77]">Loading...</p>
    </div>
  );

  return (
    <>
      <Admin_Nav />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-10 w-[40%] flex flex-col gap-6">

          {/* Avatar + Name */}
          <div className="flex flex-col items-center gap-2">
            <div className="h-20 w-20 rounded-full bg-[#006D77] flex items-center justify-center">
              <span className="text-white text-4xl font-serif font-bold">
                {admin.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <h1 className="text-2xl font-serif font-bold text-gray-800">
              {admin.name}
            </h1>
            <span className="text-sm bg-[#006D77] text-white px-3 py-1 rounded-full font-serif">
              {admin.role}
            </span>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500 font-serif">Email</span>
              <span className="font-serif font-semibold">{admin.email}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500 font-serif">Status</span>
              <span className={`font-serif font-semibold ${admin.status === "ACTIVE" ? "text-green-600" : "text-red-600"}`}>
                {admin.status}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500 font-serif">Account Created</span>
              <span className="font-serif font-semibold">
                {new Date(admin.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500 font-serif">Last Login</span>
              <span className="font-serif font-semibold">
                {admin.lastLogin ? new Date(admin.lastLogin).toLocaleString() : "N/A"}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 bg-[#006D77] text-white font-serif py-2 rounded-md hover:bg-[#005a63] transition"
            >
              Change Password
            </button>
            <button
              onClick={() => navigate("/admin/home")}
              className="flex-1 border border-[#006D77] text-[#006D77] font-serif py-2 rounded-md hover:bg-[#006D77] hover:text-white transition"
            >
              Back
            </button>
          </div>

        </div>
      </div>

      {/* Change Password Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-[35%] flex flex-col gap-4 shadow-xl">
            <h2 className="text-xl font-serif font-bold text-gray-800 text-center">
              Change Password
            </h2>

            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="border rounded-md p-2 font-serif focus:outline-none focus:border-[#006D77]"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border rounded-md p-2 font-serif focus:outline-none focus:border-[#006D77]"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border rounded-md p-2 font-serif focus:outline-none focus:border-[#006D77]"
            />

            {error && <p className="text-red-500 text-sm font-serif text-center">{error}</p>}
            {success && <p className="text-green-500 text-sm font-serif text-center">{success}</p>}

            <div className="flex gap-4 mt-2">
              <button
                onClick={handleChangePassword}
                disabled={changing}
                className="flex-1 bg-[#006D77] text-white font-serif py-2 rounded-md hover:bg-[#005a63] transition"
              >
                {changing ? "Changing..." : "Confirm"}
              </button>
              <button
                onClick={() => { setShowModal(false); setError(""); setSuccess(""); }}
                className="flex-1 border border-[#006D77] text-[#006D77] font-serif py-2 rounded-md hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Admin_Profile;