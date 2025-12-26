import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Parenting_guide from "./pages/Parenting_guide";

import SignupNgo from './pages/SignupNgo';
import Home from "./pages/Home";
import SignUpAdopter from "./pages/SignUpAdopter";
import Adopter_Home from "./pages/Adopter_Home";
import NgoDetails from "./pages/NgoDetails";
import About from './pages/About';
import Help from './pages/Help';
import FormReviewPage from './pages/FormReviewPage';
import AdoptiveGuidelines from './pages/AdoptiveGuidelines';
import AdopterAckForm from './pages/AdopterAckForm';
import NGoAckForm from './pages/NgoAckForm';
import Ngo_Home from './pages/Ngo_Home';
import AdopterProfile from './pages/AdopterProfile';
import EditAdopterProfile from './pages/Adopter_EditProfile';
import InsertChildren from './pages/InsertChildren';
import ViewChildren from './pages/ViewChildren';
import NgoProfile from './pages/NgoProfile';
import EditNgoProfile from './pages/Ngo_EditProfile';
import MeetingHistory from './pages/meetingHistory';
import PendingRequests_NGO from './pages/PendingRequests_NGO';
import PendingRequestDetails_NGO from './pages/PendingRequestDetails_NGO';
import Meeting_Status_NGO from './pages/Meeting_Status_NGO';
import ViewMeeting from './pages/ViewMeeting';
import Meeting_Status_Details from './pages/Meeting_Status_Details';

import Admin_Login from './admin_pages/Admin_Login';
import Admin_Home from './admin_pages/Admin_Home';
import ViewNGOS from './admin_pages/ViewNGOs';
import ManageChildren from './admin_pages/ManageChildren';
import ManageAdopters from './admin_pages/ManageAdopters';

function App() {
 
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-Forever-Found" element={<About />} />
      <Route path="/help-Forever-Found" element={<Help />} />

      <Route path="/adopter-SignUp" element={<SignUpAdopter />} />
      <Route path ="/ngo-signup" element={<SignupNgo/>}/>
      <Route path="/ngo-home/:id" element={<Ngo_Home />} />
      <Route path="/ngo-home/:id/insert-child" element={<InsertChildren />} />
      <Route path="/ngo-home/:id/view-children" element={<ViewChildren />} />
      <Route path="/ngo-home/:id/profile" element={<NgoProfile/>}></Route>
      <Route path="ngo-home/:id/profile/edit" element={<EditNgoProfile/>}></Route>

      <Route path="/review-signup-form" element={<FormReviewPage />} />
      <Route path="/review-signup-form/ngo-acknowledgement" element={<NGoAckForm/>}></Route>
      <Route path="/review-signup-form/adopter-acknowledgement" element={<AdopterAckForm/>}></Route>
      <Route path="/adoptive-guidelines" element={<AdoptiveGuidelines/>}/>

      <Route path="/adopter-home/:id" element={<Adopter_Home />} />
      <Route path="/adopter-home/:id/details" element={<NgoDetails/>}/>  
      <Route path="/adopter-home/:id/parenting-guide" element={<Parenting_guide/>}/>   
      <Route path="/adopter-home/:id/profile" element={<AdopterProfile/>}/>    
      <Route path="/adopter-home/:id/profile/edit" element={<EditAdopterProfile/>}></Route>
      
      <Route path="/adopter/:adopterId/meetings/:meetingId" element={<ViewMeeting/>}/>
      <Route path="/adopter/:adopterId/meetings" element={<MeetingHistory/>}></Route>
      <Route path="/ngo-home/:id/pending-requests" element={<PendingRequests_NGO/>}></Route>
      <Route path="/ngo-home/:id/pending-requests/:meetingId" element={<PendingRequestDetails_NGO/>}></Route>
      <Route path="/ngo-home/:id/meeting-status" element={<Meeting_Status_NGO/>}></Route>
      <Route path="/ngo-home/:id/meeting-status-details/:meetingId" element={<Meeting_Status_Details/>}></Route>

      <Route path="/admin/login" element={<Admin_Login/>}></Route>
      <Route path="/admin/home" element={<Admin_Home/>}></Route>
      <Route path="/admin/view-ngos" element={<ViewNGOS/>}></Route>

      <Route path="/admin/manage-children" element={<ManageChildren/>}></Route>

      <Route path="/admin/manage-adopters" element={<ManageAdopters/>}></Route>
      
      </Routes>
    </Router>  
  );
}

export default App;