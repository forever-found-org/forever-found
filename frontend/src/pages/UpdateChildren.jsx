import { useState, useEffect } from "react";

function UpdateChildren({ child, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    _id: "",
    ngoId: "",
    name: "",
    age: "",
    gender: "",
    dateOfBirth: "",
    healthStatus: "",
    educationLevel: "",
    adoptionStatus: "",
    gallery: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (child) {
      setFormData({
        _id: child._id,
        ngoId: child.ngoId,
        name: child.name,
        age: child.age,
        gender: child.gender,
        dateOfBirth: child.dateOfBirth?.split("T")[0] || "",
        healthStatus: child.healthStatus || "",
        educationLevel: child.educationLevel || "",
        adoptionStatus: child.adoptionStatus,
        gallery: child.gallery || [],
      });
      setLoading(false);
    }
  }, [child]);

  const handleMedicalChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, ...files],
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formDataToSend = new FormData();
    formDataToSend.append("age", formData.age);
    formDataToSend.append("healthStatus", formData.healthStatus);
    formDataToSend.append("educationLevel", formData.educationLevel);

    // Append only new medical images
    formData.gallery.slice(2).forEach((file) => {
      if (file instanceof File) {
        formDataToSend.append("gallery", file);
      }
    });

    const res = await fetch(`/api/children/update/${child._id}`, {
      method: "PUT",
      body: formDataToSend,
    });

    if (!res.ok) throw new Error("Update failed");

    const data = await res.json();
    const updatedChild = data.child; // <- extract the actual child object

    // Update parent state
    onUpdate(updatedChild);

    // Update local gallery to reflect new images immediately
    setFormData((prev) => ({
      ...prev,
      gallery: updatedChild.gallery || prev.gallery,
    }));

    alert("Child updated successfully!");
  } catch (err) {
    console.error(err);
    alert("Error updating child");
  }
};


  if (loading) return <p>Loading...</p>;

  const getImageSrc = (file) =>
    typeof file === "string"
      ? `/multer_uploads/${file}?t=${Date.now()}` // add timestamp to avoid cache
      : URL.createObjectURL(file);

  return (
    <div className="max-w-full p-6 bg-gradient-to-br from-yellow-50 via-orange-100 to-red-50 rounded-2xl shadow-lg relative font-serif overflow-y-auto max-h-[85vh]">
      <h2 className="text-3xl font-bold text-orange-700 mb-6 text-center uppercase">
        Update Child Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Read-Only Info */}
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">Child ID:</span> {formData._id}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">NGO ID:</span> {formData.ngoId}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">Name:</span> {formData.name}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">Gender:</span> {formData.gender}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">Date of Birth:</span> {formData.dateOfBirth}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">Adoption Status:</span> {formData.adoptionStatus}
          </p>
        </div>

        {/* Editable Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-xl border border-orange-200">
            <label className="block text-gray-600 font-semibold mb-1">
              Age <span className="text-sm text-blue-500">(Editable)</span>
            </label>
            <input
              type="number"
              min={formData.age}
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition"
              placeholder="Enter age"
              required
            />
          </div>
          <div className="bg-white p-4 rounded-xl border border-orange-200">
            <label className="block text-gray-600 font-semibold mb-1">
              Health Status <span className="text-sm text-blue-500">(Editable)</span>
            </label>
            <input
              type="text"
              value={formData.healthStatus}
              onChange={(e) => setFormData({ ...formData, healthStatus: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition"
              placeholder="Enter health status"
            />
          </div>
          <div className="bg-white p-4 rounded-xl border border-orange-200">
            <label className="block text-gray-600 font-semibold mb-1">
              Education Level <span className="text-sm text-blue-500">(Editable)</span>
            </label>
            <input
              type="text"
              value={formData.educationLevel}
              onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition"
              placeholder="Enter education level"
            />
          </div>
        </div>

        {/* Gallery Section */}
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
          <h3 className="text-lg font-bold text-blue-500 mb-4 uppercase">Gallery Documents</h3>
          <div className="flex gap-4 flex-wrap mb-4">
            {formData.gallery[0] && (
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">CWC Certificate</p>
                <img src={getImageSrc(formData.gallery[0])} alt="CWC" className="w-32 h-32 object-cover rounded-lg border" />
              </div>
            )}
            {formData.gallery[1] && (
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Police Verification</p>
                <img src={getImageSrc(formData.gallery[1])} alt="Police" className="w-32 h-32 object-cover rounded-lg border" />
              </div>
            )}
            {formData.gallery.slice(2).map((file, idx) => (
              <div className="text-center" key={idx}>
                <p className="text-sm text-gray-500 mb-1">Medical Certificate {idx + 1}</p>
                <img src={getImageSrc(file)} alt={`Medical ${idx + 1}`} className="w-32 h-32 object-cover rounded-lg border" />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-gray-600 font-semibold mb-2">Upload Medical Certificates </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleMedicalChange}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-100 focus:border-orange-400 transition"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-6 mt-6">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white font-bold py-3 rounded-xl hover:bg-orange-500 transition"
          >
            Update
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateChildren;
