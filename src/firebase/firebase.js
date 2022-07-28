import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getDoc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";

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

// Add game data to Firestore under "games" collection.
async function dbAddGame(game) {
  try {
    await setDoc(doc(db, "games", game.id), {
      id: game.id,
      name: game.name,
      difficulty: game.difficulty,
      url: game.url,
      size: game.size,
      targets: game.targets,
    });
    console.log("Game data written: ", game.id);
  } catch(e) {
    console.error("Error adding document: ", e);
  }
}

// Retrieve specific game data from Firestore.
async function dbGetGame(game) {
  const docRef = doc(db, "games", game.id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    // console.log("Document data: ", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
}

// Add user time data to Firestore under "leaderboard" colleciton.
async function dbAddUserScore(userName, time, game) {
  try {
    await addDoc(collection(db, "leaderboard", game.id, "users"), {
      userName: userName,
      time: time,
      timeStamp: serverTimestamp(),
    });
    console.log("User score written: ", userName);
  } catch(e) {
    console.error("Error adding user score: ", e);
  }
}

export { dbAddGame, dbGetGame, dbAddUserScore };