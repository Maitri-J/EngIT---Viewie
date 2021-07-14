import {React, useRef, useState, } from 'react'
import { useAuthContext } from '../context/AuthProviders'
import { FBaseAuth, addNewUsertoFBaseDB } from '../tools/Firebase'

import { Link } from 'react-router-dom'


const Signup = () => {
    // similar to useState but value is held after re-render
    const userNameRef = useRef()
    const emailRef = useRef()
    const emailConfirmRef = useRef()
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
          setMessage("Passwords entered do not match");
          return;
        }

        // Checks to ensure password typed are the same 
        if(emailConfirmRef.current.value !== emailRef.current.value){
          setMessage("Emails entered do not match");
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
        <div className="signup">
            <span className="alreadyHaveAccountReg">Already have an account? <Link to="/login">Login</Link></span>
            <span className="registerTextReg">Register</span>
            <img src="images/viewie.png" className="logoReg"/>
            <img src="images/person.png" className="personReg"/>
            <img src="images/confetti2.png" className="confettiReg"/>
            <img src="images/white.png" className="whiteReg"/>
            
            <form onSubmit={submitForm}>
              
                {/* Return Error/ Success Message */}
                {message != null &&
                <span className="errorMessageReg">{message}</span>}

                {currentUser && JSON.stringify(currentUser)}

                <span className="usernameTextReg">Username</span>
                <input type="text" className="usernameInputReg" id="username" ref={userNameRef} />

                <span className="emailTextReg">Email</span>
                <input type="text" className="emailInputReg" id="email" ref={emailRef} />

                <span className="confirmEmailTextReg">Confirm Email</span>
                <input type="text" ref={emailConfirmRef} className="confirmEmailInputReg"></input>

                <span className="passwordTextReg">Password</span>
                <input type="password" ref={passwordRef} className="passwordInputReg" />

                <span className="confirmPasswordTextReg">Confirm Password</span>
                <input type="password" ref={passwordConfirmRef} className="confirmPasswordInputReg"/>

                {/* <p style="color:red" id="errorMessage"></p> */}

                {!isLoading &&
                <button className="registerBtnReg" type="submit">Create Account</button>     
                }
                
                <div class="orReg">
                  <img src="images/lines.png" class="linesReg"/>
                  <span className="orTextReg">or</span>
                </div>

                {/* Need to create google login */}
                <div className="googleBtnReg" onClick={googleLogin}>
                  <img src="images/google.png" className="googleLogoReg"/>
                  <span className="googleTextReg">Sign in with google</span>
                </div>

                <Link to="/">
                  <img src="images/cross.png" className="cross"/>
                </Link>

            </form>
        </div>
    )
}

export default Signup;
