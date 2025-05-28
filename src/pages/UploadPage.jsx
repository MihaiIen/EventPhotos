import React, { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { storage, db } from "../firebase";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import "../App.css";

function UploadPage() {
  const [section, setSection] = useState(null); // 'galerie' sau 'mesaj'
  const [file, setFile] = useState(null);
  const [nume, setNume] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [confirmare, setConfirmare] = useState("");

  const handleUploadGalerie = async () => {
    if (!file) return;
    const path = `galerie/${uuid()}-${file.name}`;
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file);
    await addDoc(collection(db, "galerie"), {
      path,
      nume,
      timestamp: Timestamp.now(),
    });
    resetState();
    setConfirmare("Poza a fost adăugată în galerie!");
  };

  const handleMesajMiri = async () => {
    if (!file || !mesaj) return;
    const path = `mesaje/${uuid()}-${file.name}`;
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file);
    await addDoc(collection(db, "mesaje"), {
      path,
      mesaj,
      timestamp: Timestamp.now(),
    });
    resetState();
    setConfirmare("Mesajul a fost trimis mirilor!");
  };

  const resetState = () => {
    setFile(null);
    setNume("");
    setMesaj("");
    setSection(null);
    setTimeout(() => setConfirmare(""), 3000);
  };

  return (
    <div className="container">
      <img src="/titlu.png" alt="Titlu" className="titlu" />

      {!section && (
        <div className="butoane">
          <img
            src="/incarca o poza.png"
            alt="Postează în galerie"
            className="buton"
            onClick={() => setSection("galerie")}
          />
          <img
            src="/Mesaj pentru miri.png"
            alt="Mesaj pentru miri"
            className="buton"
            onClick={() => setSection("mesaj")}
          />
        </div>
      )}

      {section === "galerie" && (
        <div className="form">
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
          <input
            type="text"
            placeholder="Numele tău (opțional)"
            value={nume}
            onChange={(e) => setNume(e.target.value)}
          />
          <button onClick={handleUploadGalerie}>Trimite în galerie</button>
        </div>
      )}

      {section === "mesaj" && (
        <div className="form">
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
          <textarea
            placeholder="Scrie un mesaj pentru miri"
            value={mesaj}
            onChange={(e) => setMesaj(e.target.value)}
          />
          <button onClick={handleMesajMiri}>Trimite mesajul</button>
        </div>
      )}

      {confirmare && <p className="confirmare">{confirmare}</p>}

      <Link to="/" className="back-link">← Înapoi</Link>
    </div>
  );
}

export default UploadPage;
