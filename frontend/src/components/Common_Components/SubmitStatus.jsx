function SubmitStatus({ status, message, onOk }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-[420px] text-center shadow-2xl">

        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <p className="text-lg font-semibold text-amber-700">
              Saving child details...
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <p className="text-2xl font-bold text-green-600 mb-3">Success ✅</p>
            <p className="text-gray-700 mb-6">{message}</p>
            <button
              onClick={onOk}
              className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700"
            >
              OK
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <p className="text-2xl font-bold text-red-600 mb-3">Error ❌</p>
            <p className="text-gray-700 mb-6">{message}</p>
            <button
              onClick={onOk}
              className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700"
            >
              OK
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SubmitStatus;
