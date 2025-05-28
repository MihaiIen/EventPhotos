import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import MainPage from "./pages/MainPage";
import MesajeSecrete from "./pages/MesajeSecrete";
import GaleriePage from "./pages/GaleriePage";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/mesaje" element={<MesajeSecrete />} /> {/* Aici trebuie să fie */}
        <Route path="/galerie" element={<GaleriePage />} />
      </Routes>
    </Router>
  );
}

export default App;


