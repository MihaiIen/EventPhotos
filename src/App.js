import { Routes, Route } from "react-router-dom"; // fără Router
import MainPage from "./pages/MainPage";
import MesajeSecrete from "./pages/MesajeSecrete";
import GaleriePage from "./pages/GaleriePage";
import VizualizareMesaje from "./pages/VizualizareMesaje";
import AdminGalerie from "./pages/AdminGalerie";




function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/galerie" element={<GaleriePage />} />
      <Route path="/mesaj" element={<MesajeSecrete />} />
      <Route path="/vizualizare-mesaje" element={<VizualizareMesaje />} />
      <Route path="/admin-galerie" element={<AdminGalerie />} />
    </Routes>
  );
}

export default App;
