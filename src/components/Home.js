import React from 'react'
import SurveyCard from './SurveyCard'
import { addSurvey } from "../tools/Firebase"

const Home = () => {
    
    // test data
    const testInfo = {
        title: "Food Survey",
        desc: "Its about food",
        link: "www.google.com",
        creditReward: 100,
        creditBoost: 200,
        duration: 20,
        maxParticipants: 100,
        tags: []
    }

    return (
        <div>
            <SurveyCard surveyInfo={testInfo} />
        </div>
    )
}

export default Home;
