import React from 'react'

const SurveyCard = ({ title, desc, length, creditBoost }) => {
    return (
        <div className="surveyBox">
            <span className="cardTitle">{title}</span>
            <span className="cardDesc">{desc}</span>
            <span className="cardCredit">Credit: {(length)*10}</span>
            <span className="cardTime">{length} min</span>
            <span className="cardPeopleText">{creditBoost}</span>
            <img src="images/tags.png" className="cardTags"/>
            <img src="images/likes.png" className="cardLikes"/>
            <img src="images/people.png" className="cardPeople"/>
            <img src="images/clock.png" className="cardClock"/>
        </div>
    )
}

export default SurveyCard

const styles = {
    border: '1px solid black'
}