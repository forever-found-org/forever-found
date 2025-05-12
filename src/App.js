import React, { useState } from 'react';

import Hero from "./components/Hero";
import Navbar from "./components/navbar";
import Login from "./components/Login";
function App() {
  //const [name, setName] = useState(""); // state to store the count
  //const [count,incCount]=useState(0);
  const [showLogin, setShowLogin] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(true);
  };
  const handleCloseLogin = () => {
    setShowLogin(false);
  };
  
  return (
    /*
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold">React Counter</h1>
      <p className="text-lg mt-4">You clicked {count} times</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setCount(count + 1)}
      >
        Click Me
      </button>
    </div>*/
    <div>
      <Navbar/>
      <Hero onGetStartedClick={handleShowLogin} />
      {showLogin && <Login onClose={handleCloseLogin}  />}
    </div>
  );
}

export default App;
