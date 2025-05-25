import React, { useState } from 'react';

import Hero from "../components/Home_Components/Hero";
import Navbar from "../components/Home_Components/navbar";
import Login from "../components/Home_Components/Login";
function Home() {
  const [showLogin, setShowLogin] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(true);
  };
  // const handleCloseLogin = () => {
  //   setShowLogin(false);
  // };
  
  return (
    <div className="relative w-full h-screen">
      <Navbar onLoginClick={handleShowLogin}/>
      <Hero onGetStartedClick={handleShowLogin}  />

      {showLogin && <Login />}
    </div>
  );
}

export default Home;