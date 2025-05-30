import React from "react";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import "../App.css";

function MainPage() {
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `galerie-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("galerie")
      .upload(fileName, file);

    if (uploadError) {
      alert("Eroare la încărcarea fișierului.");
      return;
    }

    const { data: urlData } = supabase.storage
      .from("galerie")
      .getPublicUrl(fileName);

    const fileUrl = urlData?.publicUrl;

    const { error: dbError } = await supabase
      .from("galerie")
      .insert([{ link_fisier: fileUrl }]);

    if (dbError) {
      alert("Eroare la salvarea în galerie.");
    } else {
      alert("Poza a fost încărcată în galerie!");
    }
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
          accept="image/*,video/*"
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
      </div>
    </div>
  );
}

export default MainPage;
