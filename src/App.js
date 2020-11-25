import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


firebase.initializeApp({
  apiKey: "AIzaSyDCzcukPLGnEPThI2_86hIeqHXTHjv4HLs",
  authDomain: "react-livechat-9c29d.firebaseapp.com",
  databaseURL: "https://react-livechat-9c29d.firebaseio.com",
  projectId: "react-livechat-9c29d",
  storageBucket: "react-livechat-9c29d.appspot.com",
  messagingSenderId: "1034760244529",
  appId: "1:1034760244529:web:ea91f5ac20bf341e0e7410"
})

const auth = firebase.auth();
const firestore = firebase.firestore();




function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-Header">
    

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
      
      <button onClick={ () => auth.signOut()}>Sign Out</button>
      );
    }
    
    
    function ChatRoom() {
      
      const messagesRef = firebase.collection('messages');
      const query = messagesRef.orderBy('createdAt').limit(25);
      
      const [messages] = useCollectionData(query, {idField: 'id'});
      
      
      return(
        <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} /> )}
      </div>
    
    </>
  )
}


function ChatMessage(props) {
  const { text, uid } = props.message;
  
  
  
  return <p>{text}</p>
}





export default App;
