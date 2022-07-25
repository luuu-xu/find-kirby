import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMuTilPQm3jyEBEB3SS1VW7KgRROfdJVI",
  authDomain: "findkirby-87467.firebaseapp.com",
  projectId: "findkirby-87467",
  storageBucket: "findkirby-87467.appspot.com",
  messagingSenderId: "998131176273",
  appId: "1:998131176273:web:2827808a625fdf80363970"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;