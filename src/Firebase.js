import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCEdGs-i9GxrkLeqb0q0n7-Ec2SwGgEvxI",
  authDomain: "ieee-custom-forms-181e4.firebaseapp.com",
  projectId: "ieee-custom-forms-181e4",
  storageBucket: "ieee-custom-forms-181e4.appspot.com",
  messagingSenderId: "182981659642",
  appId: "1:182981659642:web:5b996efc9b10edca543243",
  measurementId: "G-NJTMLT75G5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth();

export {app,auth}; 