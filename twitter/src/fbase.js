import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPQC9Bo2yU6lgYG7pZ7Q58otQ_ZOq9TQM",
  authDomain: "twitterclonecoding-8b86b.firebaseapp.com",
  projectId: "twitterclonecoding-8b86b",
  storageBucket: "twitterclonecoding-8b86b.appspot.com",
  messagingSenderId: "826278578751",
  appId: "1:826278578751:web:3dbc7e5c8ff60af193068a"
};

const firebaseApp = initializeApp(firebaseConfig)
export const authService = getAuth(firebaseApp);