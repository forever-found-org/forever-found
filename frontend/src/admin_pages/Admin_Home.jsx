import Admin_Nav from "../admin_components/Admin_home/Admin_nav";
import Admin_Dashboard from "../admin_components/Admin_home/Admin_dashboard";
function Admin_Home()
{
    return(
        <>
            <Admin_Nav></Admin_Nav>
            <Admin_Dashboard></Admin_Dashboard>
        </>
        
    );
}
export default Admin_Home