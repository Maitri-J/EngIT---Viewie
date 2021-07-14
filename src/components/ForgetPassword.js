import React, {useRef, useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthProviders'

import viewielogo from '../resources/viewie.png'

const ForgetPassword = () => {
    const resetEmailRef = useRef();

    // holds messages for success/ failure messages
    const [message, setMessage] = useState(null);

    const { resetPassword } = useAuthContext();

    const submitForm = (e) => {
        e.preventDefault();

        resetPassword(resetEmailRef.current.value)
        .then(() => {
            // Password reset email sent!
            // ..
            setMessage("Reset Email Sent");

          })
        .catch((error) => {
            // var errorCode = error.code;
            var errorMessage = error.message;

            // document.getElementById("message").style.color = "red";
            // document.getElementById("message").innerHTML = errorMessage;

            setMessage(errorMessage);
            // ..
          });
    }

    return (
        <div class="forgotPassword" id="forgotPassword">
            
            <img src={viewielogo} class="logo" alt="viewielogo" />
            <span class="resetPassword">Reset Password</span>
            <span class="textDescription">Enter your email address and we’ll send you a link to reset your password</span>
            <span class="textExample">e.g. youremail@gmail.com</span>

            <form onSubmit={submitForm}>
                {!message && <p>{message}</p>}

                <input class="emailInput" type="text" id="email" ref={resetEmailRef} /><br />

                {/* <span style={{color: 'black'}} id="message" class="message"></span> */}
                <button class="send" type="submit" >Send</button>
            </form>
                

            <Link to="/login"><p class="back">Back</p></Link>

            <span class="notAMember">Not a member? <Link to="/signup">Register Now</Link></span>
        </div>
    )
}

export default ForgetPassword
