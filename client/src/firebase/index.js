import firebase from 'firebase/app';
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA8Q1tx6Y3WPZ5OS0spROv8kD_YSZijGl0",
    authDomain: "agtown-movies.firebaseapp.com",
    projectId: "agtown-movies",
    storageBucket: "agtown-movies.appspot.com",
    messagingSenderId: "1050871160315",
    appId: "1:1050871160315:web:0660fa4467fb63824eff5e",
    measurementId: "G-N0WJ21CN1T"
  };

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();
  const storageRef = storage.ref();
  const imagesRef = storageRef.child('images');

  export {storageRef, imagesRef, firebase as default};