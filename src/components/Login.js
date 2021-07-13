import {React, useRef, useState, } from 'react'
import { useAuthContext } from '../context/AuthProviders'
import { FBaseAuth } from '../tools/Firebase'

import { NavLink, Link } from 'react-router-dom'

const Login = () => {
    // similar to useState but value is held after re-render
    const userNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    
    // holds messages for success/ failure messages
    const [message, setMessage] = useState(null);

    // holds state for if promise is being processed
    const [isLoading, setLoading] = useState(false);

    // retrieve the signup function given by the Auth Provider
    const { signup, currentUser } = useAuthContext()

    // runs when the form is submit
    const submitForm = (e) => {
        e.preventDefault();
        
        setLoading(true);

        // call signup function from AuthProvider 
        signup(emailRef.current.value, passwordRef.current.value)
        .then((userCredential) => {
          // Signed in
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

        setLoading(false);  
    }

    return (
        <div class="login" id="login">
            <h1>Login:</h1>
            
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

                {/* <p style="color:red" id="errorMessage"></p> */}

                {!isLoading &&
                <button type="submit">Login</button>     
                }
                or 

                {/* Need to create google login */}
                <button onclick="googleLogin()">Sign in with google</button>
                

                <p>Need an account? <Link to="/signup">Sign Up</Link></p>
            </form>
        </div>
    )
}

export default Login
