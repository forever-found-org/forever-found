import { useState } from "react";
import LabelConfig from "./Home_Components/Help_Components/LabelConfig";

function ReviewForm({ formData, role, onEdit, onSubmit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return; // prevent double click

    try {
      setIsSubmitting(true);
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-serif min-h-screen bg-[#F9F4F1] py-5 px-4">
      <div className="mt-5 max-w-3xl mx-auto space-y-10">
        <div className="p-4 flex items-center justify-center bg-[#E7D4C6] rounded-xl h-16">
          <h2 className="text-4xl font-bold text-center">
            {role === "adopter" ? "Adopter" : "NGO"} Form Review
          </h2>
        </div>

        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-2">
          <div className="space-y-4">
            {Object.entries(formData)
              .filter(([key]) => key !== "confirmPass")
              .map(([key, value]) => (
                <div
                  key={key}
                  className="grid grid-cols-3 gap-4 items-start border-b p-4 bg-gray-50"
                >
                  <div className="font-semibold capitalize col-span-1">
                    {LabelConfig[key] || key}
                  </div>

                  <div className="col-span-2">
                    {/* TESTIMONIALS */}
                    {key === "testimonials" ? (
                      value.length > 0 ? (
                        <div className="space-y-3">
                          {value.map((t, index) => (
                            <div
                              key={index}
                              className="border rounded-lg p-3 bg-white shadow-sm"
                            >
                              <p className="font-semibold text-gray-800">
                                {t.name || "Anonymous"}
                              </p>
                              <p className="text-sm text-gray-600">
                                {t.role || "Role not specified"}
                              </p>
                              <p className="mt-1 text-gray-700">
                                {t.feedback || "No feedback provided"}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">
                          Not provided
                        </span>
                      )
                    ) : Array.isArray(value) ? (
                      value.length > 0 ? (
                        <div className="flex gap-2 flex-wrap">
                          {value.map((file, index) =>
                            file instanceof File &&
                            file.type.startsWith("image/") ? (
                              <img
                                key={index}
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="h-20 w-20 object-cover rounded"
                              />
                            ) : (
                              <span key={index}>
                                {file?.name || "File"}
                              </span>
                            )
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">
                          Not provided
                        </span>
                      )
                    ) : value instanceof File ? (
                      value.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(value)}
                          alt={value.name}
                          className="h-20 w-20 object-cover rounded"
                        />
                      ) : (
                        <span>{value.name}</span>
                      )
                    ) : (
                      value || (
                        <span className="text-gray-400 italic">
                          Not provided
                        </span>
                      )
                    )}
                  </div>
                </div>
              ))}
          </div>

          {/* Processing Indicator */}
          {isSubmitting && (
            <div className="mt-6 text-center text-gray-600 font-medium">
              Processing your submission, please wait...
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={onEdit}
              disabled={isSubmitting}
              className={`px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-xl shadow-md ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Edit
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl shadow-md ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
