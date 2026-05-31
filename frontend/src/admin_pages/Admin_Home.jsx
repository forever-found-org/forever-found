import Admin_Nav from "../admin_components/Admin_home/Admin_nav";
import Admin_Dashboard from "../admin_components/Admin_home/Admin_dashboard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Admin_Home()
{
    const navigate = useNavigate();
    useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
        navigate("/admin/login", { replace: true });
    }
    }, []);
    return(
        <>
            <Admin_Nav></Admin_Nav>
            <Admin_Dashboard></Admin_Dashboard>
        </>
        
    );
}
export default Admin_Home