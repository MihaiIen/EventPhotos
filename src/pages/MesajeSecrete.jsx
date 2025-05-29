import React, { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { storage, db } from "../firebase";
import { v4 as uuid } from "uuid";
import "../App.css";

function MesajeSecrete() {
  const [file, setFile] = useState(null);
  const [mesaj, setMesaj] = useState("");
  const [confirmare, setConfirmare] = useState("");

  const handleSubmit = async () => {
    if (!file && mesaj.trim() === "") return;

    const path = file ? `mesaje/${uuid()}-${file.name}` : null;
    if (file) {
      const fileRef = ref(storage, path);
      await uploadBytes(fileRef, file);
    }

    await addDoc(collection(db, "mesaje"), {
      path,
      mesaj,
      timestamp: Timestamp.now(),
    });

    setFile(null);
    setMesaj("");
    setConfirmare("Mesajul tău a fost trimis!");
    setTimeout(() => setConfirmare(""), 3000);
  };

  return (
    <div className="container">
      <h2>Trimite un mesaj pentru miri 🥰</h2>
      <div className="form">
        <textarea
          placeholder="Scrie un mesaj..."
          value={mesaj}
          onChange={(e) => setMesaj(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={handleSubmit}>Trimite</button>
        {confirmare && <p className="confirmare">{confirmare}</p>}
      </div>
    </div>
  );
}

export default MesajeSecrete;
