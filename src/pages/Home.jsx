import { useState,useEffect } from 'react';
//import { useLocation } from 'react-router-dom';
import NgoApprStatus from '../components/Home_Components/NgoApprStatus';
import Hero from "../components/Home_Components/Hero";
import Navbar from "../components/Home_Components/navbar";
import Login from "../components/Home_Components/Login";
import Footer from '../components/Home_Components/Footer';

function Home() {
  //const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const[showNgoApr,setNgoApr]=useState(false);

  /*useEffect(() => {
    if (location.state?.showLogin) {
      setShowLogin(true);
      setNgoApr(false);
    }
  }, [location.state]);*/

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
      <Navbar onLoginClick={handleShowLogin} onNGOaprClick={handleShowNgoApr} />
      <Hero onGetStartedClick={handleShowLogin}  />

      {showNgoApr&&<NgoApprStatus />}
      {showLogin && <Login />}

      <Footer />
    </div>
  );
}

export default Home;