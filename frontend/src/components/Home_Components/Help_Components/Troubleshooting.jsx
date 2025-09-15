function Troubleshooting() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-serif font-bold text-gray-900 bg-gray-100 px-4 py-2 rounded-lg">
        Troubleshooting
      </h1>

      <div className="space-y-6">
        <h2 className="text-2xl font-serif font-bold text-gray-800 bg-gray-100 px-3 py-2 rounded-md">
          Common Issues & How to Resolve Them
        </h2>

        <div className="space-y-4">
          <h3 className="text-xl font-serif font-semibold text-gray-700 bg-gray-50 px-3 py-1 rounded">
            1. Form Validation Errors
          </h3>
          <p className="text-lg font-medium ml-3">
            All forms on the platform use real-time validation to ensure data correctness. Common issues include:
          </p>
          <ul className="list-disc ml-8 text-lg text-gray-700 space-y-1">
            <li>Required fields left empty.</li>
            <li>Invalid input formats (e.g., incorrect email or mobile number).</li>
            <li>Mismatched password confirmation.</li>
          </ul>
          <p className="text-lg font-medium ml-3">
            Whenever a validation error occurs, an appropriate message is displayed below the input field in red text,
            marked with a red asterisk (*). This guides users to correct their input before proceeding.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-serif font-semibold text-gray-700 bg-gray-50 px-3 py-1 rounded">
            2. Login Not Working
          </h3>
          <p className="text-lg font-medium ml-3">If you're unable to log in:</p>
          <ul className="list-disc ml-8 text-lg text-gray-700 space-y-1">
            <li><b>Incorrect Password:</b> Double-check for typos and ensure the correct password is used.</li>
            <li><b>Unverified Account:</b> NGOs must be approved by the admin team before accessing the platform.</li>
            <li><b>Wrong Role Selection:</b> Ensure you're logging in with the correct role (Adopter or NGO), as each role accesses a different section of the platform.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-serif font-semibold text-gray-700 bg-gray-50 px-3 py-1 rounded">
            3. Unable to Register
          </h3>
          <p className="text-lg font-medium ml-3">Issues during registration may include:</p>
          <ul className="list-disc ml-8 text-lg text-gray-700 space-y-1">
            <li><b>Duplicate Aadhaar or Email:</b> These must be unique. If already used, an error message will be shown.</li>
            <li><b>Fake or Invalid Documents:</b> All uploaded files (e.g., registration or CARA certificates) must be genuine. Fake or unverifiable documents will result in rejection by the admin team.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Troubleshooting;
