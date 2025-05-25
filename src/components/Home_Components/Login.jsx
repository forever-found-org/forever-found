import { useNavigate } from "react-router-dom";

function Login(){
    const navigate=useNavigate();
    const handleLogin=(e)=>{
        e.preventDefault();
        navigate('/adopter-home');
    };

    const handleAdopterSignUp=(e)=>{
        e.preventDefault();
        navigate('/adopter-SignUp');
    };

    return(
       <>
       <div className=" h-auto w-[23%] absolute top-32 right-8 p-4  border border-[#B0BEC5] rounded-2xl bg-white/90 backdrop-blur-md text-center">
        <form className="p-2 flex flex-col">
            <div className="flex flex-row mx-6">
                <div className="py-2"> 
                    <label className="text-lg font-bold font-serif">Select role: </label>
                </div>
                <select className="text-md ml-2  rounded-lg border border-[#B0BEC5]">
                    <option value="Adopter">Adopter</option>
                    <option value="NGO">NGO</option>
                </select>
            </div>

            <div className="my-4">
                <div>
                    <label className="block text-sm font-medium text-[#3c3c3c]">Username</label>
                    <input className="text-md m-2 rounded-lg p-2 border border-[#B0BEC5]" placeholder="username"></input>
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#3c3c3c]">Password</label>
                    <input className="text-md m-2 rounded-lg p-2 border border-[#B0BEC5]" placeholder="password"></input>
                </div>
            </div>

            <button className="font-serif border border-transparent m-3 p-2 rounded-lg bg-[#4CAF50] text-white hover:bg-[#1565C0] hover:shadow-md transition" onClick={handleLogin}>submit</button>
            
            <button className="font-serif border border-transparent m-3 p-2 rounded-lg bg-[#4CAF50] text-white hover:bg-[#1565C0] hover:shadow-md transition" >sign in with google</button>
            
            <button className="font-serif border border-transparent m-3 p-2 rounded-lg bg-[#4CAF50] text-white hover:bg-[#1565C0] hover:shadow-md transition" onClick={handleAdopterSignUp}>custom signup</button>
        </form>
       </div>
       </>
    );
}
export default Login;