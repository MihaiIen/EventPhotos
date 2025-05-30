import React, { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { storage, db } from "../firebase";
import { v4 as uuid } from "uuid";
import "../App.css";
import { useNavigate } from "react-router-dom";

function MainPage() {
  // const [file, setFile] = useState(null);
  const [confirmare, setConfirmare] = useState("");
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const path = `galerie/${uuid()}-${file.name}`;
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file);
    await addDoc(collection(db, "galerie"), {
      path,
      timestamp: Timestamp.now(),
    });

    setConfirmare("Poza a fost încărcată în galerie!");
    setTimeout(() => setConfirmare(""), 3000);
  };

  return (
    <div className="container">
      <img
  src="/titlu-mare.png"
  alt="Gazeta Căsătoriilor"
  className="titlu-mare"
/>

<img
  src="/numele-pozei.png"
  alt="Articol intermediar"
  className="titlu-mare"
/>

<div className="linie-subtila" />

<img
  src="/poza-de-la-miri.png"
  alt="Articol special"
  className="titlu-mare"
/>
      <div className="butoane">
        <label htmlFor="upload-file">
          <img
            src="/adauga-poza-mare.png"
            alt="Adaugă poză"
            className="buton-vintage"
          />
        </label>
        <input
          id="upload-file"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleUpload}
        />

        <img
          src="/vezi-galeria-mare.png"
          alt="Vizualizează galeria"
          className="buton-vintage"
          onClick={() => navigate("/galerie")}
        />
        <img
  src="/mesaj-pentru-miri.png"
  alt="Mesaj pentru miri"
  className="buton-vintage"
  onClick={() => navigate("/mesaj")}
/>
<div style={{ position: "absolute", bottom: 10, left: 10 }}>
  <a
    href="/vizualizare-mesaje"
    style={{
      fontSize: "0.9rem",
      color: "#333",
      textDecoration: "underline",
      opacity: 0.7,
    }}
  >
    Mesaje miri 🔒
  </a>
</div>


      </div>

      {confirmare && <p className="confirmare">{confirmare}</p>}
    </div>
  );
}

export default MainPage;
