import React, { useEffect, useState } from "react";
import PasswordInput from "../components/SignUpAdopterC/PasswordInput";
import FormValidator from "../components/SignUpAdopterC/FormValidator";
import { useNavigate,useLocation } from "react-router-dom";


function SignUpAdopter() {
    const location=useLocation();
    const [adopterData, setAdopterData] = useState({
        name: "",
        contact: "",
        altcontact: "",
        email: "",
        address: "",
        dob: "",
        gender: "",
        maritalStatus: "",
        religion: "",
        salary: "",
        occupation: "",
        aadhar: "",
        aadharimg: null,
        bioChildren: "",
        pass: "",
        confirmPass: "",
        healthStatus: "",          // NEW
        medicalCertificates: [],   // NEW
        status: "pending",         // NEW
    });

    useEffect(() => {
  if (location.state?.formData) {
    const fd = location.state.formData;

    setAdopterData({
      ...fd,
      healthStatus: Array.isArray(fd.healthStatus)
        ? fd.healthStatus.join(", ")
        : fd.healthStatus || "",
    });
  }
}, [location.state]);

    


    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
        }, []);
            
    const [errors, setErrors] = useState({});

    function handleChange(e) {
        const { name, value, files } = e.target;

        function handleChange(e) {
        const { name, value, files } = e.target;

        setAdopterData((prev) => ({
            ...prev,
            [name]:
            name === "aadharimg"
                ? files[0]
                : name === "medicalCertificates"
                ? files        // ✅ keep as FileList / array
                : value,
        }));

        setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    }

    
    const navigator=useNavigate();
    function handleClick(e) {
        e.preventDefault();
        const validationErrors = FormValidator(adopterData);
        // Check password match
        if (adopterData.pass !== adopterData.confirmPass) {
            validationErrors.confirmPass = "*Passwords do not match.";
        }
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            navigator("/review-signup-form", {
                state: { formData: adopterData, role: "adopter" },
            });
            window.scrollTo(0, 0);
        }
    }


    return (
        <div className="flex items-center font-serif justify-center min-h-screen bg-[#fff0e5]">
            <div className="flex flex-col w-full max-w-lg p-6 m-10 bg-[#fffdfc] border border-gray-300 rounded-md shadow-lg">
                <div className="flex justify-between items-center shadow-sm">
                    <h2 className="text-2xl font-bold font-serif text-[#3c3c3c] text-center mb-4 bg-white  p-2 uppercase tracking-wider">
                    Adopter Signup Form
                    </h2>
                    <button onClick={() => navigator("/")} className="text-black bg-[#fff0e5] mb-4 px-1 py-1 font-semibold border border-black rounded-md hover:scale-105">Home</button>
                </div>

                <div className="border border-gray-300 rounded-md bg-[#f2e8cf] shadow-sm my-2">
                    <h3 className="text-lg underline font-semibold font-serif ml-4 my-3">Personal Information</h3>
                    <div className="flex mb-6">
                        <div>
                            <label className="block ml-6 text-sm font-medium text-[#3c3c3c]">Full Name</label>
                            <input name="name" value={adopterData.name} onChange={handleChange} className="border border-gray-400 rounded-md p-2 mx-4 focus:ring-2 focus:ring-[#5a8f7b]" placeholder="Full Name" />
                            {errors.name && <p className="text-red-600 ml-4 mt-0 text-sm">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="block ml-6 text-sm font-medium text-[#3c3c3c]">Religion</label>
                            <input name="religion" value={adopterData.religion} onChange={handleChange} className="border border-gray-400 rounded-md p-2 mx-4 focus:ring-2 focus:ring-[#5a8f7b]" placeholder="Religion" />
                            {errors.religion && <p className="text-red-600 ml-4 mt-0 text-sm">{errors.religion}</p>}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6 mb-4">
                        <div>
                            <label className="block ml-6 text-sm font-medium text-[#3c3c3c]">Gender</label>
                            <select name="gender" value={adopterData.gender} onChange={handleChange} className="border border-gray-400 rounded-md p-2 mx-4 focus:ring-2 focus:ring-[#5a8f7b]">
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                            </select>
                            {errors.gender && <p className="text-red-600 ml-4 mt-0 text-sm">{errors.gender}</p>}
                        </div>

                        <div>
                            <label className="block ml-6 text-sm font-medium text-[#3c3c3c]">Date Of Birth</label>
                            <input name="dob" value={adopterData.dob} onChange={handleChange} className="border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-[#5a8f7b]" placeholder="Date Of Birth" type="date" />
                            {errors.dob && <p className="text-red-600 mt-0 text-sm whitespace-pre-line ml-1">{errors.dob}</p>}
                        </div>

                        <div>
                            <label className="block ml-6 text-sm font-medium text-[#3c3c3c]">Marital Status</label>
                            <select name="maritalStatus" value={adopterData.maritalStatus} onChange={handleChange} className="border border-gray-400 rounded-md p-2 ml-4 focus:ring-2 focus:ring-[#5a8f7b]">
                                <option value="">Choose</option>
                                <option value="married">Married</option>
                                <option value="single">Single</option>
                                <option value="divorced">Divorced</option>
                                <option value="widowed">Widowed</option>
                                <option value="separated">Separated</option>
                            </select>
                            {errors.maritalStatus && <p className="text-red-600 ml-4 mt-0 text-sm">{errors.maritalStatus}</p>}
                        </div>
                    </div>
                </div>

                <div className="border border-gray-300 rounded-md bg-[#dbeaf3] shadow-sm my-2">
                    <h3 className="text-lg underline font-semibold font-serif ml-4 mt-2">Contact Details</h3>
                    <div className="flex my-4">
                        <div>
                            <label className="block ml-6 text-sm font-medium text-[#3c3c3c]">Email Address</label>
                            <input name="email" value={adopterData.email} onChange={handleChange} className="border border-gray-400 rounded-md p-2 mx-4 focus:ring-2 focus:ring-[#5a8f7b]" placeholder="Email address" />
                            {errors.email && <p className="text-red-600 ml-4 mt-0 text-sm">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block ml-6 text-sm font-medium text-[#3c3c3c]">Contact Number</label>
                            <input name="contact" value={adopterData.contact} onChange={handleChange} className="border border-gray-400 rounded-md p-2 mx-4 focus:ring-2 focus:ring-[#5a8f7b]" placeholder="Contact Number" />
                            {errors.contact && <p className="text-red-600 ml-4 mt-0 text-sm">{errors.contact}</p>}
                        </div>
                    </div>

                    <div className="flex my-4">
                        <div>
                            <label className="block ml-6 text-sm font-medium text-[#3c3c3c]">Address</label>
                            <textarea name="address" value={adopterData.address} onChange={handleChange} className="border border-gray-400 rounded-md p-2 mx-4 focus:ring-2 focus:ring-[#5a8f7b]" placeholder="Address" />
                            {errors.address && <p className="text-red-600 ml-4 mt-0 text-sm">{errors.address}</p>}
                        </div>
                        <div>
                            <label className="block ml-6 text-sm font-medium text-[#3c3c3c]"> Alternate Contact Number</label>
                            <input name="altcontact" value={adopterData.altcontact} onChange={handleChange} className="border border-gray-400 rounded-md p-2 mx-4 focus:ring-2 focus:ring-[#5a8f7b]" placeholder="Contact Number" />
                            {errors.contact && <p className="text-red-600 ml-4 mt-0 text-sm">{errors.altcontact}</p>}
                        </div>
                    </div>
                    
                </div>

                <div className="border border-gray-300 rounded-md bg-[#f2e8cf] my-2 shadow-sm">
                    <h3 className="text-lg underline font-semibold font-serif ml-4 mt-2">Family & Financial Information</h3>
                    <div className="grid grid-cols-2 gap-4 pr-2 my-4">
                        <div>
                            <label className="block ml-5 text-sm font-medium text-[#3c3c3c]">Number of Biological Children</label>
                            <input name="bioChildren" type="number" value={adopterData.bioChildren} onChange={handleChange} className="border border-gray-400 rounded-md p-2 mx-4 focus:ring-2 focus:ring-[#5a8f7b]" placeholder="Biological children?" min="0" />
                            {errors.bioChildren && <p className="text-red-600 ml-4 mt-0 text-sm">{errors.bioChildren}</p>}
                        </div>
                        <div>
                            <label className="block ml-6 text-sm font-medium text-[#3c3c3c]">Occupation</label>
                            <input name="occupation" value={adopterData.occupation} onChange={handleChange} className="border border-gray-400 rounded-md p-2 mx-4 focus:ring-2 focus:ring-[#5a8f7b]" placeholder="Occupation" />
                            {errors.occupation && <p className="text-red-600 ml-4 mt-0 text-sm">{errors.occupation}</p>}
                        </div>
                        <div>
                            <label className="block ml-6 text-sm font-medium text-[#3c3c3c]">Salary</label>
                            <input name="salary" value={adopterData.salary} onChange={handleChange} className="border border-gray-400 rounded-md p-2 mx-4 focus:ring-2 focus:ring-[#5a8f7b]" placeholder="Salary per Annum(Rs.)" />
                            {errors.salary && <p className="text-red-600 ml-4 mt-0 text-sm">{errors.salary}</p>}
                        </div>
                        <div>
                            <label className="block ml-6 text-sm font-medium text-[#3c3c3c]">Aadhar Number</label>
                            <input name="aadhar" value={adopterData.aadhar} onChange={handleChange} className="border border-gray-400 rounded-md p-2 mx-4 focus:ring-2 focus:ring-[#5a8f7b]" placeholder="Valid Aadhar Number" />
                            {errors.aadhar && <p className="text-red-600 ml-4 mt-0 text-sm">{errors.aadhar}</p>}
                        </div>
                    </div>
                    <div>
                        <label className="block ml-6 text-sm font-medium text-[#3c3c3c]">Upload Aadhar Image</label>
                        <input name="aadharimg" type="file"  accept="image/png, image/jpeg, image/jpg" onChange={handleChange} className="file: border file:border-gray-400 file:rounded-lg file:mr-4 p-1 mx-4 my-1" />
                        {adopterData.aadharimg && (<p className="text-sm text-gray-600 ml-4">Selected file: {adopterData.aadharimg.name}</p>)}
                        {errors.aadharimg && <p className="text-red-600 ml-5 mt-0 text-sm">{errors.aadharimg}</p>} 
                        <div className="w-full">
                            <p className="text-[#5c5c5c] font-medium ml-5 mt-1 text-xs">*Image should be of JPG,JPEG or PNG format.</p>
                            <p className="text-[#5c5c5c] font-medium ml-5 mb-4 text-xs">*Image must be less than 2MB.</p>
                        </div> 
                        </div>
                </div>

                {/* Medical Information */}
                <div className="border border-gray-300 rounded-md bg-[#f2e8cf] my-2 shadow-sm p-4">
                <h3 className="text-lg underline font-semibold font-serif mb-2">Medical Information</h3>

                {/* Serious Medical Conditions */}
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-1">Serious Medical Conditions (comma separated)</label>
                    <input
                    type="text"
                    name="healthStatus"
                    value={adopterData.healthStatus}
                    onChange={handleChange}
                    placeholder="e.g. Diabetes, Heart Disease or write 'Healthy'"
                    className="border border-gray-400 rounded-md p-2 focus:ring-2 focus:ring-[#5a8f7b] w-full"
                    />
                    {errors.healthStatus && <p className="text-red-600 text-sm mt-1">{errors.healthStatus}</p>}
                    <p className="text-[#5c5c5c] font-medium text-xs mt-1">
                    *In caseof no serious medical condition, write "Healthy".
                    </p>
                </div>

                {/* Medical Certificate Upload */}
                <div className="flex flex-col mb-2">
                    <label className="block text-sm font-medium mb-1">Upload Medical Certificate</label>
                    <input
                    type="file"
                    name="medicalCertificates"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleChange}
                    className="file:border file:border-gray-400 file:rounded-lg file:mr-4 p-1"
                    />
                    {adopterData.medicalCertificates && adopterData.medicalCertificates.name && (
                    <p className="text-sm text-gray-600 ml-1 mt-1">Selected file: {adopterData.medicalCertificates.name}</p>
                    )}
                    {errors.medicalCertificates && <p className="text-red-600 text-sm mt-1">{errors.medicalCertificates}</p>}
                    <div className="w-full mt-1">
                    <p className="text-[#5c5c5c] font-medium text-xs">
                        *Upload a medical certificate signed by a certified doctor.
                        </p>
                        <p className="text-[#5c5c5c] font-medium text-xs">
                        *The certificate should clearly mention either all serious medical conditions or state that you are fully healthy.
                        </p>
                    <p className="text-[#5c5c5c] font-medium text-xs">*Image should be of JPG, JPEG, or PNG format.</p>
                    <p className="text-[#5c5c5c] font-medium text-xs mb-2">*Image must be less than 2MB.</p>
                    </div>
                </div>
                </div>


                <div className="border border-gray-300 rounded-md bg-[#dbeaf3] my-2 shadow-sm">
                    <h3 className="text-lg underline font-semibold font-serif ml-4 mt-2">Account and Security</h3>
                    <div className="my-2">
                        <label className="block ml-4 mt-1 text-sm font-medium text-[#3c3c3c]">Password</label>
                        <PasswordInput name="pass" value={adopterData.pass} onChange={handleChange} placeholder="Set Password" className="w-full border border-black rounded-md ml-2 p-2 pr-10" />
                        {errors.pass && <p className="text-red-600 ml-4 -mt-3 mb-2 text-sm">{errors.pass}</p>}
                        <p className="text-[#5c5c5c] font-medium ml-4 mt-0 text-xs">*Password must have at least 8 characters.</p>
                        <p className="text-[#5c5c5c] font-medium ml-4 mt-0 text-xs">*Must include a capital letter, a special character, and a number.</p>
                    </div>
                    <div className="my-2">
                        <label className="block ml-4 mt-1 text-sm font-medium text-[#3c3c3c]">Confirm Password</label>
                        <PasswordInput name="confirmPass" value={adopterData.confirmPass} onChange={handleChange} placeholder="Re-enter Password" className="w-full border border-black rounded-md ml-2 p-2 pr-10" />
                        {errors.confirmPass && <p className="text-red-600 ml-4 -mt-2 mb-2 text-sm">{errors.confirmPass}</p>}
                    </div>
                </div>

                <button onClick={handleClick} className="self-center text-base font-semibold font-serif mt-6 shadow-md border border-[#5a8f7b] text-white bg-[#5a8f7b] hover:bg-[#497667] rounded-md px-6 py-2 transition duration-300 ease-in-out">
                    Proceed to Review
                </button>
            </div>
        </div>
    );
}

export default SignUpAdopter;
