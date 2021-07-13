import {React, useRef, useState, } from 'react'
import { useAuthContext } from '../context/AuthProviders'
import { FBaseAuth } from '../tools/Firebase'

import { Link } from 'react-router-dom'

const Login = () => {
    // similar to useState but value is held after re-render
    const userNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    
    // holds messages for success/ failure messages
    const [message, setMessage] = useState(null);

    // holds state for if promise is being processed
    // const [isLoading, setLoading] = useState(false);

    // retrieve functions given by the Auth Provider
    const { currentUser, googleLogin, regularLogin, setUser, logout } = useAuthContext()

    // runs when the form is submit
    const submitForm = (e) => {
        e.preventDefault();

        // call regularLogin function
        regularLogin(emailRef.current.value, passwordRef.current.value).then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          var emailVerified = user.emailVerified;

          console.log(JSON.stringify(user));

          if (emailVerified){
            // window.open("home.html", "_self");
            setMessage("Successful sign in");
            setUser(user);
          } 
          else {
            setMessage("Please verify your email");
            logout();
          }
          // ...
        })
        .catch((error) => {
            // var errorCode = error.code;
            var errorMessage = error.message;
    
            setMessage(errorMessage);
        });
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

                <Link to="/resetpassword"><p class="forgotPassword">Forget your password?</p></Link>

                <button type="submit">Login</button>    
                or 

                {/* Need to create google login */}
                <button onClick={googleLogin}>Sign in with google</button>
                

                <p>Need an account? <Link to="/signup">Sign Up</Link></p>
            </form>
        </div>
    )
}

export default Login
