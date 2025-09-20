function Preferences() {
    return (
      <div className="flex flex-col items-center bg-[#F3E8FF] min-h-screen py-10 px-4">
        <div className="w-full max-w-xl text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-700 mb-2">Give your preferences.</h1>
          <h2 className="text-2xl font-serif text-gray-600">Choose your child!</h2>
        </div>
  
        <div className="w-full max-w-xl bg-[#FDF6F9] border border-gray-200 rounded-2xl p-6 shadow-md">
          <div className="flex justify-around mb-4 px-4 text-gray-700 font-serif font-semibold">
            <label>Gender</label>
            <label>Age Group</label>
            <label>Religion</label>
          </div>
  
          <div className="flex justify-between gap-4 mb-6 px-4">
            <select className="flex-1 p-3 rounded-lg bg-white shadow-sm font-serif border border-gray-300">
              <option value="">Any</option>
              <option value="">Male</option>
              <option value="">Female</option>
              <option value="">Others</option>
            </select>
  
            <select className="flex-1 p-3 rounded-lg bg-white shadow-sm font-serif border border-gray-300">
              <option>Any</option>
              <option value="">2-4</option>
              <option value="">5-8</option>
              <option value="">9-11</option>
              <option value="">12-18</option>
            </select>

            <select className="flex-1 p-3 rounded-lg bg-white shadow-sm font-serif border border-gray-300">
              <option>Any</option>
              <option value="">Hindu</option>
              <option value="">Muslim</option>
              <option value="">Sikh</option>
              <option value="">Christian</option>
            </select>
          </div>
  
          <div className="text-center">
            <button className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-serif font-semibold transition duration-200">
              Find Match
            </button>
          </div>
        </div>
      </div>
    );
  }
  export default Preferences;
  