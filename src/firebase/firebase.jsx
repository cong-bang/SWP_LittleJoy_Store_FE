// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPy8FsOBZTGpgOAx-1LdpbikygEkQforM",
  authDomain: "little-joy-2c5d3.firebaseapp.com",
  projectId: "little-joy-2c5d3",
  storageBucket: "little-joy-2c5d3.appspot.com",
  messagingSenderId: "917130618351",
  appId: "1:917130618351:web:11f1bcad5d6f08da61c21a",
  measurementId: "G-96QJ491VYF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
