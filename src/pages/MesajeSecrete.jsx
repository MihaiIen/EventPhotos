import { useState } from "react";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import "../App.css";

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

      const { data, error: uploadError } = await supabase.storage
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

      <div style={{ margin: "10px 0 20px 10px", textAlign: "left" }}>
        <img
          src="/mergi-inapoi.png"
          alt="Mergi înapoi"
          onClick={() => navigate("/")}
          style={{
            height: "32px",
            cursor: "pointer",
            marginLeft: "10px",
            transition: "transform 0.2s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>

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
          rows={6}
          style={{ display: "block", width: "100%", marginBottom: 10 }}
        />
        <label htmlFor="upload-file">
          <img
            src="/adauga-poza-mare.png"
            alt="Adaugă poză"
            className="buton-vintage"
            style={{ maxWidth: "100%", marginBottom: 10 }}
          />
        </label>
        <input
          id="upload-file"
          type="file"
          accept="image/*,video/*"
          style={{ display: "none" }}
          onChange={(e) => setFisier(e.target.files[0])}
        />
        <div style={{ textAlign: "center" }}>
          <img
            src="/trimite-mesaj.png"
            alt="Trimite"
            className="buton-vintage"
            onClick={handleSubmit}
            style={{ maxWidth: "100%", marginTop: 10, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 }}
          />
        </div>
      </div>
    </div>
  );
}
