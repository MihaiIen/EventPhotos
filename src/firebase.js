// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// 🔐 Config nou de la proiectul „nunta2-a6b5a”
const firebaseConfig = {
  apiKey: "AIzaSyARCzhlbGwIT8iAZprL7-lReMkM7MFD17g",
  authDomain: "nunta2-a6b5a.firebaseapp.com",
  projectId: "nunta2-a6b5a",
  storageBucket: "nunta2-a6b5a.appspot.com", // ❗️corectat aici
  messagingSenderId: "982328099105",
  appId: "1:982328099105:web:82fac091ca59d2e58dbe60"
};

// 🔧 Inițializează Firebase
const app = initializeApp(firebaseConfig);

// ✅ Activează App Check (cu cheia ta reCAPTCHA v3)
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Lc0RE8rAAAAALfqWsm83rFrctqT9sbXv4j4jYpI"),
  isTokenAutoRefreshEnabled: true,
});

// 🔥 Exportă serviciile
export const storage = getStorage(app);
export const db = getFirestore(app);
export { app };
