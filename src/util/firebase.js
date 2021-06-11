import firebase from 'firebase'
import "firebase/storage"
import "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyAKuALFnhUylZ7-t-KqQubpnIQlExcB2kQ",
    authDomain: "architecture-e3d35.firebaseapp.com",
    projectId: "architecture-e3d35",
    storageBucket: "architecture-e3d35.appspot.com",
    messagingSenderId: "741769435152",
    appId: "1:741769435152:web:f1993c4087cd32e9bc1295",
    measurementId: "G-3D29B2GE3R"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const storage = firebase.storage()
const firestore = firebase.firestore()
const database = firebase.database()

export {storage, firestore, database, firebase}