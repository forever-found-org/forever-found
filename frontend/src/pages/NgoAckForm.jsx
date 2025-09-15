import { useNavigate } from "react-router-dom";
function NGoAckForm() {
    const navigate=useNavigate();
    const handleAck=()=>{
        navigate('/');
        window.scrollTo(0,0);
    }
    return (
        <div className="mt-16 font-serif px-4 sm:px-10">
            <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl mx-auto text-center border border-gray-200">
                <h1 className="text-3xl sm:text-4xl font-bold text-green-700 mb-4">
                    Your application has been submitted successfully!
                </h1>
                <h2 className="text-2xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    It is now under review by our team.
                </h2>
                <h2 className="text-xl sm:text-xl text-gray-700 mb-4 leading-relaxed">
                    You can check your NGO approval status anytime using the <br />
                    <span className="text-red-500 font-semibold">‘NGO Approval Status’</span> <br />
                    button on the homepage.
                </h2>
                <p className="text-lg text-gray-600 italic">
                    To check your application status, simply enter your NGO's <span className="font-semibold"> Name</span> and <span className="font-semibold">Email ID</span>.
                </p>
            </div>

            <div className="mt-6 flex items-center justify-center">
                <button className="text-lg p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700" onClick={handleAck}>
                    Back to Home
                </button>
            </div>
        </div>
    );
}

export default NGoAckForm;
