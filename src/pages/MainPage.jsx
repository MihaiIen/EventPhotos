import React, { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { storage, db } from "../firebase";
import { v4 as uuid } from "uuid";
import "../App.css";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const [fileInputVisible, setFileInputVisible] = useState(false);
  const [file, setFile] = useState(null);
  const [nume, setNume] = useState("");
  const [confirmare, setConfirmare] = useState("");

  const navigate = useNavigate();

  const handleDirectUpload = () => {
    setFileInputVisible(true);
  };

  const handleUpload = async () => {
    if (!file) return;

    const path = `galerie/${uuid()}-${file.name}`;
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file);
    await addDoc(collection(db, "galerie"), {
      path,
      nume,
      timestamp: Timestamp.now(),
    });

    setFile(null);
    setNume("");
    setConfirmare("Poza a fost încărcată în galerie!");
    setTimeout(() => setConfirmare(""), 3000);
    setFileInputVisible(false);
  };

  return (
    <div className="container">
      <img
        src="/titlu-mare.png"
        alt="Gazeta Căsătoriilor"
        className="titlu-mare"
      />

      <div className="usti-container">
  <div className="usti-left">
    <img src="/usti.png" alt="Usti" className="usti-redactor" />
    <span className="usti-sub">Usturoi – redactor șef</span>
  </div>
  <div className="usti-text">
    <strong className="usti-title">Mesaj de încurajare</strong> 🙂📸<br />
    Hei! Sunt Usturoi. Nu vă sfiiți, zâmbiți larg și încărcați cele mai haioase poze! Eu le analizez cu atenție de acasă și dau note la stil! 🎉
  </div>
</div>
      <div className="butoane">
        <img
          src="/adauga-poza-mare.png"
          alt="Adaugă poză"
          className="buton-vintage"
          onClick={handleDirectUpload}
        />
        <img
          src="/vezi-galeria-mare.png"
          alt="Vizualizează galeria"
          className="buton-vintage"
          onClick={() => navigate("/galerie")}
        />
      </div>

      {fileInputVisible && (
        <div className="form" style={{ marginTop: "20px" }}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Numele tău (opțional)"
            value={nume}
            onChange={(e) => setNume(e.target.value)}
          />
          <button onClick={handleUpload}>Trimite în galerie</button>
        </div>
      )}

      {confirmare && <p className="confirmare">{confirmare}</p>}
    </div>
  );
}

export default MainPage;
