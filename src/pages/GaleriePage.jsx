import React, { useEffect, useState } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";

function GaleriePage() {
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const storage = getStorage();
      const listRef = ref(storage, "uploads/");
      const res = await listAll(listRef);
      const urls = await Promise.all(
        res.items.map((item) => getDownloadURL(item))
      );
      setFiles(urls);
    };

    fetchImages();
  }, []);

  return (
    <div className="galerie-container">
      <div className="top-bar">
        <Link to="/">← Înapoi</Link>
      </div>

      <div className="grid">
        {files.map((url, index) => {
          const isVideo = url.includes(".mp4") || url.includes(".webm");
          return (
            <div key={index} className="grid-item" onClick={() => setPreview(url)}>
              {isVideo ? (
                <video src={url} muted width="100%" />
              ) : (
                <img src={url} alt={`media-${index}`} />
              )}
            </div>
          );
        })}
      </div>

      {preview && (
        <div className="overlay" onClick={() => setPreview(null)}>
          {preview.includes(".mp4") || preview.includes(".webm") ? (
            <video src={preview} controls autoPlay />
          ) : (
            <img src={preview} alt="preview" />
          )}
        </div>
      )}
    </div>
  );
}

export default GaleriePage;
