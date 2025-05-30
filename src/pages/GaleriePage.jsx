import React, { useEffect, useState, useRef } from "react";
import supabase from "../supabaseClient";
import "../GaleriePage.css";
import { useNavigate } from "react-router-dom";


const GaleriePage = () => {
  const [mediaList, setMediaList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const touchStartX = useRef(0);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchMedia = async () => {
      const { data, error } = await supabase
        .from("galerie")
        .select("link_fisier")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setMediaList(data.map((item) => item.link_fisier));
      } else {
        console.error("Eroare la încărcarea galeriei:", error);
      }
    };

    fetchMedia();
  }, []);

  const openPreview = (index) => {
    setCurrentIndex(index);
    setIsVideo(mediaList[index].includes(".mp4"));
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
      setIsVideo(mediaList[newIndex].includes(".mp4"));
      return newIndex;
    });
  };

  const showNext = () => {
    setCurrentIndex((prev) => {
      const newIndex = Math.min(mediaList.length - 1, prev + 1);
      setIsVideo(mediaList[newIndex].includes(".mp4"));
      return newIndex;
    });
  };

  const previewUrl = currentIndex !== null ? mediaList[currentIndex] : null;

  return (
    <div className="galerie-container">
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <img src="/titlu-mare.png" alt="Gazeta Căsătoriilor" className="titlu-mare" />
      </div>

      <a href="/" className="buton-inapoi">
  <img
  src="/MERGI INAPOI.png"
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

</a>


      <div className="grid">
        {mediaList.map((url, index) => (
          <div key={index} className="grid-item" onClick={() => openPreview(index)}>
            {url.includes(".mp4") ? (
              <video src={url} muted />
            ) : (
              <img src={url} alt={`Media ${index}`} />
            )}
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

export default GaleriePage;
