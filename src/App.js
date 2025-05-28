import React from "react";
import "./App.css";

function App() {
  return (
    <div className="container">
      <img src="/titlu.png" alt="Gazeta Căsătoriilor" className="titlu" />
      <img src="/usti.png" alt="Usti" className="usti" />
      <p className="mesaj">
        Nu fiți sfioși, dragilor! Zâmbiți, distrați-vă… și promit că o să iasă și pozele bune!<br />
        <span className="semnatura">— Usti, paznicul veseliei 🐾</span>
      </p>
      <div className="butoane">
        <img src="/incarca-poza.png" alt="Încarcă o poză" className="buton" />
        <img src="/vizualizeaza-galeria.png" alt="Vizualizează galeria" className="buton" />
      </div>
    </div>
  );
}

export default App;
