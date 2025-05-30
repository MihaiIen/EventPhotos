import { useState } from "react";
import supabase from "../supabaseClient";
import "../App.css";
import { useNavigate } from "react-router-dom";


export default function MesajeSecrete() {
  const [autor, setAutor] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [fisier, setFisier] = useState(null);
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();


  const handleSubmit = async () => {
    if (!mesaj) return alert("Scrie un mesaj :)");
    setLoading(true);

    let fileUrl = null;

    if (fisier) {
      const fileExt = fisier.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("mesaje")
        .upload(fileName, fisier);

      if (uploadError) {
        alert("Eroare la upload fisier!");
        setLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("mesaje")
        .getPublicUrl(fileName);

      fileUrl = publicUrlData.publicUrl;
    }

    const { error: insertError } = await supabase.from("mesaje").insert([
      {
        autor: autor || null,
        mesaj,
        link_fisier: fileUrl,
      },
    ]);

    if (insertError) {
      alert("Eroare la trimitere mesaj.");
    } else {
      alert("Mesaj trimis!");
      setAutor("");
      setMesaj("");
      setFisier(null);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <img src="/titlu-mare.png" alt="Titlu" className="titlu-mare" />

        <img
  src="/mergi-inapoi.png"
  alt="Mergi înapoi"
  className="buton-vintage"
  onClick={() => navigate("/")}
  style={{
    height: "40px", // ajustează dacă vrei
    cursor: "pointer",
    display: "block",
    margin: "20px auto 0", // centrat ca restul
  }}
/>


      <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
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
          rows={8}
          style={{ display: "block", width: "100%", marginBottom: 10 }}
        />

        <label htmlFor="upload-mesaj">
          <img
            src="/adauga-poza-mare.png"
            alt="Alege fișier"
            className="buton-vintage"
          />
        </label>
        <input
          id="upload-mesaj"
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFisier(e.target.files[0])}
          style={{ display: "none" }}
        />

        <img
          src="/trimite-mesaj.png"
          alt="Trimite"
          className="buton-vintage"
          onClick={handleSubmit}
          style={{ marginTop: 20, opacity: loading ? 0.6 : 1, pointerEvents: loading ? "none" : "auto" }}
        />
      </div>
    </div>
  );
}
