import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLoginValidator from "../admin_components/AdminLoginValidator";
import { FiEye, FiEyeOff } from "react-icons/fi";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ added
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = AdminLoginValidator({ email, password });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ server: data.error || "Login failed" });
        return;
      }

      localStorage.setItem("admin", JSON.stringify(data));
      navigate("/admin/dashboard");
    } catch {
      setErrors({ server: "Server error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-slate-900 to-black font-serif">
      <div className="w-full max-w-md bg-zinc-900/80 backdrop-blur-xl border border-zinc-700 rounded-xl p-10 shadow-2xl">
        
        <h2 className="text-3xl font-bold text-center text-cyan-400 tracking-wide">
          ADMIN CONSOLE
        </h2>
        <p className="text-center text-zinc-400 text-sm mt-1 mb-8">
          Secure system access
        </p>

        {errors.server && (
          <div className="bg-red-900/40 border border-red-700 text-red-300 p-2 rounded mb-4 text-sm text-center">
            {errors.server}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-xs text-zinc-400 mb-1 ml-1">
              EMAIL
            </label>
            <input
              type="email"
              placeholder="admin@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black text-zinc-200 border border-zinc-700 rounded-md px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
                         placeholder-zinc-600"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password with Eye Icon */}
          <div className="relative">
            <label className="block text-xs ml-1 text-zinc-400 mb-1">
              PASSWORD
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black text-zinc-200 border border-zinc-700 rounded-md px-3 py-2 pr-10
                         focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
                         placeholder-zinc-600"
            />

            {/* Eye Icon */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[34px] text-zinc-400 cursor-pointer
                         hover:text-cyan-400 transition"
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </span>

            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-cyan-600 hover:bg-cyan-500 text-black font-bold py-2
                       rounded-md transition-all duration-300 shadow-lg disabled:opacity-60"
          >
            {loading ? "AUTHENTICATING..." : "LOGIN"}
          </button>
        </form>

        <p className="text-center text-[11px] text-zinc-500 mt-8 tracking-widest">
          FOREVER-FOUND // ADMIN
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
