import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AdopterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [adopter, setAdopter] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAadhaar, setShowAadhaar] = useState(false);
  const [aadhaarData, setAadhaarData] = useState(null);
  const [adoptedChildren, setAdoptedChildren] = useState([]);

  const [blockReason, setBlockReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [adopterRes, meetingsRes, adoptedRes] = await Promise.all([
          fetch(`/api/admin/adopters/${id}`, { credentials: "include" }),
          fetch(`/api/admin/adopters/${id}/meetings`, { credentials: "include" }),
          fetch(`/api/admin/adopters/${id}/adopted-children`, {
            credentials: "include",
          }),
        ]);

        if (!adopterRes.ok || !meetingsRes.ok || !adoptedRes.ok) {
          throw new Error();
        }

        const adopterData = await adopterRes.json();
        const meetingsData = await meetingsRes.json();
        const adoptedChildrenData = await adoptedRes.json();

        if (isMounted) {
          setAdopter(adopterData);
          setMeetings(meetingsData);
          setAdoptedChildren(adoptedChildrenData);
        }
      } catch {
        console.error("Failed to load adopter data");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [id]);

  /* ---------- Aadhaar ---------- */
  const fetchAadhaar = async () => {
    if (!window.confirm("This contains sensitive Aadhaar data. Continue?"))
      return;

    try {
      const res = await fetch(`/api/admin/adopters/${id}/aadhaar`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setAadhaarData(data);
      setShowAadhaar(true);
    } catch {
      alert("Failed to load Aadhaar details");
    }
  };

  /* ---------- BLOCK / UNBLOCK ---------- */
  const handleBlock = async () => {
    if (!blockReason.trim()) return;

    try {
      setActionLoading(true);

      const res = await fetch(`/api/admin/adopters/${id}/block`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: blockReason }),
      });

      if (!res.ok) throw new Error();

      const updated = await fetch(`/api/admin/adopters/${id}`, {
        credentials: "include",
      }).then((r) => r.json());

      setAdopter(updated);
      setBlockReason("");
    } catch {
      alert("Failed to block adopter");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUnblock = async () => {
    try {
      setActionLoading(true);

      const res = await fetch(`/api/admin/adopters/${id}/unblock`, {
        method: "PATCH",
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      const updated = await fetch(`/api/admin/adopters/${id}`, {
        credentials: "include",
      }).then((r) => r.json());

      setAdopter(updated);
    } catch {
      alert("Failed to unblock adopter");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!adopter) return <p>Adopter not found</p>;

  return (
    <>
      {/* ================= STICKY NAVBAR ================= */}
      <div className="fixed top-0 left-0 w-full z-50 bg-[#fffdfc] border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center gap-4">
          <button
            onClick={() => navigate("/admin/manage-adopters")}
            className="px-3 py-1 border rounded bg-[#fff0e5]"
          >
            ← Back
          </button>

          <nav className="flex flex-wrap gap-3 text-sm font-semibold justify-center ml-40">
            <a href="#admin" className="px-3 py-1 border rounded">Admin</a>
            <a href="#personal" className="px-3 py-1 border rounded">Personal</a>
            <a href="#contact" className="px-3 py-1 border rounded">Contact</a>
            <a href="#family" className="px-3 py-1 border rounded">Family</a>
            <a href="#medical" className="px-3 py-1 border rounded">Medical</a>
            <a href="#meetings" className="px-3 py-1 border rounded">Meetings</a>
            <a href="#adoptions" className="px-3 py-1 border rounded">Adoptions</a>
          </nav>
        </div>
      </div>

      {/* ================= PAGE CONTENT ================= */}
      <div className="pt-28 min-h-screen bg-[#fff0e5] flex justify-center font-serif">
        <div className="w-full max-w-5xl bg-[#fffdfc] m-8 p-6 rounded-md shadow-lg border">

          <h2 className="text-2xl font-bold uppercase tracking-wide mb-6">
            Adopter Details
          </h2>

          {/* ADMIN */}
          <Section id="admin" title="Admin Controls" bg="bg-[#dbeaf3]">
            <Grid>
              <p>
                <b>Account Status:</b>{" "}
                <span className={adopter.isBlocked ? "text-red-600" : "text-green-700"}>
                  {adopter.isBlocked ? "Blocked" : "Active"}
                </span>
              </p>
              <Info label="Approval Status" value={adopter.status} />
            </Grid>

            <div className="flex items-start gap-6 mt-4">
              <div className="flex-1">
                {adopter.isBlocked ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-xs font-semibold text-red-700 mb-1">
                      Block Reason
                    </p>
                    <p className="text-sm text-red-600">
                      {adopter.blockReason || "No reason provided"}
                    </p>
                  </div>
                ) : (
                  <textarea
                    className="w-full border rounded-lg p-3 text-sm"
                    rows={2}
                    placeholder="Reason for blocking this adopter..."
                    value={blockReason}
                    onChange={(e) => setBlockReason(e.target.value)}
                  />
                )}
              </div>

              {adopter.isBlocked ? (
                <button
                  onClick={handleUnblock}
                  disabled={actionLoading}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Unblock
                </button>
              ) : (
                <button
                  onClick={handleBlock}
                  disabled={actionLoading || !blockReason.trim()}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Block
                </button>
              )}
            </div>
          </Section>

          {/* PERSONAL */}
          <Section id="personal" title="Personal Information" bg="bg-[#f2e8cf]">
            <Grid>
              <Info label="Full Name" value={adopter.fullName} />
              <Info label="Religion" value={adopter.religion} />
              <Info label="Gender" value={adopter.gender} />
              <Info label="DOB" value={adopter.dateOfBirth} />
            </Grid>
          </Section>

          {/* CONTACT */}
          <Section title="Contact Details" bg="bg-[#dbeaf3]">
            <Grid>
              <Info label="Email" value={adopter.email} />
              <Info label="Phone" value={adopter.contactNumber} />
              <Info
                label="Alternate Phone"
                value={adopter.alternateContactNumber || "-"}
              />
              <Info
                label="Email Verification Status"
                value={
                  adopter.emailVerified ? (
                    <span className="text-green-600 font-semibold">
                      ✅ Verified
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      ❌ Not Verified
                    </span>
                  )
                }
              />
              <Info label="Address" value={adopter.address} wide />
            </Grid>
          </Section>


          {/* FAMILY */}
          <Section id="family" title="Family & Financial Information" bg="bg-[#f2e8cf]">
            <Grid>
              <Info label="Occupation" value={adopter.occupation} />
              <Info label="Salary (₹)" value={adopter.salaryPerAnnum} />
              <Info label="Marital Status" value={adopter.maritalStatus} />
              <Info label="Biological Children" value={adopter.numberOfBiologicalChildren} />
            </Grid>
          </Section>

          {/* MEDICAL */}
        <Section title="Medical Information" bg="bg-[#dbeaf3]">
          <Info
            label="Health Status"
            value={
              adopter.healthStatus?.length
                ? adopter.healthStatus.join(", ")
                : "Healthy"
            }
          />

          {/* Medical Certificate */}
          {adopter.medicalCertificates ? (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-1">
                Medical Certificate
              </p>
              <img
                src={adopter.medicalCertificates}
                alt="Medical Certificate"
                className="border rounded-md max-h-80"
              />
            </div>
          ) : (
            <p className="mt-3 text-sm italic text-gray-500">
              No medical certificate uploaded
            </p>
          )}
        </Section>

          <div className="flex justify-center">
            <button
              onClick={fetchAadhaar}
              className="px-4 py-2 bg-[#5a8f7b] text-white rounded-md"
            >
              View Aadhaar
            </button>
          </div>

          {/* MEETINGS */}
          <Section id="meetings" title="Meetings" bg="bg-[#fffdfc]">
            {meetings.length === 0 ? <p>No meetings found</p> : (
              <table className="w-full border text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">NGO</th>
                    <th className="border p-2">Children</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Meeting Date</th>
                    <th className="border p-2">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {meetings.map((m) => (
                    <tr key={m._id}>
                      <td className="border p-2">{m.ngoId?.name || "—"}</td>
                      <td className="border p-2">
                        {m.childIds?.map((c) => c.name).join(", ") || "—"}
                      </td>
                      <td className="border p-2 text-center">{m.status}</td>
                      <td className="border p-2 text-center">
                        {m.fixedMeetDate
                          ? new Date(m.fixedMeetDate).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="border p-2 text-center">
                        {new Date(m.updatedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Section>

          {/* ADOPTIONS */}
          <Section id="adoptions" title="Adopted Children" bg="bg-[#f2f7f4]">
            {adoptedChildren.length === 0 ? (
              <p className="text-gray-600">
                This adopter has not adopted any child yet.
              </p>
            ) : (
              <table className="w-full border text-sm mt-2">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-2">Child Name</th>
                    <th className="border p-2">Age</th>
                    <th className="border p-2">Gender</th>
                    <th className="border p-2">NGO</th>
                    <th className="border p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {adoptedChildren.map((child) => (
                    <tr key={child._id}>
                      <td className="border p-2">{child.name}</td>
                      <td className="border p-2 text-center">{child.age}</td>
                      <td className="border p-2 text-center">{child.gender}</td>
                      <td className="border p-2">{child.ngoId?.name || "—"}</td>
                      <td className="border p-2 text-center">
                        <span className="px-2 py-1 rounded bg-green-600 text-white text-xs">
                          Adopted
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Section>
        </div>
      </div>

      {/* AADHAAR MODAL */}
      {showAadhaar && aadhaarData && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-12 rounded-md w-96 shadow-lg">
            <h3 className="text-lg font-bold mb-3">Aadhaar Details</h3>

            <p className="mb-2">
              <span className="font-semibold">Aadhaar Number:</span>{" "}
              {aadhaarData.aadharNumber}
            </p>

            <img
              src={aadhaarData.aadharImage}
              alt="Aadhaar"
              className="border rounded mb-4"
            />

            <button
              onClick={() => setShowAadhaar(false)}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

/* ---------- Helpers ---------- */

const Section = ({ id, title, children, bg }) => (
  <div id={id} className={`border rounded-md p-4 my-4 ${bg}`}>
    <h3 className="text-lg underline font-semibold mb-3">{title}</h3>
    {children}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-2 gap-4">{children}</div>
);

const Info = ({ label, value, wide }) => (
  <div className={wide ? "col-span-2" : ""}>
    <p className="text-sm text-gray-600">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

export default AdopterDetails;
