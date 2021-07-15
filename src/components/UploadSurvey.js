import React, { useRef, useState } from 'react'
import { addSurvey } from '../tools/Firebase'
import { useAuthContext } from '../context/AuthProviders'
import { Link } from 'react-router-dom'

const UploadSurvey = () => {
    const surveyLinkRef = useRef();
    const durationRef = useRef();
    // const maxParticipantsRef = useRef();
    const boostRef = useRef();
    const surveyNameRef = useRef();
    const descRef = useRef();
    // How do we include Tags ref??
    
    const { currentUser } = useAuthContext();
    
    const [message, setMessage] = useState(null);

    const SubmitForm = (e) => {
        e.preventDefault();

        // if not logged in and trying to submit a survey
        if(!currentUser){
            setMessage("Please sign in before uploading a survey");
            return;
        }

        // Need to get tags somehow...
        // tags: surveyInfo.tags
        const surveyInfo = {
            title: surveyNameRef.current.value,
            desc: descRef.current.value,
            link: surveyLinkRef.current.value,
            creditBoost: boostRef.current.value,
            length: durationRef.current.value,
            tags: []
        }

        console.log(JSON.stringify(currentUser));
        console.log(JSON.stringify(currentUser.uid));

        addSurvey(surveyInfo, currentUser.uid);

        setMessage("Survey has been successfully uploaded");
    }


    return (
        <div>
            {/* Prompt user to login if they are attempting to upload survey without account,
            else render upload survey form */}
            {
            (!currentUser)
            ? 
                <div>
                    <p>Please Login</p>
                    <Link to="/login">Login Here</Link>
                </div>
            :
                <form onSubmit={SubmitForm}>

                    {/* Return Error/ Success Message */}
                    {message != null &&
                    <p>{message}</p>}

                    <label>Survey Link</label>
                    <input type="text" id="surveylink" ref={surveyLinkRef} required={true} /><br />

                    <label for="hour">Estimated time to finish this survey</label>
                    <input type="number" id="minutes" min="1" max="120" ref={durationRef} required={true}/>

                    <label for="hour">How many credit would you like to use to boost survey?</label>
                    <input type="number" id="minutes" min="0" max="500" ref={boostRef} required={true}/>

                    {/* <label for="hour">How many participants do you need for your survey?</label>
                    <input type="number" id="minutes" min="1" max="1000" ref={maxParticipantsRef} required={true} /> */}

                    {/* Would you like to boost your survey? - goes here  */}
                    
                    <label>Survey Name</label>
                    <input type="text" id="surveylink" ref={surveyNameRef} required={true} /><br />
                    
                    <label>Description</label>
                    <textarea name="description" rows="10" cols="30" ref={descRef} required={true}></textarea>

                    {/* Tags go here */}

                    <button type="submit">Done</button>     

                </form>
            }
        </div>
    )
}

export default UploadSurvey
