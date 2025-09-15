import { useState } from "react";
import Logout from "./Logout";
import AH_Navbar from "../Adopter_Home_c/AH_Navbar";
function MainLayout({ children }){
    const [showLogout,setLogout]=useState(false);
    const handleLogout=()=>{
      setLogout(true);
    }
    const handleNoLogout=()=>{
      setLogout(false);
    }
    return (
        <>
         <AH_Navbar onLogoutClick={handleLogout}/>
        <main className="min-h-screen">{children}</main>
         {showLogout&& <Logout onNoLogout={handleNoLogout}/>}
        </>
    );
}
export default MainLayout;