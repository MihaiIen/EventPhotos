import { Routes, Route } from "react-router-dom"; // fără Router
import MainPage from "./pages/MainPage";
import MesajeSecrete from "./pages/MesajeSecrete";
import GaleriePage from "./pages/GaleriePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/galerie" element={<GaleriePage />} />
      <Route path="/mesaj" element={<MesajeSecrete />} />
    </Routes>
  );
}

export default App;
