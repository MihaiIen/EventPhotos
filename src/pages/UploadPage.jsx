import React, { useState } from "react";
import { storage, db } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

function UploadPage() {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    const storageRef = ref(storage, `uploads/${uuid()}-${file.name}`);
    await uploadBytes(storageRef, file);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  const handleMessageSend = async () => {
    if (!message) return;
    await addDoc(collection(db, "mesaje"), {
      text: message,
      timestamp: Timestamp.now()
    });
    setMessage("");
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 3000);
  };

  return (
    <div className="container">
      <img src="/titlu.png" alt="Titlu" className="titlu" />

      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Postează în galerie</button>

      <textarea
        placeholder="Scrie un mesaj pentru miri"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button onClick={handleMessageSend}>Trimite un mesaj mirilor</button>

      <Link to="/">Înapoi</Link>

      {uploadSuccess && <p style={{ color: "green" }}>Fișier încărcat cu succes!</p>}
      {messageSent && <p style={{ color: "green" }}>Mesaj trimis cu succes!</p>}
    </div>
  );
}

export default UploadPage;
