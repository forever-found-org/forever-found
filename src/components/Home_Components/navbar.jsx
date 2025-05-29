import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png"
function Navbar({onLoginClick,onNGOaprClick}){
    const navigate=useNavigate();
    const handleAbout=()=>{
        navigate("/about-Forever-Found");
    }
    const handleHelp=()=>{
        navigate("/help-Forever-Found");
    }

    return(
        <nav className="flex items-center p-2 relative h-[105px] bg-[#F9F4F1] ">

            <div className="flex items-center mx-4">
                <img
                    src={logo}
                    alt="logo"
                    className="w-15 h-20 rounded-full"
                />
            </div>
            <div className="flex flex-col mr-20 ml-16">    
                <h1 className="text-5xl font-[Georgia] font-bold text-stone-700">FOREVER FOUND</h1>
                <p className="text-2xl font-serif mt-2 ml-2 text-stone-500"><i>Every Child Deserves a Home</i></p>      
            </div>
            <div className="space-x-8 mr-4 absolute bottom-4 right-4">
                <button className="text-blue-600  font-serif text-base hover:text-indigo-700 hover:underline" onClick={onNGOaprClick}>NGO Approval Status</button>   
                <button className="text-blue-600  font-serif text-base hover:text-indigo-700 hover:underline" onClick={onLoginClick}>Login</button>
                <button className="text-blue-600  font-serif text-base hover:text-indigo-700 hover:underline" onClick={handleAbout}>About</button>
                <button className="text-blue-600  font-serif text-base hover:text-indigo-700 hover:underline" onClick={handleHelp}>Help</button>
            </div>
        </nav>
    );
}
export default Navbar;