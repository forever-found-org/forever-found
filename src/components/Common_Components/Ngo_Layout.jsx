import { useState } from "react";
import Logout from "./Logout";
import Ngo_Nav from "../Ngo_Home_c/Ngo_Nav";
function Ngo_Layout({ children }){
    const [showLogout,setLogout]=useState(false);
    const handleLogout=()=>{
      setLogout(true);
    }
    const handleNoLogout=()=>{
      setLogout(false);
    }
    return (
        <div>
            <Ngo_Nav onLogoutClick={handleLogout}/>
            <main >{children}</main>
            {showLogout&& <Logout onNoLogout={handleNoLogout}/>}
        </div>
    );
}
export default Ngo_Layout ;