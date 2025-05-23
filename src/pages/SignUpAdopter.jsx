import React,{useState} from "react";
import PasswordInput from "../components/SignUpAdopterC/PasswordInput";
function SignUpAdopter()
{
    const[adopterData,setAdopterData]=useState({
        name: "",
        contact: "",
        email: "",
        address: "",
        dob: "",
        gender: "",
        maritalStatus: "",
        religion: "",
        salary: "",
        occupation: "",
        aadhar: "",
        bioChildren: "",
        pass: "",
    });

    function handleChange(e)
    {
        const{name,value}=e.target;
        setAdopterData((prev)=>({ 
            ...prev,
            [name]: value,
        }))
    };
    
    return(
        <div className="flex items-center justify-center min-h-screen bg-cover" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1641895964758-3e4374714a8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}>
            <div className="flex flex-col w-full max-w-lg p-6 m-10 bg-gradient-to-r from-[#ebf4f5] to-[#b5c6e0] border-2 border-black rounded-xl shadow-4xl ">
                <h2 className="text-2xl underline font-semibold font-serif text-black text-center mb-4 shadow-md p-2 border border-black rounded-md">Adopter Signup Form</h2>
                <div className="border border-black rounded-md shadow-md my-2">
                    <h3 className="text-lg underline font-semibold font-serif ml-4 mt-2 shadow-sm">Personal Information</h3>
                    <input name="name" value={adopterData.name} onChange={handleChange} className="border border-black rounded-md p-1 m-4" placeholder="Full Name of the adopter"></input>
                    <input name="religion" value={adopterData.religion} onChange={handleChange} className="border border-black rounded-md p-1 m-4" placeholder="Religion"></input>

                    <select name="gender" value={adopterData.gender} onChange={handleChange} className="border border-black rounded-md p-1 m-4">
                        <option value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                    </select>

                    <input name="dob" value={adopterData.dob} onChange={handleChange} className="border border-black rounded-md p-1 m-2" placeholder="Enter Date Of Birth" type="date"></input>

                    <select name="maritalStatus" value={adopterData.maritalStatus} onChange={handleChange} className="border border-black rounded-md p-1 m-4">
                        <option value="">Marital Status</option>
                        <option value="married">Married</option>
                        <option value="single">Single</option>
                        <option value="divorced">Divorced</option>
                    </select>

                </div>
               
                
                <div className="border border-black rounded-md shadow-md my-2">
                    <h3 className="text-lg underline font-semibold font-serif ml-4 mt-2 shadow-sm">Contact Details</h3>
                    <input name="email" value={adopterData.email} onChange={handleChange} className="border border-black rounded-md p-1 m-4" placeholder="Enter your email address"></input>
                    <input name="contact" value={adopterData.contact} onChange={handleChange} className="border border-black rounded-md p-1 m-4" placeholder="Contact Number"></input>
                    <textarea name="address" value={adopterData.address} onChange={handleChange} className="border border-black rounded-md p-1 m-4" placeholder="Enter your Address"></textarea>
                </div>

                <div className="border border-black rounded-md my-2 shadow-md">
                    <h3 className="text-lg underline font-semibold font-serif ml-4 mt-2 shadow-sm">Family & Financial Information</h3>
                    <input name="bioChildren" type="number" value={adopterData.bioChildren} onChange={handleChange} className="border border-black rounded-md p-1 m-4" placeholder="Biological children?"></input>
                    <input name="occupation" value={adopterData.occupation} onChange={handleChange} className="border border-black rounded-md p-1 m-4" placeholder="Enter your occupation"></input>
                    <input name="salary" value={adopterData.salary} onChange={handleChange} className="border border-black rounded-md p-1 m-4" placeholder="Salary per Annum(Rs.)"></input>
                    <input name="aadhar" value={adopterData.aadhar} onChange={handleChange} className="border border-black rounded-md p-1 m-4" placeholder="Valid Aadhar Number"></input>
                </div>

                <div className="border border-black rounded-md my-2 shadow-md">
                    <h3 className="text-lg underline font-semibold font-serif ml-4 mt-2 shadow-sm">Account and Security</h3>
                    <PasswordInput name="password" value={adopterData.password} onChange={handleChange} placeholder="Enter your password"></PasswordInput>
                </div>

                <button className="self-center hover:underline text-base font-semibold font-serif mt-6 shadow-md border-2 border-black rounded-md p-2">Submit</button>
                
            </div>
        </div>

    );
}

export default SignUpAdopter