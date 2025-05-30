import { useState } from "react";
import supabase from "../supabaseClient";
import { UploadButton } from "@uploadthing/react";

export default function MesajeSecrete() {
  const [mesaj, setMesaj] = useState("");
  const [autor, setAutor] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleSubmit = async () => {
    if (!mesaj) return alert("Scrie un mesaj :)");

    const { error } = await supabase.from("mesaje").insert([
      {
        mesaj,
        autor: autor || null,
        link_fisier: fileUrl || null,
      },
    ]);

    if (error) {
      console.error(error);
      alert("Eroare la trimitere!");
    } else {
      alert("Mesajul a fost trimis!");
      setMesaj("");
      setAutor("");
      setFileUrl("");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>Scrie un mesaj pentru miri 💌</h2>

      <input
        placeholder="Numele tău (opțional)"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />

      <textarea
        placeholder="Mesajul tău..."
        value={mesaj}
        onChange={(e) => setMesaj(e.target.value)}
        rows={4}
        style={{ display: "block", width: "100%", marginBottom: 10 }}
      />

      <UploadButton
        endpoint="mesaj" // <- acesta trebuie să existe în dashboard UploadThing
        onClientUploadComplete={(res) => {
          const url = res?.[0]?.url;
          if (url) {
            setFileUrl(url);
            console.log("Upload complet:", url);
          }
        }}
        onUploadError={(error) => {
          alert("Eroare la upload: " + error.message);
        }}
      />

      {fileUrl && <p>Fișier încărcat ✅</p>}

      <button onClick={handleSubmit} style={{ marginTop: 20 }}>
        Trimite
      </button>
    </div>
  );
}
