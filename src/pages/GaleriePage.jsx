import React, { useEffect, useState } from "react";
// import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
// import { app } from "../firebase"; // dacă vrei să folosești Firebase
import "../GaleriePage.css";

const GaleriePage = () => {
  const [mediaList, setMediaList] = useState([]);

  useEffect(() => {
    // 🔄 Test cu imagini locale din public/test
    const testImages = [
      "/test/foto1.jpg",
      "/test/foto2.jpg",
      "/test/foto3.jpg"
    ];
    setMediaList(testImages);

    // 🔄 Dacă vrei să folosești Firebase, decomentează mai jos:
    /*
    const fetchMedia = async () => {
      const storage = getStorage(app);
      const listRef = ref(storage, "galerie/");
      const result = await listAll(listRef);
      const urls = await Promise.all(
        result.items.map((itemRef) => getDownloadURL(itemRef))
      );
      setMediaList(urls);
    };

    fetchMedia();
    */
  }, []);

  return (
    <div className="galerie-container">
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <img
          src="/titlu.png"
          alt="Gazeta Căsătoriilor"
          style={{ maxWidth: "80%", height: "auto" }}
        />
      </div>

      <a href="/" className="back-button">Înapoi</a>

      <div className="grid">
        {mediaList.map((url, index) => (
          <div key={index} className="grid-item">
            {url.includes(".mp4") ? (
              <video src={url} controls />
            ) : (
              <img src={url} alt={`Media ${index}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GaleriePage;
