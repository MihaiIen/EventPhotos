import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
   apiKey: "AIzaSyDjF6Bc_WpY8w4RguzzPa_kILGIyEpv5VQ",
  authDomain: "event-photos-beige.firebaseapp.com",
  projectId: "event-photos-beige",
  storageBucket: "event-photos-beige.firebasestorage.app",
  messagingSenderId: "1077793789573",
  appId: "1:1077793789573:web:864d6ecfc006af728e7bec"
};

const app = initializeApp(firebaseConfig);

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("SITE_KEY"),
  isTokenAutoRefreshEnabled: true
});

export const storage = getStorage(app);
export const db = getFirestore(app);
