import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const [confirmare, setConfirmare] = useState("");
  const navigate = useNavigate();

  const handleDirectUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      import("firebase/storage").then(({ getStorage, ref, uploadBytes }) => {
        import("../firebase").then(({ storage, db }) => {
          import("firebase/firestore").then(({ collection, addDoc, Timestamp }) => {
            import("uuid").then(({ v4: uuid }) => {
              const path = `galerie/${uuid()}-${file.name}`;
              const fileRef = ref(storage, path);
              uploadBytes(fileRef, file).then(() => {
                addDoc(collection(db, "galerie"), {
                  path,
                  nume: "", // Fără nume, conform cerinței
                  timestamp: Timestamp.now(),
                }).then(() => {
                  setConfirmare("Poza a fost încărcată în galerie!");
                  setTimeout(() => setConfirmare(""), 3000);
                });
              });
            });
          });
        });
      });
    };

    input.click();
  };

  return (
    <div className="container">
      <img src="/titlu.png" alt="Gazeta Căsătoriilor" className="titlu" />
      <img src="/usti.png" alt="Usti" className="usti" />

      <p className="mesaj">
        Hei! Sunt Usturoi. Nu vă sfiiți, zâmbiți larg și încărcați cele mai haioase poze! Eu le analizez cu atenție de acasă și dau note la stil!
      </p>

      <div className="butoane">
        <img
          src="/adauga-poza-mare.png"
          alt="Adaugă poză"
          className="buton-vintage"
          onClick={handleDirectUpload}
        />

        <img
          src="/vizualizeaza-galeria.png"
          alt="Vizualizează galeria"
          className="buton-vintage"
          onClick={() => navigate("/galerie")}
        />
      </div>

      {confirmare && <p className="confirmare">{confirmare}</p>}
    </div>
  );
}

export default MainPage;
