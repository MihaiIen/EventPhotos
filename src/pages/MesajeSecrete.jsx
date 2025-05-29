import React, { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { storage, db } from "../firebase";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import "../App.css";

function MesajeSecrete() {
  const [mesaj, setMesaj] = useState("");
  const [file, setFile] = useState(null);
  const [confirmare, setConfirmare] = useState("");
  const navigate = useNavigate();

  const handleUpload = async () => {
  try {
    let path = null;
    if (file) {
      path = `mesaje/${uuid()}-${file.name}`;
      const fileRef = ref(storage, path);
      await uploadBytes(fileRef, file);
    }

    await addDoc(collection(db, "mesaje"), {
      mesaj,
      path,
      timestamp: Timestamp.now(),
    });

    setMesaj("");
    setFile(null);
    setConfirmare("Mesajul a fost trimis cu succes!");
    setTimeout(() => setConfirmare(""), 3000);
  } catch (err) {
    console.error("Eroare la upload sau salvare mesaj:", err);
    alert("Eroare la trimiterea mesajului. Verifică consola.");
  }
};


  return (
    <div className="container">
      <img
        src="/titlu-mare.png"
        alt="Gazeta Căsătoriilor"
        className="titlu-mare"
      />

      <div className="back-wrapper">
        <span className="buton-inapoi" onClick={() => navigate("/")}>
          ← Înapoi
        </span>
      </div>

      <textarea
        className="mesaj-textarea"
        rows="6"
        placeholder="Scrie un mesaj pentru miri..."
        value={mesaj}
        onChange={(e) => setMesaj(e.target.value)}
      ></textarea>

      <label htmlFor="upload-file">
        <img
          src="/adauga-foto-video.png"
          alt="Adaugă poză/video"
          className="buton-vintage"
        />
      </label>
      <input
        id="upload-file"
        type="file"
        accept="image/*,video/*"
        style={{ display: "none" }}
        onChange={(e) => setFile(e.target.files[0])}
      />

      <img
        src="/trimite-mesaj.png"
        alt="Trimite"
        className="buton-vintage"
        onClick={handleUpload}
      />

      {confirmare && <p className="confirmare">{confirmare}</p>}
    </div>
  );
}

export default MesajeSecrete;
