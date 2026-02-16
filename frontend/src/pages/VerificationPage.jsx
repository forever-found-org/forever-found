import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function VerificationPage() {
  const { userType, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const [message, setMessage] = useState("");

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  /* ---------- VERIFY TOKEN IF PRESENT ---------- */
  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) return;

      try {
        const res = await fetch(
          `http://localhost:5000/api/${userType}/verify-email/${token}`
        );

        const data = await res.json();

        if (!res.ok) {
          setMessage(data.message || "Verification failed");
        }else {
          window.history.replaceState({}, document.title, location.pathname);
        }
      } catch (err) {
        setMessage("Verification failed");
      }
    };

    verifyEmail();
  }, [token, userType]);

  /* ---------- FETCH UPDATED STATUS ---------- */
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/${userType}/${id}`
        );
        const data = await res.json();

        if (!res.ok) throw new Error();

        setEmailVerified(data.emailVerified);
      } catch {
        setMessage("Failed to load verification status");
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [userType, id]);

  /* ---------- AUTO REDIRECT ---------- */
  useEffect(() => {
    if (emailVerified) {
      const timer = setTimeout(() => {
        navigate(
          userType === "adopter"
            ? "/review-signup-form/adopter-acknowledgement"
            : "/review-signup-form/ngo-acknowledgement"
        );
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [emailVerified, userType, navigate]);


  if (loading)
    return <p className="text-center mt-20 text-gray-600">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#fff0e5] font-serif flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-[#fffdfc] border rounded-xl shadow-lg p-6">

        {/* HEADER */}
        <h2 className="text-2xl font-bold text-center uppercase tracking-wide mb-2">
          Account Verification
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Verify your email to continue as{" "}
          <span className="font-semibold capitalize">{userType}</span>
        </p>

        {/* EMAIL VERIFICATION */}
        <Section title="Email Verification">
          {emailVerified ? (
            <StatusSuccess text="Email verified successfully" />
          ) : (
            <StatusPending text="Check your inbox and click the verification link" />
          )}
        </Section>

        {/* MESSAGE */}
        {message && (
          <p className="text-center mt-4 text-sm text-red-600">{message}</p>
        )}

        {/* SUCCESS */}
        {emailVerified && (
          <div className="mt-6 text-center bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700 font-semibold">
              🎉 Verification Complete!
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Your profile is now pending admin approval.
              <br />
              Login will be enabled after approval.
            </p>
             <p className="text-xs text-gray-500 mt-3">
            You will be automatically redirected in a few seconds...
          </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerificationPage;

/* ---------- REUSABLE UI PARTS ---------- */

const Section = ({ title, children }) => (
  <div className="border rounded-lg p-4 mb-4 bg-[#f2e8cf]">
    <h3 className="font-semibold underline mb-2">{title}</h3>
    {children}
  </div>
);

const StatusSuccess = ({ text }) => (
  <p className="text-green-700 font-semibold">✅ {text}</p>
);

const StatusPending = ({ text }) => (
  <p className="text-red-600">
    ❌ Not verified
    <br />
    <span className="text-sm text-gray-600">{text}</span>
  </p>
);
