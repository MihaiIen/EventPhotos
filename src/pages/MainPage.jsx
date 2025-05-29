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
      {/* Titlu */}
      <img
        src="/titlu-mare.png"
        alt="Gazeta Căsătoriilor"
        className="titlu-mare"
      />

      {/* Primul articol vizual */}
      <div className="mini-articol">
        <img
          src="/numele-pozei.png"
          alt="Articol special"
          className="titlu-mare"
        />
        <hr className="linie-subtila" />
      </div>

      {/* Al doilea articol vizual */}
      <div className="mini-articol">
        <img
          src="/poza-de-la-miri.png"
          alt="Poza de la miri"
          className="titlu-mare"
        />
      </div>

      {/* Butoane */}
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

      {/* Formular upload */}
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

      {/* Confirmare */}
      {confirmare && <p className="confirmare">{confirmare}</p>}
    </div>
  );
}

export default MainPage;
