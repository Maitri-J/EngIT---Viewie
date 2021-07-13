import React, { createContext, useState, useEffect, useContext } from 'react'
import { FBase, FBaseAuth, firebase } from '../tools/Firebase';

const AuthContext = createContext();

// export to allow child react elements to use auth hook
const useAuthContext = () => {
    return useContext(AuthContext);
}



// Implementation of Google Login/ Logout/ Signup

const AuthProviders = ({ children }) => {

    // Default - user not logged in
    // Holds a global state for all components if a user is logged in
    const [currentUser, setUser] = useState(null);

    // only set when login state has changed
    useEffect(() => {
        const unsubscribe = FBaseAuth.onAuthStateChanged(user => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                var FBaseUser = FBaseAuth.currentUser;
          
                if (FBaseUser != null){
                  if (FBaseUser.emailVerified){
                    // route to home page and logged in => routing yet to be implemented
                    setUser(FBaseUser);

                    // window.open("home.html", "_self");

                  } else {
                    FBaseAuth.signOut();
                  }
                }
              } else {
                // User is signed out
                // ...
              }
            
        })

        // removes the onAuthStateChanged Listener when AuthProvider component is unmounted
        return unsubscribe;
    }, [])
    
    const regularLogin = (email, password) => {
      // API Call to Firebase => Login
      return FBaseAuth.signInWithEmailAndPassword(email, password);
    }

    const googleLogin = () => {
      // API Call to Firebase => Login with Google Account

      var provider = new firebase.auth.GoogleAuthProvider();

      FBaseAuth
      .signInWithPopup(provider)
      .then((result) => {
        // /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
    
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        setUser(result.user);
        // ...

      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(`${errorCode}, ${errorMessage}, ${email}, ${credential}`)
      });
    }

    const logout = () => {
      // API Call to Firebase => Logout
      return FBaseAuth.signOut();
    }

    const signup = (email, password) => {
      // API Call to Firebase => Signup
      return FBaseAuth.createUserWithEmailAndPassword(email, password);
    }

    const resetPassword = (email) => {
      return FBaseAuth.sendPasswordResetEmail(email);
    }

    return (
        // Providing context for all children react elements to use => similar to global state
        // We pass user information and the ability to login and logout function

        <AuthContext.Provider value={{currentUser, regularLogin, googleLogin, 
        logout, signup, resetPassword, setUser}}>
            {children}
        </AuthContext.Provider>    
    )
}

export {AuthProviders, useAuthContext}