import {React, useRef, useState, } from 'react'
import { useAuthContext } from '../context/AuthProviders'
import '../stylesheets/all.css';
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
        <div className="login" id="login">

            <img src="images/viewie.png" className="logo"/>
            <img src="images/abstract.png" className="abstract"/>
            <img src="images/confetti.png" className="confetti"/>
            <img src="images/white.png" className="white"/>
            <span className="accessContent">Login to Access more content.</span>
            <span className="loginText">Login</span>
            
            <form onSubmit={submitForm}>
              
                {/* Return Error/ Success Message */}
                {message != null &&
                <span className="errorMessage">{message}</span>}

                {currentUser && JSON.stringify(currentUser)}

                {/*
                <label>Username: </label>
                <input type="text" id="username" ref={userNameRef} /><br />
                */}

                <label className="emailText">Email address</label>
                <input className="emailInput" type="text" id="email" ref={emailRef} />

                <label className="passwordText">Password</label>
                <input className="passwordInput" type="password" id="password" ref={passwordRef} />

                {/* <span style="color:red" id="errorMessage" class="errorMessage"></span> */}

                <span className="forgotPassword"><Link to="/resetpassword">Forget your password?</Link></span>

                <button className="loginBtn" type="submit">Login</button>    
                <div className="or">
                  <img src="images/lines.png" className="lines"/>
                  <span className="orText">or</span>
                </div>

                {/* Need to create google login */}

                <div className="googleBtn" onClick={googleLogin}>
                  <img src="images/google.png" className="googleLogo"/>
                  <span className="googleText">Sign in with google</span>
                </div>
                

                <span className="noAccount">Don't have an account? <Link to="/signup">Register Now</Link></span>
                <Link to="/">
                  <img src="images/cross.png" class="cross"/>
                </Link>

                {currentUser && <Redirect to="/"/>}
            </form>
        </div>
    )
}

export default Login
