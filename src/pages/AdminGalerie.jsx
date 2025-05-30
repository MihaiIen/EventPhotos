import React, { useEffect, useState, useRef } from "react";
import supabase from "../supabaseClient";
import "../GaleriePage.css";

const AdminGalerie = () => {
  const [mediaList, setMediaList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const touchStartX = useRef(0);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    const { data, error } = await supabase
      .from("galerie")
      .select("id, link_fisier")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setMediaList(data);
    } else {
      console.error("Eroare la încărcarea galeriei:", error);
    }
  };

  const handleDelete = async (item) => {
    const fileName = item.link_fisier.split("/").pop();

    const { error: deleteStorageError } = await supabase.storage
      .from("galerie")
      .remove([fileName]);

    const { error: deleteDbError } = await supabase
      .from("galerie")
      .delete()
      .eq("id", item.id);

    if (deleteStorageError || deleteDbError) {
      alert("Eroare la ștergere.");
    } else {
      alert("Media ștearsă.");
      fetchMedia();
    }
  };

  const openPreview = (index) => {
    setCurrentIndex(index);
    setIsVideo(mediaList[index].link_fisier.includes(".mp4"));
  };

  const closePreview = () => {
    setCurrentIndex(null);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    if (diffX > 50) {
      showPrevious();
    } else if (diffX < -50) {
      showNext();
    }
  };

  const showPrevious = () => {
    setCurrentIndex((prev) => {
      const newIndex = Math.max(0, prev - 1);
      setIsVideo(mediaList[newIndex].link_fisier.includes(".mp4"));
      return newIndex;
    });
  };

  const showNext = () => {
    setCurrentIndex((prev) => {
      const newIndex = Math.min(mediaList.length - 1, prev + 1);
      setIsVideo(mediaList[newIndex].link_fisier.includes(".mp4"));
      return newIndex;
    });
  };

  const previewUrl = currentIndex !== null ? mediaList[currentIndex].link_fisier : null;

  return (
    <div className="galerie-container">
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <img src="/titlu-mare.png" alt="Gazeta Căsătoriilor" className="titlu-mare" />
      </div>

      <a href="/" className="buton-inapoi">
        <span style={{ fontSize: "1.4rem" }}>←</span> Înapoi
      </a>

      <div className="grid">
        {mediaList.map((item, index) => (
          <div key={item.id} className="grid-item" onClick={() => openPreview(index)}>
            {item.link_fisier.includes(".mp4") ? (
              <video src={item.link_fisier} muted />
            ) : (
              <img src={item.link_fisier} alt={`Media ${index}`} />
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(item);
              }}
              style={{ marginTop: 8, padding: "4px 8px", fontSize: "0.8rem" }}
            >
              Șterge
            </button>
          </div>
        ))}
      </div>

      {previewUrl && (
        <div
          className="modal"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={closePreview}
        >
          <span className="modal-close" onClick={closePreview}>×</span>

          <span
            className="arrow left"
            onClick={(e) => {
              e.stopPropagation();
              showPrevious();
            }}
          >
            ‹
          </span>

          {isVideo ? (
            <video src={previewUrl} controls autoPlay />
          ) : (
            <img src={previewUrl} alt="Preview" />
          )}

          <span
            className="arrow right"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
          >
            ›
          </span>
        </div>
      )}
    </div>
  );
};

export default AdminGalerie;
