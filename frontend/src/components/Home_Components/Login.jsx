import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../SignUpAdopterC/PasswordInput";

function Login(){

    const navigate=useNavigate();
    const[role,setRole]=useState("");
    const[user,setUser]=useState("");
    const[pass,setPass]=useState("");
    const[error,setError]=useState({role: "",user: "",pass: ""});
    const email_regex=/^\S+@\S+\.\S+$/;
    const pass_regex=/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const validateLogIn=()=>{
        let valid=true;
        const tempErrors={role: "",user: "",pass: ""};

        if(!role)
        {
            tempErrors.role="*Please select a role";
            valid=false;
        }
        if(!user.trim())
        {
            tempErrors.user="*Username is required";
            valid=false;    
        }
        else if(!email_regex.test(user))
        {
            tempErrors.user="*Invalid email format";
            valid=false; 
        }
        if(!pass.trim())
        {
            tempErrors.pass="*Password is required";
            valid=false;
        }
        else if(!pass_regex.test(pass))
        {
            tempErrors.pass="*Invalid password format";
            valid=false; 
        }

        setError(tempErrors);
        return valid;
    }

    const validateRole=()=>{
        if(!role)
        {
            setError({role: "*Please select a role",user: "",pass: ""});
            return false;
        }
        setError({role: "",user: "",pass: ""});
        return true;
    }

    const handleLogin = async (e) => {
  e.preventDefault();

  if (validateLogIn()) {
    if (role === "Adopter") {
      try {
        const res = await fetch("http://localhost:5000/api/adopter/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user }),
        });

        if (!res.ok) {
          const errData = await res.json();
          setError({ ...error, user: errData.error || "Login failed" });
          return;
        }

        const adopterData = await res.json();

        // Save adopter info locally
        localStorage.setItem("adopter", JSON.stringify(adopterData));

        navigate(`/adopter-home/${adopterData.id}`);
      } catch (err) {
        console.error(err);
        setError({ ...error, user: "Server error, try later" });
      }
    }

    if (role === "NGO") {
    try {
    const res = await fetch("http://localhost:5000/api/ngos/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user }),
    });

    if (!res.ok) {
      const errData = await res.json();
      setError({ ...error, user: errData.message || "Login failed" });
      return;
    }

    const text = await res.text();
console.log("Raw NGO Response:", text);
let ngoData;
try {
  ngoData = JSON.parse(text);
} catch (e) {
  console.error("Failed to parse NGO data", e);
  return;
}

    // Save NGO info locally
    localStorage.setItem("ngo", JSON.stringify(ngoData));

    // Redirect to NGO home
    navigate(`/ngo-home/${ngoData.id}`);
  } catch (err) {
    console.error(err);
    setError({ ...error, user: "Server error, try later" });
  }
}

  }
};


    const handleAdopterSignUp=(e)=>{
        e.preventDefault();
        if(validateRole())
        {
            if(role==="Adopter")
                navigate('/adopter-SignUp');
            if(role==="NGO")
                navigate('/ngo-signup');
        }
    };


    return(
       <>
       <div className=" h-auto w-[25%] absolute top-32 right-8 p-4 shadow-md ring-1 ring-gray-300 rounded-xl bg-[#F9F4F1] backdrop-blur-md">
        <form className="p-2">
            <div className="flex flex-col">
                <div className="flex flex-wrap justify-center">
                    <div className="py-2"> 
                    <label className="text-lg font-bold font-serif text-[#4B2E2E]">Select role: </label>
                    </div>
                    <select value={role} onChange={(e)=>setRole(e.target.value)} className="text-md ml-2 p-1 rounded-lg border border-[#DAB49D] font-serif">
                        <option value="">None</option>
                        <option value="Adopter">Adopter</option>
                        <option value="NGO">NGO</option>
                    </select>
                </div>
                
                {error.role && <p className="text-red-600 ml-12 mt-0 text-sm">{error.role}</p>}
            </div>

            <div className="flex flex-col my-4 font-serif items-center">
                <div>
                    <label className="block text-base font-semibold text-[#4B2E2E]">Registered Email</label>
                    <input value={user} onChange={(e)=>setUser(e.target.value)} className="text-md mt-1 rounded-lg p-2 border border-[#DAB49D]" placeholder="Email Address"></input>
                    {error.user && <p className="text-red-600 ml-2 mt-1 text-sm">{error.user}</p>}
                </div>
                <div className="mt-2">
                    <label className="block text-base font-semibold text-[#4B2E2E] -mb-2 ml-4">Password</label>
                    <PasswordInput name="pass" value={pass} onChange={(e)=>setPass(e.target.value)} className="text-md mt-1 ml-2 rounded-lg p-2 border border-[#DAB49D]" placeholder="password" />
                    {error.pass && <p className="text-red-600 ml-5 -mt-3 text-sm">{error.pass}</p>}
                </div>
            </div>

            <div className="flex flex-col items-center">                
                <button className="w-full font-serif border border-gray-400 m-3 p-1 rounded-lg font-semibold text-lg bg-white text-[#4B2E2E] hover:shadow-md hover:bg-blue-500 hover:text-white transition" onClick={handleLogin}>Log in</button>            
                <button className="w-full font-serif flex items-center justify-center gap-2 border border-gray-400 m-3 p-1 rounded-lg font-semibold text-lg bg-white text-[#4B2E2E] hover:shadow-md hover:bg-blue-500 hover:text-white  transition">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                    <span>Sign in with Google</span>
                </button>
            
                <button className="w-full font-serif border border-gray-400 m-3 p-1 rounded-lg font-semibold text-lg bg-white text-[#4B2E2E] hover:shadow-md hover:bg-blue-500 hover:text-white transition" onClick={handleAdopterSignUp}>Manual Signup</button>
                
            </div>

            
        </form>
       </div>
       </>
    );
}
export default Login;