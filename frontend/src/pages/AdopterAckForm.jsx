import { useNavigate } from "react-router-dom";

function AdopterAckForm() {
  const navigate = useNavigate();

  const handleAck = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <div className="mt-16 font-serif px-4 sm:px-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl mx-auto text-center border border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-700 mb-4">
          Your application has been submitted successfully!
        </h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Your application is currently under review.
        </h2>

        <p className="text-lg text-gray-700 mb-5 leading-relaxed">
          Our team will carefully review your submitted details.
          You can track your application status by logging in to your account.
        </p>

        {/* Verification Notice */}
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5 mb-6">
          <h3 className="text-xl font-semibold text-yellow-800 mb-2">
            ⚠️ Important: Verification Required
          </h3>
          <p className="text-base text-gray-700 leading-relaxed">
            A verification link has been sent to your <strong>registered email address</strong>,
            and a verification code has been sent to your <strong>registered contact number</strong>.
          </p>
          <p className="text-base text-gray-700 mt-2 leading-relaxed">
            Please complete both verifications as soon as possible.
            <span className="font-semibold text-red-600">
              {" "}Applications without verified email and contact details will not be approved.
            </span>
          </p>
        </div>

        <p className="text-md text-gray-600 italic">
          Once approved, you will be able to log in and access all adopter features.
          In case of rejection, the reason will be clearly shown after login.
        </p>
      </div>

      <div className="mt-6 flex items-center justify-center">
        <button
          className="text-lg px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          onClick={handleAck}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default AdopterAckForm;
