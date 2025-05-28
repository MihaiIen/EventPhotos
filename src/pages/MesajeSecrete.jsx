import React, { useState } from "react";

function MesajeSecrete() {
  const [parola, setParola] = useState("");
  const [autorizat, setAutorizat] = useState(false);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      {!autorizat ? (
        <>
          <h2>Acces restricționat</h2>
          <input
            type="password"
            placeholder="Introdu parola"
            value={parola}
            onChange={(e) => setParola(e.target.value)}
          />
          <button onClick={() => setAutorizat(parola === "parola2025")}>
            Accesează
          </button>
        </>
      ) : (
        <h3>Ai acces! 🎉</h3>
      )}
    </div>
  );
}

export default MesajeSecrete;
