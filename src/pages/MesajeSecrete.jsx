import { useState } from "react";
import supabase from "../supabaseClient";

export default function MesajeSecrete() {
  const [autor, setAutor] = useState("");
  const [mesaj, setMesaj] = useState("");
  const [fisier, setFisier] = useState(null);
  const [loading, setLoading] = useState(false);

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
console.log("URL fisier:", fileUrl); // <- vezi aici dacă apare

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
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setFisier(e.target.files[0])}
        style={{ marginBottom: 10 }}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Se trimite..." : "Trimite"}
      </button>
    </div>
  );
}
