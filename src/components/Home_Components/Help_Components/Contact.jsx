function Contact() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-serif font-bold text-gray-900 bg-gray-100 px-4 py-2 rounded-lg">
        Contact & Support
      </h1>

      <div className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-gray-800 bg-gray-100 px-3 py-2 rounded-md">
          Reach Out for Help
        </h2>
        <p className="text-lg font-medium ml-3">Email: support@foreverfound.org</p>
        <p className="text-lg font-medium ml-3">Contact Number: 9076783812</p>
        <p className="text-lg font-medium ml-3">Response Time: 24-48 hours</p>
      </div>

      <p className="text-lg font-medium ml-3">
        Note: If you're an NGO and haven't received a verification confirmation within 5 working days, please contact support with your registered email.
      </p>
    </div>
  );
}

export default Contact;
