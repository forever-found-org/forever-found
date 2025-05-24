import React,{useState} from "react";
import PasswordInput from "../components/SignUpAdopterC/PasswordInput";
import FormValidator from "../components/SignUpAdopterC/FormValidator";
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

    const [errors,setErrors]=useState({});

    function handleChange(e)
    {
        const{name,value}=e.target;
        setAdopterData((prev)=>({ 
            ...prev,
            [name]: value,
        }))

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    function handleClick(e)
    {
        e.preventDefault();
        const validationErrors = FormValidator(adopterData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) 
            alert("Form submitted successfully!");
        
    }
    
    return(
        <div className="flex items-center justify-center min-h-screen bg-blue-800 bg-opacity-60">
            <div className="flex flex-col w-full max-w-lg p-6 m-10 bg-[#fbfefb] border-2 border-black rounded-md shadow-4xl ">
                <h2 className="text-2xl underline font-semibold font-serif text-black text-center mb-4 bg-[#f8f7ff] shadow-md p-2 border border-black rounded-md">Adopter Signup Form</h2>
                <div className="border border-black rounded-md bg-blue-50 shadow-md my-2">
                    <h3 className="text-lg underline font-semibold font-serif ml-4 mt-2 shadow-sm">Personal Information</h3>
                    <div className="flex mb-6">
                        <div>
                            <input name="name" value={adopterData.name} onChange={handleChange} className="border border-black rounded-md p-1 m-4 mb-0" placeholder="Full Name"></input>
                            {errors.name && <p className=" text-red-600 ml-4 mt-0 text-sm">{errors.name}</p>}
                        </div>

                        <div>
                            <input name="religion" value={adopterData.religion} onChange={handleChange} className="border border-black rounded-md p-1 m-4 mb-0" placeholder="Religion"></input>
                            {errors.religion && <p className=" text-red-600 ml-4 mt-0  text-sm">{errors.religion}</p>}
                        </div>    
                    </div>
                    

                    <div className="flex flex-wrap gap-6 py-4">
                        <div>
                            <label className="block ml-6 text-sm font-medium text-gray-700">Gender</label>
                            <select name="gender" value={adopterData.gender} onChange={handleChange} className="border border-black rounded-md p-1 ml-4 mr-4 mb-4 mt-1">
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                            </select>
                            {errors.gender && <p className="text-red-600 ml-4 -mt-4 text-sm">{errors.gender}</p>}
                        </div>

                        <div>
                            <label className="block ml-6 text-sm font-medium text-gray-700">Date Of Birth</label>
                            <input name="dob" value={adopterData.dob} onChange={handleChange} className="border border-black rounded-md p-1 mt-1" placeholder="Date Of Birth" type="date"></input>
                            {errors.dob && <p className="text-red-600  mt-0 text-sm">{errors.dob}</p>}
                        </div>

                        <div>
                            <label className="block ml-5 text-sm font-medium text-gray-700">Marital Status</label>
                            <select name="maritalStatus" value={adopterData.maritalStatus} onChange={handleChange} className="border border-black rounded-md p-1 mt-1 ml-4">
                                <option value="">Choose</option>
                                <option value="married">Married</option>
                                <option value="single">Single</option>
                                <option value="divorced">Divorced</option>
                                <option value="widowed">Widowed</option>
                                <option value="separated">Separated</option>
                            </select>
                            {errors.maritalStatus && <p className="text-red-600 ml-4  mt-0 text-sm">{errors.maritalStatus}</p>}
                        </div>
                    </div>
                </div>
               
                
                <div className="border border-black rounded-md bg-purple-50 shadow-md my-2">
                    <h3 className="text-lg underline font-semibold font-serif ml-4 mt-2 shadow-sm">Contact Details</h3>
                    <div className="flex">
                        <div>
                            <input name="email" value={adopterData.email} onChange={handleChange} className="border border-black rounded-md p-1 m-4 mb-0" placeholder="Email address"></input>
                            {errors.email && <p className=" text-red-600 ml-4 mt-0  text-sm">{errors.email}</p>}
                        </div>
                        <div>
                            <input name="contact" value={adopterData.contact} onChange={handleChange} className="border border-black rounded-md p-1 m-4 mb-0" placeholder="Contact Number"></input>
                            {errors.contact && <p className=" text-red-600 ml-4 mt-0  text-sm">{errors.contact}</p>}
                        </div>
                    </div>
                    
                    <div className="mb-2">
                        <textarea name="address" value={adopterData.address} onChange={handleChange} className="border border-black rounded-md p-1 m-4 mb-0" placeholder="Address"></textarea>
                        {errors.address && <p className=" text-red-600 ml-4 mt-0  text-sm">{errors.address}</p>}
                    </div>
    
                </div>

                <div className="border border-black rounded-md bg-blue-50 my-2 shadow-md">
                    <h3 className="text-lg underline font-semibold font-serif ml-4 mt-2 shadow-sm">Family & Financial Information</h3>
                    <div className="grid grid-cols-2 gap-4 pr-2 mb-4">
                        <div>
                            <input name="bioChildren" type="number" value={adopterData.bioChildren} onChange={handleChange} className="border border-black rounded-md p-1 m-4 mb-0" placeholder="Biological children?" min="0"></input>
                            {errors.bioChildren && <p className=" text-red-600 ml-4 mt-0  text-sm">{errors.bioChildren}</p>}
                        </div>
                        <div>
                            <input name="occupation" value={adopterData.occupation} onChange={handleChange} className="border border-black rounded-md p-1 m-4 mb-0" placeholder="Occupation"></input>
                            {errors.occupation && <p className=" text-red-600 ml-4 mt-0  text-sm">{errors.occupation}</p>}
                        </div>
                    
                        <div>
                            <input name="salary" value={adopterData.salary} onChange={handleChange} className="border border-black rounded-md p-1 m-4 mb-0" placeholder="Salary per Annum(Rs.)"></input>
                            {errors.salary && <p className=" text-red-600 ml-4 mt-0  text-sm">{errors.salary}</p>}
                        </div>

                        <div>
                            <input name="aadhar" value={adopterData.aadhar} onChange={handleChange} className="border border-black rounded-md p-1 m-4 mb-0" placeholder="Valid Aadhar Number"></input>
                            {errors.aadhar && <p className=" text-red-600 ml-4 mt-0  text-sm">{errors.aadhar}</p>}
                        </div>
                    </div>   
                </div>

                <div className="border border-black rounded-md bg-purple-50 my-2 shadow-md">
                    
                    <h3 className="text-lg underline font-semibold font-serif ml-4 mt-2 shadow-sm">Account and Security</h3>
                    <div className="mb-4">
                        <PasswordInput name="pass" value={adopterData.password} onChange={handleChange} placeholder="Set Password"></PasswordInput>
                        {errors.pass && <p className=" text-red-600 ml-4 -mt-3 mb-2 text-sm">{errors.pass}</p>}
                        <p className=" text-black font-semibold ml-4 mt-0  text-xs">*Password must have at least 8 characters.</p>
                        <p className=" text-black font-semibold ml-4 mt-0  text-xs">*must include a capital letter, a special character and a number.</p>
                    </div>
   
                </div>

                <button onClick={handleClick} className="self-center text-base font-semibold font-serif mt-6 shadow-md border-2 border-black rounded-md p-2  bg-blue-50 hover:underline">Submit</button>
                
            </div>
        </div>

    );
}

export default SignUpAdopter