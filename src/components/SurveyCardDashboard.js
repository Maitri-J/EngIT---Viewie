import React from 'react'
import { Link } from 'react-router-dom'

const SurveyCardDashboard = ({ title, desc, length, creditBoost }) => {
    return (
        <Link to={{
            pathname: "/complete",
            state: {
              link: "https://docs.google.com/forms/d/e/1FAIpQLSejd99Ca9klqZYVNP0WLEJJJ024jRqQRDX_Lf5erHR4FFWGeg/viewform?embedded=true",
            },
            }}>
        <div className="surveyBox">
            <span className="cardTitle">{title}</span>
            <span className="cardDesc">{desc}</span>
            <span className="cardCredit">Credit: {(length)*10}</span>
            <span className="cardTime">{length} min</span>
            <span className="cardPeopleText">{creditBoost}</span>
            <img src="images/boostDash.png" className="boostDash"/>
            <img src="images/dots.png" className="dots"/>
            <img src="images/tags.png" className="cardTags"/>
            <img src="images/likes.png" className="cardLikes"/>
            <img src="images/people.png" className="cardPeople"/>
            <img src="images/clock.png" className="cardClock"/>
        </div>
        </Link>
    )
}

// const SurveyCard = ({ surveyInfo }) => {
//         console.log(`Testing:  ${JSON.stringify(surveyInfo)}`);
//         console.log(surveyInfo.creditBoost);

//         return (
//             <Link to="/complete">
//             <div className="surveyBox">
//                 <span className="cardTitle">{surveyInfo.title}</span>
//                 <span className="cardDesc">{surveyInfo.desc}</span>
//                 <span className="cardCredit">Credit: {(surveyInfo.length)*10}</span>
//                 <span className="cardTime">{surveyInfo.length} min</span>
//                 <span className="cardPeopleText">{surveyInfo.creditBoost}</span>
//                 <img src="images/tags.png" className="cardTags"/>
//                 <img src="images/likes.png" className="cardLikes"/>
//                 <img src="images/people.png" className="cardPeople"/>
//                 <img src="images/clock.png" className="cardClock"/>
//             </div>
//             </Link>
//         )
//     }

export default SurveyCardDashboard

const styles = {
    border: '1px solid black'
}