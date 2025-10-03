import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../components/Common_Components/MainLayout";
import Preferences from "../components/Ngodetails_c/preferences";

function NgoDetails() {
  const { id } = useParams();
  const [ngoData, setNgoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/ngos/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch NGO details");
        return res.json();
      })
      .then((data) => {
        setNgoData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load NGO details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center">Loading NGO details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!ngoData) return <p className="text-center">No data found.</p>;


  return (
    <MainLayout>
      <div className="py-6 font-bold font-serif text-4xl uppercase text-center">
        <p>{ngoData.name}</p>
      </div>
      <div className="max-w-full mx-auto p-6 font-serif bg-purple-50 pl-32">
        {/* Basic Details */}
        <section className="max-w-5xl bg-[#e8f4fc] shadow-md rounded-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Basic Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <p><strong>Location:</strong> {ngoData.location}</p>
            <p><strong>City:</strong> {ngoData.city}</p>
            <p><strong>State:</strong> {ngoData.state}</p>
            <p><strong>Year of Establishment:</strong> {ngoData.yearOfEstablishment}</p>
            <p><strong>Website:</strong> <a href={ngoData.website} className="text-blue-500">{ngoData.website}</a></p>
            <p><strong>Contact:</strong> {ngoData.contact}</p>
            <p><strong>Email:</strong> {ngoData.email}</p>
          </div>
        </section>

        {/* Verification */}
        <section className="max-w-5xl bg-amber-50 shadow-md rounded-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Verification</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            <p><strong>NGO Registration No.:</strong> {ngoData.registrationNumber || "N/A"}</p>
            <p><strong>CARA Registration No.:</strong> {ngoData.caraRegistrationNumber || "N/A"}</p>
            <p>
              <strong>Verified:</strong> {ngoData.verified ? (
                <span className="text-green-600 font-semibold">✔ Yes</span>
              ) : (
                <span className="text-red-600 font-semibold">✘ No</span>
              )}
            </p>
          </div>
        </section>

        {/* About */}
        <section className="max-w-5xl bg-[#e8f4fc] shadow-md rounded-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">About the NGO</h2>
          <p className="text-gray-700 mb-4">{ngoData.about}</p>
          <p className="font-semibold text-gray-800">
            Number of children under care: {ngoData.numberOfChildren || 0}
          </p>
        </section>

        {/* Gallery & Testimonials */}
        <section className="max-w-5xl bg-amber-50 shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">Gallery & Testimonials</h2>

          {/* Gallery */}
          {ngoData.gallery?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {ngoData.gallery.map((img, idx) =>{
                const finalUrl = img.startsWith("http")? img: `http://localhost:5000/ngo_gallery/${img}`;
              return (<img
                  key={idx}
                  src={finalUrl}
                  alt={`Gallery ${idx}`}
                  className="rounded-xl w-full h-60 object-cover shadow-md"
                />)
              })}
            </div>
          ) : (
            <p className="text-gray-500 italic mb-6">No images available.</p>
          )}

          {/* Testimonials */}
          {ngoData.testimonials?.length > 0 ? (
            <div className="space-y-4">
              {ngoData.testimonials.map((t, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-xl shadow-sm">
                  <p className="text-gray-700 italic">"{t.feedback || t.message}"</p>
                  <p className="mt-2 text-sm text-gray-600">- {t.name}, {t.role}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No testimonials yet.</p>
          )}
        </section>
      </div>
      <Preferences />
    </MainLayout>
  );
}

export default NgoDetails;
