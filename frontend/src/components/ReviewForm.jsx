import LabelConfig from "./Home_Components/Help_Components/LabelConfig";
function ReviewForm({ formData, role, onEdit, onSubmit }) {
  return (
    <div className="font-serif min-h-screen bg-[#F9F4F1] py-5 px-4">
      <div className="mt-5 max-w-3xl mx-auto space-y-10">
        <div className="p-4 flex items-center justify-center bg-[#E7D4C6] rounded-xl h-16">
         <h2 className="text-4xl font-bold text-center">{role === "adopter" ? "Adopter" : "NGO"} Form Review</h2>
        </div>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-2">
      

      <div className="space-y-4">
        {Object.entries(formData).map(([key, value]) => (
          <div
            key={key}
            className="grid grid-cols-3 gap-4 items-center border-b p-4 bg-gray-50"
          >
            <div className="font-semibold capitalize col-span-1">{LabelConfig[key]}</div>
            <div className="col-span-2">{value instanceof File ? (
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
  value || <span className="text-gray-400 italic">Not provided</span>
)}
</div>
          </div>
        ))}
      </div>

      <div className="flex justify-between  mt-8">
        <button
          onClick={onEdit}
          className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-xl shadow-md"
        >
          Edit
        </button>
        <button
          onClick={onSubmit}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl shadow-md"
        >
          Submit
        </button>
      </div>
    </div>
      </div>
    </div>

  );
}

export default ReviewForm;
