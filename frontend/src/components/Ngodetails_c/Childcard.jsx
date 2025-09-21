function ChildCard({ name, age, gender, adoptionStatus }) {
  return (
    <div className="font-serif bg-[#FDF6F9] rounded-xl shadow-md p-4 flex flex-col items-start hover:shadow-xl hover:scale-105 hover:cursor-pointer transition-transform duration-200">
      <h3 className="text-lg font-bold font-serif mb-1">{name}</h3>
      <p className="text-gray-600 font-serif">Age: {age}</p>
      <p className="text-gray-600 font-serif">Gender: {gender}</p>
    {/* <p className="text-gray-600 font-serif">Religion: {religion}</p> */}
      <p
        className={`mt-2 font-semibold ${
          adoptionStatus === "Available" ? "text-green-600" : "text-red-600"
        }`}
      >
        {adoptionStatus}
      </p>
      <p className="text-blue-600 mt-1">Learn more</p>
    </div>
  );
}

export default ChildCard;
