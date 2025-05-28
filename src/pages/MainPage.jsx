import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <img src="/titlu.png" alt="Gazeta Căsătoriilor" className="titlu" />
      <img src="/usti.png" alt="Usti" className="usti" />

      <p className="mesaj">
        Hei! Sunt Usturoi. Nu vă sfiiți, zâmbiți larg și încărcați cele mai haioase poze! Eu le analizez cu atenție de acasă și dau note la stil!
      </p>

      <div className="butoane">
        <img
          src="/incarca-poza.png"
          alt="Încarcă o poză"
          className="buton"
          onClick={() => navigate("/upload")}
        />
        <img
          src="/vizualizeaza-galeria.png"
          alt="Vizualizează galeria"
          className="buton"
          onClick={() => navigate("/galerie")}
        />
      </div>
    </div>
  );
}

export default MainPage;
