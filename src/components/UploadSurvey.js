import React, { useRef, useState } from 'react'
import { useAuthContext } from '../context/AuthProviders'
import { addSurvey } from '../tools/Firebase'
import { Link, Redirect } from 'react-router-dom'
import TopNav from './Topnav'



const UploadSurvey = () => {
    const surveyLinkRef = useRef();
    const durationRef = useRef();
    const maxParticipantsRef = useRef();
    const boostRef = useRef();
    const surveyNameRef = useRef();
    const descRef = useRef();
    const tagRef = useRef();
    // How do we include Tags ref??
    
    const { currentUser } = useAuthContext();
    
    const [message, setMessage] = useState(null);
    const [isSubmitted, setSubmitted] = useState(false);

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
            participant: maxParticipantsRef.current.value,
            creditBoost: boostRef.current.value,
            length: durationRef.current.value,
            tags: []
        }

        // console.log(JSON.stringify(currentUser));
        // console.log(JSON.stringify(currentUser.uid));

        addSurvey(surveyInfo, currentUser.uid);

        setMessage("Survey has been successfully uploaded");

        // Provides a delay so that user knows survey has been uploaded successfully
        setTimeout(() => {
            setSubmitted(true);
        }, 3000);
    }

    const showBoost = () => {
        setMessage("boost option selected");
    }


    return (
        <div>
            {/* Prompt user to login if they are attempting to upload survey without account,
            else render upload survey form */}
            {
            (!currentUser)? 
                <div>
                    <p>Please Login</p>
                    <Link to="/login">Login Here</Link>
                </div>
            :
            <div className="upload" id="upload">
                <TopNav noCredits={0}/>
                <span class="upload-title">Let’s upload your survey</span>
            
                <form onSubmit={SubmitForm}>

                    {/* Return Error/ Success Message */}
                    {message != null && <p>{message}</p>}
                    <div className="left-survey">
                        <label className="survey-link">Survey Link</label>
                        <input type="text" id="surveyLinkInput" ref={surveyLinkRef} required={true} 
                        placeholder="   Put in the link to your google form here..."/><br />

                        <label className="estimated-time">Estimated time to finish this survey</label>
                        <input type="number" id="timeInput" min="1" max="120" ref={durationRef} required={true}
                        placeholder="   minutes" textAlign='center'/><br />

                        {/* max participants 1k for now, can change later*/} 
                        <label className="max-participants">How many participants do you need for your project?</label>
                        <input type="number" id="participantsInput" min="1" max="1000" ref={maxParticipantsRef} required={true} 
                        placeholder="    people" textAlign='center'/><br />

                        {/* Would you like to boost your survey? - goes here  */}
                        <label className="boost">How many credit would you like to use to boost survey?</label>
                        <div>
                            <input type="submit" class="noBoostBtn" value="Nah I'm good for now" onClick={showBoost} />
                            <input type="submit" class="yesBoostBtn" value="Hells yeah" onClick={showBoost} />
                            
                        </div>
                        <input type="number" id="boostInput" min="0" max="500" ref={boostRef} required={true}/>
                    </div>
                    
                    <div className="right-survey">
                        <label className="survey-name">Survey Name</label>
                        <input type="text" id="surveyNameInput" ref={surveyNameRef} required={true} 
                        placeholder="   What is the title of your survey..."/><br />

                        <label className="survey-description">Description</label>
                        <textarea id="surveyDescriptionInput" rows="10" cols="30" ref={descRef} required={true} 
                        placeholder="  Write a short sentence describing your survey..."></textarea><br />
                        
                        {/* Tags go here */}
                        <label className="survey-tags">Tags</label>
                        <input type="text" id="surveyTagInput" ref={tagRef} required={true} 
                        placeholder="   Click on the tags that fits your survey..."/><br />
                    </div>
                    
                    <div class="lower-button">
                        <button type="submit" class="cancelBtn" onclick="goBack()"> Cancel </button> 
                        <button type="submit" class="uploadBtn"> Upload </button>
                    </div> 

                </form>
            </div>
            }

            {/* Redirect user to dashboard if survey has been submitted */}
            {
                (isSubmitted) && <Redirect to="/dashboard"/>
            }
        </div>
    )
}

export default UploadSurvey
