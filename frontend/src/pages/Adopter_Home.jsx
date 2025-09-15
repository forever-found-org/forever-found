import { useEffect, useState } from "react";
import MainLayout from "../components/Common_Components/MainLayout";
import NGOcard from "../components/Adopter_Home_c/NGOcard";

function Adopter_Home() {
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch NGO data from backend
    fetch("http://localhost:5000/api/ngos")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch NGO data");
        return res.json();
      })
      .then((data) => {
        setNgos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load NGO data.");
        setLoading(false);
      });
  }, []);

  return (
    <MainLayout>
      <div className="h-auto w-auto p-2 m-3 text-center">
        <h1 className="text-2xl font-bold capitalize font-serif">
          Choose your nearest NGO!
        </h1>
      </div>

      {loading && <p className="text-center">Loading NGOs...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div
        className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4"
        style={{ backgroundColor: "#E3F2FD" }}
      >
        {!loading &&
          ngos.map((ngo, index) => (
            <NGOcard
              key={index}
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