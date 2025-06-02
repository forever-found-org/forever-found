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

function App() {
 
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-Forever-Found" element={<About />} />
      <Route path="/help-Forever-Found" element={<Help />} />

      <Route path="/adopter-SignUp" element={<SignUpAdopter />} />
      <Route path ="/ngo-signup" element={<SignupNgo/>}/>
      <Route path="/adopter-home" element={<Adopter_Home />} />
      <Route path="/review-signup-form" element={<FormReviewPage />} />

      <Route path="/adopter-home/:name" element={<NgoDetails/>}/>  
      <Route path="/adopter-home/parenting-guide" element={<Parenting_guide/>}/>       

      </Routes>
    </Router>  
  );
}

export default App;