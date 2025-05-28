import React, { useState } from 'react';

import Hero from "../components/Home_Components/Hero";
import Navbar from "../components/Home_Components/navbar";
import Login from "../components/Home_Components/Login";
import NgoApprStatus from '../components/Home_Components/NgoApprStatus';
import Footer from '../components/Home_Components/Footer';
function Home() {
 
  const [showLogin, setShowLogin] = useState(false);
  const[showNgoApr,setNgoApr]=useState(false);
  
  const handleShowLogin = () => {
    setShowLogin(!showLogin);
    setNgoApr(false);
   
  };
  const handleShowNgoApr=()=>{
    setNgoApr(!showNgoApr);
    setShowLogin(false);
  };
  
  return (
    <div className="relative w-full h-screen">
      <Navbar onLoginClick={handleShowLogin} onNGOaprClick={handleShowNgoApr}/>
      <Hero onGetStartedClick={handleShowLogin}  />
      {showNgoApr&&<NgoApprStatus />}
      {showLogin && <Login />}
      <Footer/>
    </div>
  );
}

export default Home;