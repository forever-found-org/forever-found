import React from "react";

function Confirm({ formData, onCancel, onConfirm }) {
  // Fields to skip in text section
  const skipFields = ["adoptionStatus", "adopterId", "gallery"];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50">
      <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-100 
                      p-8 rounded-2xl shadow-2xl max-w-xl w-full font-serif 
                      border border-amber-200">
        
        {/* Title */}
        <h3 className="text-2xl font-bold mb-6 text-center text-amber-800 drop-shadow-sm">
          Confirm Child Details
        </h3>

        <div className="flex flex-col gap-6 max-h-[60vh] overflow-y-auto">
          {/* Text Details */}
          <div className="bg-white rounded-xl shadow-inner p-5 space-y-3">
            {Object.entries(formData)
              .filter(([key]) => !skipFields.includes(key))
              .map(([key, value]) => (
                <div key={key} className="flex justify-between items-start border-b border-amber-100 pb-2">
                  <span className="font-semibold text-amber-700 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span className="text-gray-700 text-right">
                    {value || "-"}
                  </span>
                </div>
              ))}
          </div>

          {/* Gallery Preview */}
          {formData.gallery && formData.gallery.length > 0 && (
            <div className="bg-white rounded-xl shadow-inner p-5">
              <span className="font-semibold text-amber-700 mb-2 block">Gallery</span>
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                {formData.gallery.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-24 h-24 object-cover rounded-md border border-amber-200"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-xl border border-gray-300 
                       bg-gray-200 text-gray-700 font-semibold 
                       hover:bg-gray-300 hover:shadow-md transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-xl bg-amber-600 text-white font-semibold 
                       hover:bg-amber-700 hover:shadow-lg transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
