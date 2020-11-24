import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from 'react-firebase-hooks/firestore';


firebase.initializeApp({
  apiKey: "AIzaSyDCzcukPLGnEPThI2_86hIeqHXTHjv4HLs",
  authDomain: "react-livechat-9c29d.firebaseapp.com",
  databaseURL: "https://react-livechat-9c29d.firebaseio.com",
  projectId: "react-livechat-9c29d",
  storageBucket: "react-livechat-9c29d.appspot.com",
  messagingSenderId: "1034760244529",
  appId: "1:1034760244529:web:ea91f5ac20bf341e0e7410",
  measurementId: "G-7YBZ2S785F"
})

const auth = firebase.auth();
const firestore = firebase.girestore();




function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
