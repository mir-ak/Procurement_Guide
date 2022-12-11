import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyBdIgL7mrTMgjU2d6Tp2t_R2sbfDf48VBU",
  authDomain: "portfolioweb-3106e.firebaseapp.com",
  databaseURL:
    "https://portfolioweb-3106e-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "portfolioweb-3106e",
  storageBucket: "portfolioweb-3106e.appspot.com",
  messagingSenderId: "1076042004611",
  appId: "1:1076042004611:web:9b7042918a1d82f79203b6",
  measurementId: "G-7VTL8N9119",
};

const firebaseApp = initializeApp(firebaseConfig);
const databaseApp = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);
export { auth };
export default databaseApp;
