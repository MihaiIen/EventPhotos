// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// 🔐 Configurația Firebase (personalizată pentru proiectul tău)
const firebaseConfig = {
  apiKey: "AIzaSyDjF6Bc_WpY8w4RguzzPa_kILGIyEpv5VQ",
  authDomain: "event-photos-beige.firebaseapp.com",
  projectId: "event-photos-beige",
  storageBucket: "event-photos-beige.appspot.com",
  messagingSenderId: "1077793789573",
  appId: "1:1077793789573:web:864d6ecfc006af728e7bec"
};

// 🔧 Inițializează Firebase
const app = initializeApp(firebaseConfig);

// ✅ App Check cu reCAPTCHA v3 — asigură-te că ai cheia PUBLICĂ de la Google
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Lc0RE8rAAAAALfqWsm83rFrctqT9sbXv4j4jYpI"),
  isTokenAutoRefreshEnabled: true,
});

// 🔥 Exportă serviciile Firebase
export const storage = getStorage(app);
export const db = getFirestore(app);
export { app };
