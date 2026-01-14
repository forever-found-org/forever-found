import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";
import logo from "../../images/logo.png";

function Admin_Nav({ onLogoutClick }) {
  const navigate = useNavigate();


  return (
    <div className="h-24 p-2 pr-20 flex items-center justify-between bg-[#006D77]">
      <div className="h-auto w-[6%] ml-4">
        <img src={logo} alt="logo" />
      </div>

      <h1 className="text-white font-serif font-semibold text-4xl drop-shadow-md">
        ADMIN PORTAL
      </h1>

      <div className="flex items-center gap-6">

        <button
          onClick={onLogoutClick}
          className="h-10 font-serif border border-white p-2 rounded-md text-white hover:bg-white hover:text-black hover:font-bold capitalize"
        >
          logout
        </button>

        <div className="h-12 flex items-center gap-2 px-3 border rounded-md bg-white text-black font-serif">
          <UserCircle className="w-6 h-6 text-indigo-600" />
          <span className="text-sm font-semibold capitalize">Admin</span>
        </div>
      </div>
    </div>
  );
}

export default Admin_Nav;
