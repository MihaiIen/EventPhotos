import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import "../App.css";

export default function VizualizareMesaje() {
  const [mesaje, setMesaje] = useState([]);

  useEffect(() => {
    const fetchMesaje = async () => {
      const { data, error } = await supabase
        .from("mesaje")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Eroare la citirea mesajelor:", error.message);
      } else {
        setMesaje(data);
      }
    };

    fetchMesaje();
  }, []);

  return (
    <div className="container">
      <img src="/titlu-mare.png" alt="Titlu" className="titlu-mare" />

      <div style={{ margin: "10px 0 20px 10px", textAlign: "left" }}>
        <a href="/" className="buton-inapoi">
          <span style={{ fontSize: "1.4rem" }}>←</span> Înapoi
        </a>
      </div>

      <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
        {mesaje.length === 0 ? (
          <p>Nu există încă mesaje.</p>
        ) : (
          mesaje.map((msg) => (
            <div
              key={msg.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: 10,
                padding: 15,
                marginBottom: 20,
                background: "#fff8f0",
              }}
            >
              <p style={{ fontWeight: "bold" }}>{msg.autor || "Anonim"}:</p>
              <p>{msg.mesaj}</p>
              {msg.link_fisier && (
                <div style={{ marginTop: 10 }}>
                  {msg.link_fisier.includes(".mp4") ||
                  msg.link_fisier.includes(".webm") ? (
                    <video
                      controls
                      style={{ maxWidth: "100%", borderRadius: 8 }}
                      src={msg.link_fisier}
                    />
                  ) : (
                    <img
                      src={msg.link_fisier}
                      alt="Atașat"
                      style={{ maxWidth: "100%", borderRadius: 8 }}
                    />
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
