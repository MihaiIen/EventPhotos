import React, { useState, useRef } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { storage, db } from "../firebase";
import { v4 as uuid } from "uuid";
import "../App.css";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const [confirmare, setConfirmare] = useState("");
  const fileInputRef = useRef();
  const navigate = useNavigate();

  const handleDirectUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const path = `galerie/${uuid()}-${selectedFile.name}`;
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, selectedFile);
    await addDoc(collection(db, "galerie"), {
      path,
      nume,
      timestamp: Timestamp.now(),
    });

    setConfirmare("Poza a fost încărcată în galerie!");
    setTimeout(() => setConfirmare(""), 3000);
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
          className="buton"
          onClick={() => navigate("/galerie")}
        />
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {confirmare && <p className="confirmare">{confirmare}</p>}
    </div>
  );
}

export default MainPage;
