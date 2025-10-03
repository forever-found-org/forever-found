import { useEffect, useState } from "react";
import MainLayout from "../components/Common_Components/MainLayout";
import NGOcard from "../components/Adopter_Home_c/NGOcard";

function Adopter_Home() {
  const [ngos, setNgos] = useState([]);
  const [filteredNgos, setFilteredNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cityFilter, setCityFilter] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/api/ngos")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch NGO data");
        return res.json();
      })
      .then((data) => {
        setNgos(data);
        setFilteredNgos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load NGO data.");
        setLoading(false);
      });
  }, []);

  // Filter NGOs whenever cityFilter changes
  useEffect(() => {
    if (cityFilter === "All") {
      setFilteredNgos(ngos);
    } else {
      setFilteredNgos(ngos.filter((ngo) => ngo.city === cityFilter));
    }
  }, [cityFilter, ngos]);

  // Get unique cities
  const cities = ["All", ...new Set(ngos.map((ngo) => ngo.city).filter(Boolean))];

  return (
    <MainLayout>
      <div className="h-auto w-auto p-2 m-3 text-center">
        <h1 className="text-2xl font-bold capitalize font-serif">
          Choose your nearest NGO!
        </h1>

        {/* City Filter */}
        <div className="mt-2">
          <label className="mr-2 font-medium">Filter by City:</label>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {cities.map((city, idx) => (
              <option key={idx} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p className="text-center">Loading NGOs...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4" style={{ backgroundColor: "#E3F2FD" }}>
        {!loading &&
          filteredNgos.map((ngo) => (
            <NGOcard
              key={ngo._id}
              id={ngo._id}
              image={ngo.image}
              name={ngo.name}
              location={ngo.location}
            />
          ))}
      </div>
    </MainLayout>
  );
}

export default Adopter_Home;
