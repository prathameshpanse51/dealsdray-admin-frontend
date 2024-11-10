import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCKSjd0lX3cv47F72M2oNhoUAG-saecdO4",
  authDomain: "evento-386813.firebaseapp.com",
  projectId: "evento-386813",
  storageBucket: "evento-386813.appspot.com",
  messagingSenderId: "17807023590",
  appId: "1:17807023590:web:7bccd5f65869c34e980a27",
  measurementId: "G-HGHZQH5H6Q",
  crossOriginIsolated: false,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage, app };
