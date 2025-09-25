import { useState } from "react";
import { useParams } from "react-router-dom";
import ChildCard from "./Childcard";
import Child_Details from "./Child_Details"; // your modal component

function Preferences() {
  const { id: ngoId } = useParams(); // get ngoId from URL
  const [gender, setGender] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  //const [religion, setReligion] = useState("");
  const [children, setChildren] = useState([]); // store results
  const [error, setError] = useState("");
  const [selectedChildId, setSelectedChildId] = useState(null);

  const handleFindMatch = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/children/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ngoId, gender, ageGroup }),
      });

      if (!response.ok) throw new Error("Failed to fetch matches");
      const data = await response.json();
      setChildren(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Could not fetch matches. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center bg-[#F3E8FF] min-h-screen py-10 px-4">
      {/* Header */}
      <div className="w-full max-w-xl text-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-700 mb-2">
          Give your preferences.
        </h1>
        <h2 className="text-2xl font-serif text-gray-600">Choose your child!</h2>
      </div>

      {/* Filter Section */}
      <div className="w-full max-w-xl bg-[#FDF6F9] border border-gray-200 rounded-2xl p-6 shadow-md">
        {/* Labels */}
        <div className="flex justify-around mb-4 px-4 text-gray-700 font-serif font-semibold">
          <label>Gender</label>
          <label>Age Group</label>
          {/* <label>Religion</label> */}
        </div>

        {/* Dropdowns */}
        <div className="flex justify-between gap-4 mb-6 px-4">
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-white shadow-sm font-serif border border-gray-300"
          >
            <option value="">Any</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Others</option>
          </select>

          <select
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-white shadow-sm font-serif border border-gray-300"
          >
            <option value="">Any</option>
            <option value="2-4">2-4</option>
            <option value="5-8">5-8</option>
            <option value="9-11">9-11</option>
            <option value="12-18">12-18</option>
          </select>

          {/* <select
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-white shadow-sm font-serif border border-gray-300"
          >
            <option value="">Any</option>
            <option value="Hindu">Hindu</option>
            <option value="Muslim">Muslim</option>
            <option value="Sikh">Sikh</option>
            <option value="Christian">Christian</option>
          </select> */}
        </div>

        {/* Button */}
        <div className="text-center">
          <button
            onClick={handleFindMatch}
            className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-serif font-semibold transition duration-200"
          >
            Find Match
          </button>
        </div>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Matches Header */}
      <div className="w-full h-auto mt-5 p-3 text-center bg-white">
        <h1 className="text-3xl font-bold font-serif uppercase">Matches Found</h1>
      </div>

      {/* Results */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-6 w-full">
        {children.length > 0 ? (
          children.map((child) => (
            <div
              key={child._id || child.id}
              onClick={() => setSelectedChildId(child._id)}
            >
              <ChildCard
                name={child.name}
                age={child.age}
                gender={child.gender}
                //religion={child.religion}
                adoptionStatus={child.adoptionStatus}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic mt-4">No matches found yet.</p>
        )}
      </div>

      {/* Child Details Modal */}
      {selectedChildId && (
        <Child_Details
          childId={selectedChildId}
          onClose={() => setSelectedChildId(null)}
        />
      )}
      <button>Request Meet</button>
    </div>
  );
}

export default Preferences;
