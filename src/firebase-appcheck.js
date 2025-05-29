import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { app } from "./firebase"; // sau ../firebase dacă e în alt folder

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Lc0RE8rAAAAALfqWsm83rFrctqT9sbXv4j4jYpI"),
  isTokenAutoRefreshEnabled: true,
});

export default appCheck;
