import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserCircle } from "lucide-react";

function AH_Navbar({ onLogoutClick }) {
  const navigate = useNavigate();
  const [adopter, setAdopter] = useState(null);

  useEffect(() => {
    const savedAdopter = localStorage.getItem("adopter");
    if (savedAdopter) {
      setAdopter(JSON.parse(savedAdopter));
    }
  }, []);

  const toHome = () => {
  if (adopter) {
    navigate(`/adopter-home/${adopter.id}`);
  } else {
    navigate("/adopter-home");
  }
  window.scrollTo(0, 0);
};
    const goToProfile=()=>{
      if (adopter){
        navigate(`/adopter-home/${adopter.id}/profile`);}
      else{
        navigate("/adopter-home/profile");
      }
    }

  return (
    <div
      className="h-20 p-2 pr-20 flex justify-between sticky top-0 z-50"
      style={{ backgroundColor: "#006D77" }}
    >
      <div className="h-auto w-[6%]">
        <img src={logo} alt="logo" />
      </div>
      <button
        className="h-10 mt-3 font-serif border border-white p-2 rounded-md text-white hover:bg-white hover:text-black hover:font-bold capitalize"
        onClick={toHome}
      >
        Home
      </button>
      <button onClick={()=>{navigate(`/adopter/${adopter.id}/meetings`)}}className="h-10 mt-3 font-serif border border-white p-2 rounded-md text-white hover:border-2 capitalize hover:bg-white hover:text-black hover:font-bold">
        Meetings History
      </button>
      <button className="h-10 mt-3 font-serif border border-white p-2 rounded-md text-white hover:border-2 capitalize hover:bg-white hover:text-black hover:font-bold">
        Adoption History
      </button>
      <button
        className="h-10 mt-3 font-serif border border-white p-2 rounded-md text-white hover:border-2 capitalize hover:bg-white hover:text-black hover:font-bold"
        onClick={() => {
            if(adopter){
                navigate(`/adopter-home/${adopter.id}/parenting-guide`);
            }else{
                navigate("/adopter-home/parenting-guide");
            }
        }}
      >
        Parenting Guide
      </button>
      <button
        className="h-10 mt-3 font-serif border border-white p-2 rounded-md text-white hover:border-2 capitalize hover:bg-white hover:text-black hover:font-bold"
        onClick={onLogoutClick}
      >
        Logout
      </button>

      {/* Display adopter name/email if logged in */}
        

{adopter ? (
  <div onClick={goToProfile} className="mt-2 h-12 flex items-center gap-2 px-3 border rounded-md bg-white text-black font-serif hover:cursor-pointer hover:scale-105">
    {/* Icon on the left */}
    <UserCircle className="w-6 h-6 text-indigo-600" />

    {/* Name stacked vertically */}
    <div className="flex flex-col leading-tight">
      <span className="text-sm font-semibold capitalize">{adopter.name.split(" ")[0]}</span>
      <span className="text-sm font-semibold capitalize">{adopter.name.split(" ").slice(1).join(" ")}</span>
    </div>
  </div>
) : (
  <button className="flex items-center gap-2 px-3 py-1 rounded-md border border-white text-sm text-white font-serif capitalize transition-all duration-200 hover:bg-white hover:text-black hover:shadow">
    <UserCircle className="w-5 h-5" />
    <span className="font-medium">Profile</span>
  </button>
)}

    </div>
  );
}

export default AH_Navbar;
