import logo from "../../images/logo.png"
import { useNavigate } from "react-router-dom";
function AH_Navbar(){
    const navigate=useNavigate();
    const handleLogout=()=>{
        navigate('/');
    }
    const toHome=()=>{
        navigate('/adopter-home');
    }
    return (
        <div className="h-20  p-2 pr-20 flex justify-between" style={{backgroundColor:'#006D77'}}>
            <div className="h-auto w-[6%]">
                <img className="" src={logo} alt="logo" />
            </div>
            <button className="h-10 mt-3 font-serif border border-white p-2 rounded-md text-white  hover:bg-white hover:text-black hover:font-bold capitalize" onClick={toHome} >home</button>
            <button className="h-10 mt-3 font-serif border border-white p-2 rounded-md text-white hover:border-2 capitalize hover:bg-white hover:text-black hover:font-bold" >request history</button>
            <button className="h-10 mt-3 font-serif border border-white p-2 rounded-md text-white hover:border-2 capitalize hover:bg-white hover:text-black hover:font-bold" >adoption history</button>
            <button className="h-10 mt-3 font-serif border border-white p-2 rounded-md text-white  hover:border-2 capitalize hover:bg-white hover:text-black hover:font-bold">parenting guide</button>
            <button className="h-10 mt-3 font-serif border border-white p-2 rounded-md text-white hover:border-2 capitalize hover:bg-white hover:text-black hover:font-bold" onClick={handleLogout}>logout</button>
            <button className="h-10 mt-3 font-serif border border-white p-2 rounded-md text-white  hover:border-2 capitalize hover:bg-white hover:text-black hover:font-bold">Profile</button>
        </div>
    );
}
export default AH_Navbar;