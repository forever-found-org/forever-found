import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Validator from "../components/InsertChild/Validator";
import Confirm from "../components/InsertChild/Confirm";

function InsertChildren() {
  const [formData, setFormData] = useState({
    ngoId: "",
    name: "",
    age: "",
    gender: "",
    dateOfBirth: "",
    healthStatus: "",
    educationLevel: "",
    gallery: [],
    adoptionStatus: "Available",
    adopterId: ""
  });

  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGalleryChange = (e, index) => {
  const file = e.target.files[0];
  setFormData((prev) => {
    const updatedGallery = [...prev.gallery];
    updatedGallery[index] = file; // put file in correct slot
    return { ...prev, gallery: updatedGallery };
  });
};
  const ngoData = JSON.parse(localStorage.getItem("ngo")) || {};
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/ngo-home/${ngoData.id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validErrors = await Validator(formData);
    setErrors(validErrors);

    if (Object.keys(validErrors).length === 0) setShowConfirm(true);
  };

  const handleConfirm = async () => {
    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("age", formData.age.toString());
    submitData.append("gender", formData.gender);
    submitData.append("ngoId", formData.ngoId);
    submitData.append("healthStatus", formData.healthStatus);
    submitData.append("educationLevel", formData.educationLevel);
    submitData.append("dateOfBirth", formData.dateOfBirth);

    formData.gallery.forEach(file => submitData.append("gallery", file));

    try {
      const response = await fetch("/api/children/create", {
        method: "POST",
        body: submitData
      });

      if (!response.ok) {
        const error = await response.json();
        alert(`Error: ${error.message}`);
        return;
      }

      const data = await response.json();
      alert("Child inserted successfully!");
      console.log(data.child);

      setShowConfirm(false);
      setFormData({
        ngoId: "",
        name: "",
        age: "",
        gender: "",
        dateOfBirth: "",
        healthStatus: "",
        educationLevel: "",
        gallery: [],
        adoptionStatus: "Available",
        adopterId: ""
      });
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred.");
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 rounded-3xl shadow-2xl 
                    bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-100 
                    font-serif">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold mb-8 ml-32 text-center text-amber-800 drop-shadow-sm">
          CHILD RECORD
        </h2>
        <button onClick={handleClick} className="bg-amber-600 border border-amber-600 rounded-md p-2 mb-6 font-semibold hover:bg-amber-700 hover:shadow-lg hover:scale-105">Home</button>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* NGO ID */}
        <div>
          <label className="block ml-3 text-sm font-bold text-amber-600">NGO ID</label>
          <input
            type="text"
            name="ngoId"
            placeholder="NGO ID"
            value={formData.ngoId}
            onChange={handleChange}
            className="w-full p-4 border border-amber-200 rounded-xl bg-white shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition duration-300 hover:shadow-md"
          />
          {errors.ngoId && <p className="text-red-600 ml-4 text-sm">{errors.ngoId}</p>}
        </div>

        {/* Name */}
        <div>
          <label className="block ml-3 -mt-2 text-sm font-bold text-amber-600">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 border border-amber-200 rounded-xl bg-white shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition duration-300 hover:shadow-md"
          />
          {errors.name && <p className="text-red-600 ml-4 text-sm">{errors.name}</p>}
        </div>

        {/* Age */}
        <div>
          <label className="block ml-3 text-sm font-bold text-amber-600" >Age</label>
          <input
            type="number"
            min="2"
            max="16"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-4 border border-amber-200 rounded-xl bg-white shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition duration-300 hover:shadow-md"
          />
          {errors.age && <p className="text-red-600 ml-4 text-sm">{errors.age}</p>}
        </div>

        {/* Gender */}
        <div>
          <label className="block ml-3 text-sm font-bold text-amber-600">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-4 border border-amber-200 rounded-xl bg-white shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition duration-300 hover:shadow-md"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-600 ml-4 text-sm">{errors.gender}</p>}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block ml-3 text-sm font-bold text-amber-600">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full p-4 border border-amber-200 rounded-xl bg-white shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition duration-300 hover:shadow-md"
          />
          {errors.dateOfBirth && <p className="text-red-600 ml-4 text-sm">{errors.dateOfBirth}</p>}
        </div>

        {/* Health Status */}
        <div>
          <label className="block ml-3 text-sm font-bold text-amber-600">Health Status</label>
          <input
            type="text"
            name="healthStatus"
            placeholder="Health Status"
            value={formData.healthStatus}
            onChange={handleChange}
            className="w-full p-4 border border-amber-200 rounded-xl bg-white shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition duration-300 hover:shadow-md"
          />
          {errors.healthStatus && <p className="text-red-600 ml-4 text-sm">{errors.healthStatus}</p>}
        </div>

        {/* Education Level */}
        <div>
          <label className="block ml-3 text-sm font-bold text-amber-600">Education Level</label>
          <input
            type="text"
            name="educationLevel"
            placeholder="Education Level"
            value={formData.educationLevel}
            onChange={handleChange}
            className="w-full p-4 border border-amber-200 rounded-xl bg-white shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition duration-300 hover:shadow-md"
          />
          {errors.educationLevel && <p className="text-red-600 ml-4 text-sm">{errors.educationLevel}</p>}
        </div>

        {/* Gallery */}
        <div>
            <div>
                <label className="block ml-3 text-sm font-bold text-amber-600">Upload CWC Image</label>
                <input type="file" name="gallery" onChange={(e) => handleGalleryChange(e, 0)} className="w-full p-3 border border-amber-200 rounded-xl bg-white shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition duration-300 hover:shadow-md"/>
                {errors.cwc && <p className="text-red-600 ml-4 text-sm">{errors.cwc}</p>}
            </div>
            <div className="my-4">
                <label className="block ml-3 text-sm font-bold text-amber-600">Upload Police Verification Image</label>
                <input type="file" name="gallery" onChange={(e) => handleGalleryChange(e, 1)} className="w-full p-3 border border-amber-200 rounded-xl bg-white shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition duration-300 hover:shadow-md"/>
                {errors.police && <p className="text-red-600 ml-4 text-sm">{errors.police}</p>}
            </div>
            <div>
                <label className="block ml-3 text-sm font-bold text-amber-600">Upload Medical Certificate</label>
                <input type="file" name="gallery" onChange={(e) => handleGalleryChange(e, 2)} className="w-full p-3 border border-amber-200 rounded-xl bg-white shadow-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition duration-300 hover:shadow-md"/>
            </div>
        </div>
        

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-amber-600 text-white py-3 px-6 rounded-xl hover:bg-amber-700 transition duration-300 shadow-md hover:shadow-lg"
        >
          Insert Child
        </button>
      </form>

      {showConfirm && <Confirm formData={formData} onCancel={handleCancel} onConfirm={handleConfirm} />}
    </div>
  );
}

export default InsertChildren;
