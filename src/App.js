import React, { useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';


import { useRef } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
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
});
firebase.analytics();


const auth = firebase.auth();
const firestore = firebase.firestore();




function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-Header">
        <h1>Messages</h1>
        <SignOut />

      </header>

      <section className="App-main">
        {user ? <ChatRoom /> : <SignIn />}

      </section>
    </div>
  );
}



function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>

  );

}

function SignOut() {
  return auth.currentUser && (

    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  );
}


function ChatRoom() {


  const dummy = useRef(); 
   

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  // Try
  // const dummy = messagesRef;


  const sendMessage = async (e) => {

    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');

    dummy.current.scrollIntoView({ behavior: 'smooth' });

  }

  return (
    <>
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy} ></span>


      </main>

      <form onSubmit={sendMessage} >

        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type here" />

        <button type="submit" disabled={!formValue} >▶️</button>


      </form>




    </>
  )
}


function ChatMessage(props) {
  const { text, uid } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>

      <img src="{photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'}}" alt="no" />

      <p>{text}</p>

    </div>
  )
}





export default App;
