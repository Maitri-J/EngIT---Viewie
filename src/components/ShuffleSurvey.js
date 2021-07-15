import React from 'react'
import { FBaseDB } from '../tools/Firebase'
import { Link } from 'react-router-dom'
import TopNav from './Topnav'
import SurveyCard from './SurveyCard'
import { useAuthContext } from '../context/AuthProviders'

const ShuffleSurvey = () => {
    const surveyData = {
        title: "Test Survey",
        desc: "this is a survey description",
        length: 10,
        creditBoost: 20
    }
    
    return (
        <div>
            <TopNav noCredits={0}/>
            <div className="cardDiv">
                <SurveyCard surveyInfo={surveyData}/>
            </div>
        </div>
    )
}

export default ShuffleSurvey
