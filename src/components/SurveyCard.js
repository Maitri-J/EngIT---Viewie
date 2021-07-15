import React from 'react'

const SurveyCard = ({ surveyInfo }) => {
    return (
        <div className="surveyBox">
                <span className="cardTitle">Title</span>
                <span className="cardDesc">this is a description for a survey card</span>
                <span className="cardCredit">Credit: 100</span>
                <span className="cardTime">20 min</span>
                <span className="cardPeopleText">200</span>
                <img src="images/tags.png" className="cardTags"/>
                <img src="images/likes.png" className="cardLikes"/>
                <img src="images/people.png" className="cardPeople"/>
                <img src="images/clock.png" className="cardClock"/>
        </div>
        /*
        <div style={styles}>
            <p>{surveyInfo.title}</p>
            <p>{surveyInfo.desc}</p>
            <p>{surveyInfo.creditBoost}</p>
            <p>{surveyInfo.length}</p>
            <p>{surveyInfo.link}</p>
            <p>{surveyInfo.publisherID}</p>
        </div>
        */
    )
}

export default SurveyCard

const styles = {
    border: '1px solid black'
}