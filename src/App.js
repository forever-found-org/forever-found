import Adopter_Home from "./pages/Adopter_Home";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from "./pages/Home";
import NgoDetails from "./pages/NgoDetails";
function App() {
 
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adopter-home" element={<Adopter_Home />} />
      <Route path="/adopter-home/:name" element={<NgoDetails/>}/>      
      </Routes>
    </Router>
  );
}

export default App;