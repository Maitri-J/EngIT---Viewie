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
        <div class="forgotPasswordDiv">
            
            <img src="images/viewie.png" className="logoForgot" alt="viewielogo" />
            <span className="resetPasswordForgot">Reset Password</span>
            <span className="textDescriptionForgot">Enter your email address & we’ll send you a link to reset your password</span>
            <span className="textExampleForgot">e.g. youremail@gmail.com</span>

            <form onSubmit={submitForm}>
                {message != null && <span className="messageForgot">{message}</span>}

                <input class="emailInputForgot" type="text" ref={resetEmailRef} />

                {/* <span style={{color: 'black'}} id="message" class="message"></span> */}
                <button class="sendForgot" type="submit" >Send</button>
            </form>
                

            <Link to="/login"><span class="backForgot">Back</span></Link>

            <span class="notAMemberForgot">Not a member? <Link to="/signup">Register Now</Link></span>
        </div>
    )
}

export default ForgetPassword
