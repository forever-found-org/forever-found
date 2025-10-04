import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function NgoProfile() {
  const { id } = useParams(); // NGO id from URL
  const navigate = useNavigate();
  const [ngo, setNgo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNgo() {
      try {
        const res = await fetch(`http://localhost:5000/api/ngos/${id}`);
        if (!res.ok) throw new Error("Failed to fetch NGO details");
        const data = await res.json();
        setNgo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchNgo();
  }, [id]);

  if (loading)
    return <p className="text-center mt-20 text-xl font-serif font-semibold text-gray-700">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-20 text-xl font-serif font-semibold text-red-500">{error}</p>
    );
  if (!ngo)
    return (
      <p className="text-center mt-20 text-xl font-serif font-semibold text-gray-700">No NGO data available.</p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 py-10 px-4 font-serif">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8 border-b pb-8 mb-8">
          <div className="w-36 h-36 bg-green-200 text-green-800 rounded-full flex items-center justify-center text-5xl font-bold">
            {ngo.name.charAt(0).toUpperCase()}
          </div>
          <div className="mt-4 md:mt-0">
            <h2 className="text-3xl md:text-4xl font-bold capitalize text-green-900">{ngo.name}</h2>
            <p className="text-lg md:text-xl text-gray-600 mt-2">{ngo.email}</p>
            <p className="text-md text-gray-500">{ngo.location}</p>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 text-gray-800 text-lg md:text-xl">
          <p><span className="font-semibold text-green-700">City:</span> {ngo.city}</p>
          <p><span className="font-semibold text-green-700">State:</span> {ngo.state}</p>
          <p><span className="font-semibold text-green-700">Website:</span> <a href={ngo.website} target="_blank" className="underline text-blue-600">{ngo.website}</a></p>
          <p><span className="font-semibold text-green-700">Contact:</span> {ngo.contact}</p>
          <p><span className="font-semibold text-green-700">Year Established:</span> {ngo.yearOfEstablishment}</p>
          <p><span className="font-semibold text-green-700">NGO Registration No:</span> {ngo.ngoRegistrationNumber}</p>
          <p><span className="font-semibold text-green-700">CARA Registration No:</span> {ngo.caraRegistrationNumber}</p>
          <p><span className="font-semibold text-green-700">Verified:</span> {ngo.verified ? "Yes ✅" : "No ❌"}</p>
          <p className="md:col-span-2"><span className="font-semibold text-green-700">About:</span> {ngo.about}</p>
          <p><span className="font-semibold text-green-700">Number of Children:</span> {ngo.numberOfChildren}</p>
        </div>

        {/* Gallery */}
        {ngo.gallery && ngo.gallery.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-4 text-green-800">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ngo.gallery.map((img, idx) => (
                <img key={idx} src={`/ngo_gallery/${img}`} alt={`Gallery ${idx}`} className="rounded-lg shadow-md" />
              ))}
            </div>
          </div>
        )}

        {/* Testimonials */}
        {ngo.testimonials && ngo.testimonials.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-4 text-green-800">Testimonials</h3>
            <div className="space-y-4">
              {ngo.testimonials.map((t, idx) => (
                <div key={idx} className="p-4 border rounded-md bg-green-50">
                  <p className="font-semibold">{t.name}</p>
                  <p className="font-semibold">({t.role})</p>
                  <p>{t.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back & Edit Buttons */}
        <div className="flex items-center justify-between mt-10">
          <button
            onClick={() => navigate(`/ngo-home/${id}`)}
            className="px-8 py-3 bg-green-600 text-white font-bold text-lg rounded-lg hover:bg-green-700 transition-colors"
          >
            Back To Home
          </button>
          <button
            onClick={() => navigate(`/ngo-home/${id}/profile/edit`)}
            className="px-8 py-3 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
