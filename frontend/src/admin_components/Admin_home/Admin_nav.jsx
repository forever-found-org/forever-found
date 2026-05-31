import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";
import {useState} from "react";
import logo from "../../images/logo.png";

function Admin_Nav() {
  const [showModal,setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem("adminToken");
    navigate("/admin/login",{replace:true});
  }


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
          
          onClick={()=>setShowModal(true)}
          className="h-10 font-serif border border-white p-2 rounded-md text-white hover:bg-white hover:text-black hover:font-bold capitalize"
        >
          logout
        </button>

        <div
          onClick={() => navigate("/admin/profile")}
          className="h-12 flex items-center gap-2 px-3 border rounded-md bg-white text-black font-serif cursor-pointer hover:bg-gray-100"
        >
          <UserCircle className="w-6 h-6 text-indigo-600" />
          <span className="text-sm font-semibold capitalize">Admin</span>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4 shadow-xl">
            <h2 className="text-xl font-serif font-semibold text-gray-800">
              Are you sure you want to logout?
            </h2>
            <div className="flex gap-4">
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-[#006D77] text-white rounded-md font-serif hover:bg-[#005a63]"
              >
                Yes
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 border border-[#006D77] text-[#006D77] rounded-md font-serif hover:bg-gray-100"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin_Nav;
