import React from "react";
import "./App.css";

function App() {
  return (
    <div className="container">
      <img src="/titlu.png" alt="Gazeta Căsătoriilor" className="titlu" />
      <div className="linie"></div>
      <img src="/usti.png" alt="Usti" className="usti" />
      <div className="butoane">
        <img src="/incarca-poza.png" alt="Încarcă o poză" className="buton" />
        <img src="/vizualizeaza-galeria.png" alt="Vizualizează galeria" className="buton" />
      </div>
    </div>
  );
}

export default App;
