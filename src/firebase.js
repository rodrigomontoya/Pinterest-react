// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Importa el módulo de autenticación
import {getFirestore}from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7hZ42yfc8bCCaz_hFY0hZevhoXEHgqyg",
  authDomain: "login-pinterest.firebaseapp.com",
  projectId: "login-pinterest",
  storageBucket: "login-pinterest.appspot.com",
  messagingSenderId: "21258635152",
  appId: "1:21258635152:web:d0fca6da36b74554621515"
};


// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Obtiene una instancia del módulo de autenticación
const db = getFirestore (app);

export { auth }; // Exporta la instancia de autenticación para usarla en otros archivos
export {db};