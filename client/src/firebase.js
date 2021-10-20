import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCLwaJr0q34QjGddyUMPaG5J-py1cDHc2Q",
  authDomain: "antojos-app.firebaseapp.com",
  projectId: "antojos-app",
  storageBucket: "antojos-app.appspot.com",
  messagingSenderId: "144845961313",
  appId: "1:144845961313:web:ddf4a36b21e4580fcfd220"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const google = new app.auth.GoogleAuthProvider()

export {db, auth, google}