import MainLayout from "../components/Common_Components/MainLayout";
import StaticDets from "../components/Ngodetails_c/staticDets";
import Preferences from "../components/Ngodetails_c/preferences";
import { useParams } from 'react-router-dom';
function NgoDetails(){
    const { name } = useParams();
    return(
        <MainLayout>
        
        <StaticDets image="https://images.pexels.com/photos/8205368/pexels-photo-8205368.jpeg?auto=compress&cs=tinysrgb&w=600" name= {name} text="Helping Hands Foundation is a committed non-profit organization focused on transforming the lives of vulnerable and underprivileged children across India. Established with the vision that every child deserves love, care, and opportunities, we work to provide holistic support through shelter, education, nutrition, and emotional well-being. Our efforts are centered around creating a safe and nurturing environment where children can grow, learn, and reach their full potential.

We collaborate closely with adoption centers, child welfare agencies, volunteers, and government bodies to ensure that every child without a family is given the opportunity to find a permanent, loving home. Through awareness drives, outreach programs, and community involvement, we strive to break the cycle of poverty and neglect that many children face.

At Helping Hands, we also focus on empowering communities by educating them about child rights, adoption laws, and the importance of child care."/>
        <Preferences/>
        </MainLayout>
    );
}
export default NgoDetails;