import {React, useRef, useState, } from 'react'
import { useAuthContext } from '../context/AuthProviders'
import '../stylesheets/login.css';
import logo from '../resources/viewie.png'
import { FBaseAuth } from '../tools/Firebase'

import { Link, Redirect } from 'react-router-dom'

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
            setUser(null);
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

            <img src="images/viewie.png" class="logo"/>
            <img src="images/abstract.png" class="abstract"/>
            <img src="images/confetti.png" class="confetti"/>
            <img src="images/white.png" class="white"/>
            <span class="accessContent">Login to Access more content.</span>
            <span class="loginText">Login</span>
            
            <form onSubmit={submitForm}>
              
                {/* Return Error/ Success Message */}
                {message != null &&
                <span className="errorMessage">{message}</span>}

                {currentUser && JSON.stringify(currentUser)}

                {/*
                <label>Username: </label>
                <input type="text" id="username" ref={userNameRef} /><br />
                */}

                <label class="emailText">Email address</label>
                <input class="emailInput" type="text" id="email" ref={emailRef} /><br />

                <label class="passwordText">Password</label>
                <input class="passwordInput" type="password" id="password" ref={passwordRef} /><br />

                {/* <span style="color:red" id="errorMessage" class="errorMessage"></span> */}

                <span class="forgotPassword"><Link to="/resetpassword">Forget your password?</Link></span>

                <button class="loginBtn" type="submit">Login</button>    
                <div class="or">
                  <img src="images/lines.png" class="lines"/>
                  <span class="orText">or</span>
                </div>

                {/* Need to create google login */}

                <div class="googleBtn" onClick={googleLogin}>
                  <img src="images/google.png" class="googleLogo"/>
                  <span class="googleText">Sign in with google</span>
                </div>
                

                <span class="noAccount">Don't have an account? <Link to="/signup">Register Now</Link></span>
                <Link to="/">
                  <img src="images/cross.png" class="cross"/>
                </Link>

                {currentUser && <Redirect to="/dashboard"/>}
            </form>
        </div>
    )
}

export default Login
