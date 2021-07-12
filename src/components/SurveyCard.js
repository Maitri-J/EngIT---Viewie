import React from 'react'

const SurveyCard = ({ surveyInfo }) => {
    return (
        <div style={styles}>
            <p>{surveyInfo.title}</p>
            <p>{surveyInfo.description}</p>
            <p>{surveyInfo.credit}</p>
            <p>{surveyInfo.duration}</p>
            <p>{surveyInfo.peopleCap}</p>
        </div>
    )
}

export default SurveyCard

const styles = {
    border: '1px solid black'
}