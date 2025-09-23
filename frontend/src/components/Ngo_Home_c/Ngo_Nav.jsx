import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserCircle } from "lucide-react";
import logo from "../../images/logo.png";

function Ngo_Nav({ onLogoutClick }) {
  const navigate = useNavigate();
  const [ngo, setNgo] = useState(null);

  useEffect(() => {
    const savedNgo = localStorage.getItem("ngo");
    if (savedNgo) {
      setNgo(JSON.parse(savedNgo));
    }
  }, []);

  const handleHome = () => {
    if (ngo) {
      navigate(`/ngo-home/${ngo.id}`);
    } else {
      navigate("/ngo-home");
    }
    window.scrollTo(0, 0);
  };

  const goToProfile = () => {
    if (ngo) {
      navigate(`/ngo-home/${ngo.id}/profile`);
    } else {
      navigate("/ngo-home/profile");
    }
  };
  return (
    <div className="h-24 p-2 pr-20 flex items-center justify-between relative bg-[#006D77]">
      <div className="h-auto w-[6%] ml-4">
        <img src={logo} alt="logo" />
      </div>

      <h1 className="text-white font-serif font-semibold text-4xl drop-shadow-md">
        NGO PORTAL
      </h1>

      <div className="flex items-center gap-6">
        <button
          onClick={handleHome}
          className="h-10 font-serif border border-white p-2 rounded-md text-white hover:bg-white hover:text-black hover:font-bold capitalize"
        >
          home
        </button>
        <button
          onClick={onLogoutClick}
          className="h-10 font-serif border border-white p-2 rounded-md text-white hover:border-2 capitalize hover:bg-white hover:text-black hover:font-bold"
        >
          logout
        </button>

        {/* Profile Button (same design as adopter navbar) */}
        {ngo ? (
          <div
            onClick={goToProfile}
            className="h-12 flex items-center gap-2 px-3 border rounded-md bg-white text-black font-serif hover:cursor-pointer hover:scale-105 transition-all duration-200"
          >
            <UserCircle className="w-6 h-6 text-indigo-600" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold capitalize">
                {ngo.name.split(" ")[0]}
              </span>
              <span className="text-sm font-semibold capitalize">
                {ngo.name.split(" ").slice(1).join(" ")}
              </span>
            </div>
          </div>
        ) : (
          <button className="flex items-center gap-2 px-3 py-1 rounded-md border border-white text-sm text-white font-serif capitalize transition-all duration-200 hover:bg-white hover:text-black hover:shadow">
            <UserCircle className="w-5 h-5" />
            <span className="font-medium">Profile</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Ngo_Nav;
