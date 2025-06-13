import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
function Ngo_Nav({onLogoutClick})
{
    const navigate=useNavigate();
    const handleHome=()=>{
        navigate("/ngo-home");
    }
    return(
        <div className="h-24 p-2 pr-20 flex items-center relative bg-[#006D77]">
            <div className="h-auto w-[6%] ml-4">
                <img src={logo} alt="logo" />
            </div>
            <div className="ml-6">
                <h1 className="text-white font-serif font-semibold text-4xl drop-shadow-md">NGO PORTAL</h1>
            </div>
            <div className="flex flex-wrap -mt-3 absolute right-8 space-x-12 ">
                <button onClick={handleHome} className="h-10 mt-3 font-serif border border-white p-2 rounded-md text-white  hover:bg-white hover:text-black hover:font-bold capitalize" >home</button>
                <button onClick={onLogoutClick} className="h-10 mt-3 font-serif border border-white p-2 rounded-md text-white hover:border-2 capitalize hover:bg-white hover:text-black hover:font-bold">logout</button>
                <button className="h-10 mt-3 font-serif border border-white p-2 rounded-md text-white  hover:border-2 capitalize hover:bg-white hover:text-black hover:font-bold">Profile</button>
            </div>
            
        </div>
    );
}
export default Ngo_Nav