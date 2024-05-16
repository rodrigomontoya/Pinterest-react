
import { initializeApp } from "firebase/app";




const firebaseConfig = {
  apiKey: "AIzaSyBOT2OsyMLoVne_q05aRNfjg35JOhgMdx8",
  authDomain: "pinterest-coc.firebaseapp.com",
  projectId: "pinterest-coc",
  storageBucket: "pinterest-coc.appspot.com",
  messagingSenderId: "274505803390",
  appId: "1:274505803390:web:1aea964f285f1ff0b19a2f"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;