import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/SignUpAdopterC/PasswordInput";
import NgoFormValidation from "../components/SignUpngo/NgoFormValidation";
function SignupNgo(){
    const [showDesg,setDesg]=useState(false);
    const [errors, setErrors] = useState({});
    const [NGOData, setNGOData] = useState({
            name: "",
            contact: "",
            altcontact: "",
            email: "",
            address: "",
            website: "",
            name_contact:"",
            desg_contact:"",
            year: "",
            num_child:"",
            regnum:"",
            caranum:"",
            about:"",
            reg_certimg:null,
            cara_certimg:null,
            logoimg:null,
            galimg1:null,
            galimg2:null,
            galimg3:null,
            testimonial1: "",
            testimonial2: "",
            testimonial3: "",
            pass:""
    });

    const handleChange = (e) => {
  const { name, value, files } = e.target;

  // For file inputs
  if (files && files.length > 0) {
    const file = files[0];

    // File type validation
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Only JPEG ,JPG and PNG images are allowed.",
      }));
      return;
    }

    // File size validation (limit: 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "File size should be less than 2MB.",
      }));
      return;
    }

    // Clear error if valid
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    setNGOData({
      ...NGOData,
      [name]: file,
    });
  } else {
    // For text inputs
    setNGOData({
      ...NGOData,
      [name]: value,
    });
  }
};


    const navigator=useNavigate();
    function handleClick(e) {
        e.preventDefault();
        const validationErrors = NgoFormValidation(NGOData);
        setErrors(validationErrors);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fff0e5]">
            <div className="flex font-serif flex-col items-center w-full max-w-2xl m-10 bg-[#fffdfc] border border-gray-300 rounded-md shadow-lg">
                <div className="text-center m-5  bg-white shadow-sm p-2 ">
                    <h1 className="text-3xl font-bold text-[#3c3c3c] uppercase tracking-wide">NGO SIGNUP FORM</h1>
                    <p className="mt-2 text-md italic text-red-600">If your NGO is not registered with CARA, your organization may not be eligible to list adoptable children on this platform.</p>
                </div>
                <div className="p-3 border border-gray-300 rounded-md bg-[#f2e8cf] shadow-sm my-2 mb-4">
                    <h3 className="text-lg underline font-semibold font-serif my-3">Basic NGO Details</h3>
                    <div className="flex justify-center gap-5">
                        <div className="flex flex-col">
                            <label className="block ml-5 mb-1 text-md font-semibold text-[#3c3c3c]">NGO Name</label>
                            <input name="name" value={NGOData.name} type="text" placeholder="ngo name" onChange={handleChange} className="w-60 border border-gray-400 rounded-md p-2 mx-4 focus:ring-2 focus:ring-[#5a8f7b]" />
                            {errors.name && <p  className="ml-5 mt-1 text-red-500">{errors.name}</p>}
                        </div>
                        <div className="flex flex-col ">
                            <label className="block  mb-1 text-md font-semibold text-[#3c3c3c]">Email</label>
                            <input name="email" value={NGOData.email} type="text" placeholder="ngo email" onChange={handleChange} className="w-64 border border-gray-400 rounded-md p-2 mr-4 ml-0 focus:ring-2 focus:ring-[#5a8f7b]" />
                            {errors.email&&<p className="mt-1 text-red-500">{errors.email}</p>}
                        </div>
                    </div>
                    <div className="mt-1 flex flex-col">
                        <label className="block ml-5 mb-1 text-md font-semibold text-[#3c3c3c]">Address/Location</label>
                        <textarea name="address" value={NGOData.address} type="text" placeholder="address/location" onChange={handleChange} className="w-60 border border-gray-400 rounded-md p-2 mx-4 focus:ring-2 focus:ring-[#5a8f7b]" />
                        {errors.address&&<p className="mt-1 ml-5 text-red-500">{errors.address}</p>}
                    </div>
                    <div className="mt-1 flex justify-center gap-5">
                        <div className="flex flex-col">
                            <label className="block ml-5 mb-1 text-md font-semibold text-[#3c3c3c]" >Contact Number</label>
                            <input name="contact" value={NGOData.contact} type="text" placeholder="contact" onChange={handleChange} className="w-60 border border-gray-400 rounded-md p-2 mx-4 focus:ring-2 focus:ring-[#5a8f7b]"/>
                            {errors.contact&&<p className="ml-5 mt-1 text-red-500">{errors.contact}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label className="block  mb-1 text-md font-semibold text-[#3c3c3c]">Alternate Contact Number</label>
                            <input name="altcontact" value={NGOData.altcontact} type="text" placeholder="alternate contact" onChange={handleChange} className="w-64 border border-gray-400 rounded-md p-2 mr-4 ml-0 focus:ring-2 focus:ring-[#5a8f7b]" />
                           {errors.altcontact&& <p className="mt-1 text-red-500">{errors.altcontact}</p>}
                        </div>
                    </div>
                    <div className="mt-2 flex flex-col">
                        <label className="block ml-5 mb-1 text-md font-semibold text-[#3c3c3c]">NGO Website/Social media link (optional)</label>
                        <input name="website" value={NGOData.website} type="url" placeholder="website/social media link" onChange={handleChange} className="w-60 border border-gray-400 rounded-md p-2 mx-4 focus:ring-2 focus:ring-[#5a8f7b]" />
                        {errors.website&& <p className="mt-1 ml-4 text-red-500">{errors.website}</p>}
                    </div>
                </div>

                <div className=" border border-gray-300 rounded-md bg-[#dbeaf3] shadow-sm my-2 mb-4">
                    <h3 className="text-lg underline font-semibold font-serif ml-4 mt-2">Contact Information</h3>
                    <div className="mt-2 p-3 flex justify-center gap-5">
                        <div className="flex flex-col">
                        <label className="block ml-5 mb-1 text-md font-semibold text-[#3c3c3c]">Name of Contact Person</label>
                        <input name="name_contact" value={NGOData.name_contact} type="text" placeholder="name of contact person" onChange={handleChange} className="w-60 border border-gray-400 rounded-md p-2 mx-4 focus:ring-2 focus:ring-[#5a8f7b]" />
                        {errors.name_contact&&<p className="mt-1 ml-5 text-red-500">{errors.name_contact}</p>}
                        </div>

                        <div className="flex flex-col">
                        <label className="block ml-5 mb-1 text-md font-semibold text-[#3c3c3c]" >Designation of Contact Person</label>
                        <select name="desg_contact" value={NGOData.desg_contact} onChange={(e) => {handleChange(e);setDesg(e.target.value === "Other");}} className="p-3 rounded-lg border border-gray-400  mx-4 focus:ring-2 focus:ring-[#5a8f7b]" >
                            <option value="">Select Designation</option>
                            <option value="Director">Director</option>
                            <option value="Coordinator">Coordinator</option>
                            <option value="Manager">Manager</option>
                            <option value="Social Worker">Social Worker</option>
                            <option value="Administrator">Administrator</option>
                            <option value="Other">Other</option>
                        </select>
                        {showDesg&&<input type="text" name="desg_contact" value={NGOData.desg_contact} placeholder="designation of contact person" onChange={handleChange} className="mt-3 w-60 border border-gray-400 rounded-md p-2 mx-4 focus:ring-2 focus:ring-[#5a8f7b]"/>}
                        {errors.desg_contact&&<p className="mt-1 ml-5 text-red-500">{errors.desg_contact}</p>}
                        </div>
                    </div>
                </div>

                <div className="p-3 border border-gray-300 rounded-md bg-[#f2e8cf] shadow-sm my-2 mb-4">
                    <h3 className="text-lg underline font-semibold font-serif ml-4 mt-2">Organizational Credentials</h3>
                    <div className="mt-4 flex justify-center gap-5">
                        <div className="flex flex-col">
                            <label className="block ml-5 mb-1 text-md font-semibold text-[#3c3c3c]">Year of Establishment</label>
                            <input name="year" value={NGOData.year} type="number" placeholder="year" onChange={handleChange}  min="1990" max={new Date().getFullYear()}className="w-60 border border-gray-400 rounded-md p-2 mx-4 focus:ring-2 focus:ring-[#5a8f7b]"/>
                            {errors.year&&<p className="ml-5 mt-1 text-red-500">{errors.year}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label className="block  mb-1 text-md font-semibold text-[#3c3c3c]">Number of children under care</label>
                            <input name="num_child" value={NGOData.num_child} type="number" placeholder="number of children" onChange={handleChange} min="1" className="w-64 border border-gray-400 rounded-md p-2 mr-4 ml-0 focus:ring-2 focus:ring-[#5a8f7b]"/>
                            {errors.num_child&&<p className="mt-1 text-red-500">{errors.num_child}</p>}
                        </div>
                    </div>
                    <div className="mt-1 flex justify-center gap-5">
                        <div className="flex flex-col">
                            <label className="block ml-5 mb-1 text-md font-semibold text-[#3c3c3c]" >Registration Number</label>
                            <input name="regnum" value={NGOData.regnum} type="text" placeholder="registration number" onChange={handleChange} className="w-60 border border-gray-400 rounded-md p-2 mx-4 focus:ring-2 focus:ring-[#5a8f7b]"/>
                            {errors.regnum&&<p className="ml-5 mt-1 text-red-500">{errors.regnum}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label className="block  mb-1 text-md font-semibold text-[#3c3c3c]">CARA Number</label>
                            <input name="caranum" value={NGOData.caranum} type="text" placeholder="CARA number" onChange={handleChange} className="w-64 border border-gray-400 rounded-md p-2 mr-4 ml-0 focus:ring-2 focus:ring-[#5a8f7b]" />
                            {errors.caranum&&<p className="mt-1 text-red-500">{errors.caranum}</p>}
                        </div>
                    </div>
                </div>

                <div className="w-[88%] border border-gray-300 rounded-md bg-[#dbeaf3] shadow-sm my-2 mb-4">
                    <h3 className="text-lg underline font-semibold font-serif ml-4 mt-2">Verification Documents</h3>
                    <p className="font-serif ml-4 mt-1">file size limit: <b>2MB</b></p>
                    <p className="font-serif ml-4 mt-1">file type: <b>jpeg/jpg/png</b></p>
                    <div className="mt-4 flex flex-col ">
                        <label className="block ml-5 mb-1 text-md font-semibold text-[#3c3c3c]">Upload Government Registration Certificate</label>
                        <input name="reg_certimg"  type="file" accept="image/jpeg image/png image/jpg" onChange={handleChange} className="mt-2 ml-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-blue-700 file:hover:cursor-pointer" />
                        {errors.reg_certimg&&<p className="ml-5 mt-1 text-red-500">{errors.reg_certimg}</p>}
                    </div>
                    <div className="mt-4 flex flex-col ">
                        <label className="block ml-5 mb-1 text-md font-semibold text-[#3c3c3c]">Upload CARA Certificate</label>
                        <input name="cara_certimg"  type="file" accept="image/jpeg image/png image/jpg" onChange={handleChange} className="mt-2 ml-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-blue-700 file:hover:cursor-pointer" />
                        {errors.cara_certimg&&<p className="ml-5 mt-1 text-red-500">{errors.cara_certimg}</p>}
                    </div>
                    <div className="mt-4 flex flex-col mb-3">
                        <label className="block ml-5 mb-1 text-md font-semibold text-[#3c3c3c]">Upload Logo/Photo</label>
                        <input name="logoimg"  type="file" accept="image/jpeg image/png image/jpg" onChange={handleChange} className="mt-2 ml-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-blue-700 file:hover:cursor-pointer" />
                        {errors.logoimg&&<p className="ml-5 mt-1 text-red-500">{errors.logoimg}</p>}
                    </div>
                </div>

                <div className="w-[88%] p-3 border border-gray-300 rounded-md bg-[#f2e8cf] shadow-sm my-2 mb-4">
                    <h3 className="text-lg underline font-semibold font-serif ml-4 mt-2">About the NGO</h3>
                    <div className="mt-4 flex flex-col ">
                        <label className="block ml-5 mb-1 text-md font-semibold text-[#3c3c3c]">Brief Description of the NGO (max: 200 words)</label>
                        <textarea name="about" value={NGOData.about} type="text" placeholder="write about your ngo" onChange={handleChange} rows={10} maxLength={3000} className="block border border-gray-400 rounded-md p-2 mx-4 focus:ring-2 focus:ring-[#5a8f7b]" />
                        {errors.about&&<p className="ml-5 mt-1 text-red-500">{errors.about}</p>}
                    </div>
                    <div className="mt-4 flex flex-col ">
                        <label className="block ml-5 mb-1 text-md font-semibold text-[#3c3c3c]">Images to Highlight Your Facilities and Activities (optional)</label>
                        <p className="font-serif ml-4 mt-1">file size limit: <b>2MB</b></p>
                        <p className="font-serif ml-4 mt-1">file type: <b>jpeg/jpg/png</b></p>
                        <input name="galimg1"  type="file" accept="image/jpeg image/png image/jpg" onChange={handleChange} className="mt-4 ml-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-blue-700 file:hover:cursor-pointer" />
                        
                        {errors.galimg1&&<p className="ml-5 mt-1 text-red-500">{errors.galimg1}</p>}

                        <input name="galimg2"  type="file" accept="image/jpeg image/png image/jpg" onChange={handleChange} className="mt-4 ml-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-blue-700 file:hover:cursor-pointer" />
                        
                        {errors.galimg2&&<p className="ml-5 mt-1 text-red-500">{errors.galimg2}</p>}

                        <input name="galimg3" type="file" accept="image/jpeg image/png image/jpg" onChange={handleChange} className="mt-4 ml-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-blue-700 file:hover:cursor-pointer" />

                        {errors.galimg3&&<p className="ml-5 mt-1 text-red-500">{errors.galimg3}</p>}
                    </div>
                    <div className="mt-5 flex flex-col ">
                        <label className="block ml-5 mb-1 text-md font-semibold text-[#3c3c3c]">Testimonials/Quotes (optional)</label>
                        <textarea name="testimonial1" value={NGOData.testimonial1} onChange={handleChange} rows={3} maxLength={1000} placeholder="testimonial 1" className="w-60 border border-gray-400 rounded-md p-2 mx-4 focus:ring-2 focus:ring-[#5a8f7b]"></textarea>
                        <textarea name="testimonial2" value={NGOData.testimonial2} onChange={handleChange} rows={3} maxLength={1000} placeholder="testimonial 2" className="mt-3 w-60 border border-gray-400 rounded-md p-2 mx-4 focus:ring-2 focus:ring-[#5a8f7b]"></textarea>
                        <textarea name="testimonial3" value={NGOData.testimonial3} onChange={handleChange} rows={3} maxLength={1000} placeholder="testimonial 3" className="mt-3 w-60 border border-gray-400 rounded-md p-2 mx-4 focus:ring-2 focus:ring-[#5a8f7b]"></textarea>
                    </div>
                </div>

                <div className="w-[88%] p-3 border border-gray-300 rounded-md bg-[#dbeaf3] shadow-sm my-2 mb-4">
                    <h3 className="text-lg underline font-semibold font-serif ml-4 mt-2">Account Credentials</h3>
                    <div className="mt-2 flex flex-col">
                        <label className="block ml-5 mb-1 text-md font-semibold text-[#3c3c3c]">Password</label>
                        <PasswordInput name="pass" value={NGOData.pass} onChange={handleChange} placeholder="Set Password" className="w-full ml-2 border border-black rounded-md p-2 pr-10"/>
                        {errors.pass&&<p className="ml-5 mt-1 text-red-500">{errors.pass}</p>}
                        <p className="text-[#5c5c5c] font-medium ml-4 mt-0 text-xs">*Password must have at least 8 characters.</p>
                        <p className="text-[#5c5c5c] font-medium ml-4 mt-0 text-xs">*Must include a capital letter, a special character, and a number.</p>
                    </div>
                </div>
                <button className="mb-8 self-center text-base font-semibold font-serif mt-6 shadow-md border border-[#5a8f7b] text-white bg-[#5a8f7b] hover:bg-[#497667] rounded-md px-6 py-2 transition duration-300 ease-in-out" onClick={handleClick}>
                    Proceed for Review
                </button>
            </div>
        </div>
    );
    
}
export default SignupNgo;