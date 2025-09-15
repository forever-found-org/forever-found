import { useNavigate } from "react-router-dom";

function Logout({onNoLogout}) {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-[90%] max-w-md mx-auto p-6 bg-white border border-gray-300 shadow-lg rounded-xl absolute top-[200px] right-[405px]">
      <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Confirm Logout
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Are you sure you want to log out of your account?
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={handleLogout}
          className="w-24 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
        >
          Yes
        </button>
        <button
          className="w-24 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
          onClick={onNoLogout}
        >
          No
        </button>
      </div>
    </div>
    </div>
  );
}

export default Logout;
