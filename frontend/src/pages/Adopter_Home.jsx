import { useEffect, useState } from "react";
import MainLayout from "../components/Common_Components/MainLayout";
import NGOcard from "../components/Adopter_Home_c/NGOcard";

function Adopter_Home() {
  const [ngos, setNgos] = useState([]);
  const [filteredNgos, setFilteredNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [cityFilter, setCityFilter] = useState("All");
  const [stateFilter, setStateFilter] = useState("All");
  const [searchName, setSearchName] = useState("");

  // Dropdown options
  const [cities, setCities] = useState(["All"]);
  const [states, setStates] = useState(["All"]);

  // Fetch NGOs once on load
  useEffect(() => {
    fetch("http://localhost:5000/api/ngos")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch NGO data");
        return res.json();
      })
      .then((data) => {
        setNgos(data);
        setFilteredNgos(data);

        // Extract unique cities and states
        const uniqueCities = ["All", ...new Set(data.map((ngo) => ngo.city).filter(Boolean))];
        const uniqueStates = ["All", ...new Set(data.map((ngo) => ngo.state).filter(Boolean))];

        setCities(uniqueCities);
        setStates(uniqueStates);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load NGO data.");
        setLoading(false);
      });
  }, []);

  // Apply filters whenever cityFilter, stateFilter, or searchName changes
  useEffect(() => {
    let filtered = ngos;

    if (cityFilter !== "All") {
      filtered = filtered.filter((ngo) => ngo.city === cityFilter);
    }

    if (stateFilter !== "All") {
      filtered = filtered.filter((ngo) => ngo.state === stateFilter);
    }

    if (searchName.trim() !== "") {
      filtered = filtered.filter((ngo) =>
        ngo.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    setFilteredNgos(filtered);
  }, [cityFilter, stateFilter, searchName, ngos]);

  return (
    <MainLayout>
      <div className="h-auto w-auto p-2 m-3 text-center">
        <h1 className="text-2xl font-bold capitalize font-serif">
          Choose your nearest NGO!
        </h1>

        {/* Filters */}
        <div className="mt-2 flex space-x-12 justify-center items-center">
          {/* City Filter */}
          <div>
            <label className="mr-2 font-medium font-serif text-lg">Filter by City:</label>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="border rounded px-2 py-1 font-serif"
            >
              {cities.map((city, idx) => (
                <option key={idx} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* State Filter */}
          <div>
            <label className="mr-2 font-medium font-serif text-lg">Filter by State:</label>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="border rounded px-2 py-1 font-serif"
            >
              {states.map((state, idx) => (
                <option key={idx} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Search by Name */}
          <div>
            <span className="text-lg font-serif">Search: </span>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Search by NGO name"
              className="border border-black rounded px-2 py-1"
            />
          </div>
        </div>
      </div>

      {/* Loading & Error States */}
      {loading && <p className="text-center">Loading NGOs...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* NGO Cards */}
      <div
        className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4"
        style={{ backgroundColor: "#E3F2FD" }}
      >
        {!loading && filteredNgos.length > 0 ? (
          filteredNgos.map((ngo) => (
            <NGOcard
              key={ngo._id}
              id={ngo._id}
              image={ngo.image}
              name={ngo.name}
              location={ngo.location}
            />
          ))
        ) : (
          !loading && <p className="col-span-full text-center text-gray-500">No NGOs found.</p>
        )}
      </div>
    </MainLayout>
  );
}

export default Adopter_Home;
