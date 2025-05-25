import { useNavigate } from "react-router-dom";

function Login(){
    const navigate=useNavigate();
    const handleLogin=(e)=>{
        e.preventDefault();
        navigate('/adopter-home');
    };
    return(
       <>
       <div className=" h-auto w-[23%] absolute top-24 right-8 p-4  border border-[#B0BEC5] rounded-2xl bg-white/90 backdrop-blur-md text-center">
        <form className="flex flex-col items-center">
            <div className="p-2 flex flex-row justify-between">
               <div className="py-2"> <label className="text-lg font-bold font-serif">select role: </label></div>
                <select className="text-md ml-2  rounded-lg border border-[#B0BEC5]">
                <option value="">Adopter</option>
                <option value="">NGO</option>
            </select>
            </div>

            <input className="text-md m-2 rounded-lg p-2 border border-[#B0BEC5]" placeholder="username"></input>
            <input className="text-md m-2 rounded-lg p-2 border border-[#B0BEC5]" placeholder="password"></input>
            <button className="font-serif border border-transparent m-3 p-2 rounded-lg bg-[#4CAF50] text-white hover:bg-[#1565C0] hover:shadow-md transition" onClick={handleLogin}>submit</button>
            
            <button className="font-serif border border-transparent m-3 p-2 rounded-lg bg-[#4CAF50] text-white hover:bg-[#1565C0] hover:shadow-md transition" >sign in with google</button>
            
            <button className="font-serif border border-transparent m-3 p-2 rounded-lg bg-[#4CAF50] text-white hover:bg-[#1565C0] hover:shadow-md transition">custom signup</button>
        </form>
       </div>
       </>
    );
}
export default Login;