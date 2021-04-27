import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyClW6RQaOn8x_5EaGWIiA7ykS0ks59_-WM",
    authDomain: "vue-fire-todo-7a72f.firebaseapp.com",
    projectId: "vue-fire-todo-7a72f",
    storageBucket: "vue-fire-todo-7a72f.appspot.com",
    messagingSenderId: "499968820054",
    appId: "1:499968820054:web:a9d4f549544108047f0cf7",
    measurementId: "G-P8G5H1LRSZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// export const db = firebase.initializeApp(firebaseConfig).firestore();

export const storage = firebase.storage();

