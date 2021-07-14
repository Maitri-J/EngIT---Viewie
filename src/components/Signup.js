import {React, useRef, useState, } from 'react'
import { useAuthContext } from '../context/AuthProviders'
import { FBaseAuth, addNewUsertoFBaseDB } from '../tools/Firebase'

import { Link } from 'react-router-dom'


const Signup = () => {
    // similar to useState but value is held after re-render
    const userNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    
    // holds messages for success/ failure messages
    const [message, setMessage] = useState(null);

    // holds state for if promise is being processed
    const [isLoading, setLoading] = useState(false);

    // retrieve the signup function given by the Auth Provider
    const { signup, currentUser, googleLogin, setUser, logout } = useAuthContext()

    // runs when the form is submit
    const submitForm = (e) => {
        e.preventDefault();

        // Checks to ensure password typed are the same 
        if(passwordConfirmRef.current.value !== passwordRef.current.value){
            setMessage("Error: Passwords entered do not match");
            return;
        }
        
        setLoading(true);

        // call signup function from AuthProvider 
        signup(emailRef.current.value, passwordRef.current.value)
        .then((userCredential) => {
          // Signed in

          // console.log(`${JSON.stringify(userCredential.user)}`)

          // adds the new user to the database
          addNewUsertoFBaseDB(userCredential.user, userNameRef.current.value)
          FBaseAuth.currentUser.sendEmailVerification()
          
          .then(() => {
            // Email verification sent!
            // ...
            setMessage("Confirmation email sent please verify to login");
          });
        })

        .catch((error) => {
        //   var errorCode = error.code;
          var errorMessage = error.message;
          setMessage(errorMessage);
          // ..
        });
        
        logout();

        setLoading(false);  
    }

    return (
        <div class="register" id="register">
            <h1>Register:</h1>
            
            <form onSubmit={submitForm}>
              
                {/* Return Error/ Success Message */}
                {message != null &&
                <p>{message}</p>}

                {currentUser && JSON.stringify(currentUser)}

                <label>Username: </label>
                <input type="text" id="username" ref={userNameRef} /><br />

                <label>Email: </label>
                <input type="text" id="email" ref={emailRef} /><br />

                <label>Password: </label>
                <input type="password" id="password" ref={passwordRef} /><br />
                <input type="password" id="confirmPassword" ref={passwordConfirmRef} /><br />

                {/* <p style="color:red" id="errorMessage"></p> */}

                {!isLoading &&
                <button type="submit">Create Account</button>     
                }
                or 

                {/* Need to create google login */}
                <button onClick={googleLogin}>Sign in with google</button>

                <p>Already have an account? <Link to="/login">Login</Link></p>
                <p><Link to="/">Home</Link></p>

            </form>
        </div>
    )
}

export default Signup;
