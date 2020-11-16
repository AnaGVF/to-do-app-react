import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyARMiax4UedzNqa_5fCTXL7QLo_VuT3xbU",
    authDomain: "todo-app-f3436.firebaseapp.com",
    databaseURL: "https://todo-app-f3436.firebaseio.com",
    projectId: "todo-app-f3436",
    storageBucket: "todo-app-f3436.appspot.com",
    messagingSenderId: "1033929349955",
    appId: "1:1033929349955:web:4fe5eee4d2e28143062df6",
    measurementId: "G-4S9SX2DNST"
});

const db = firebaseApp.firestore();

export default db;