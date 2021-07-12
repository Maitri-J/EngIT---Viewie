import React from 'react'
import { firebase } from "@firebase/app";
import "firebase/auth"; 
import {
    FirebaseAuthProvider,
    FirebaseAuthConsumer,
    IfFirebaseAuthed,
    IfFirebaseAuthedAnd
  } from "@react-firebase/auth";

const config = require('../google-credentials.json');


const FirebaseProvider = () => {
    return (
        <FirebaseAuthProvider firebase={firebase} {...config}>
            {
                <p>Nice</p>
            }
        </FirebaseAuthProvider>
    )
}

export default FirebaseProvider
