import React from 'react'
import { FBaseDB } from '../tools/Firebase'
import { Link } from 'react-router-dom'
import TopNav from './Topnav'
import SurveyCard from './SurveyCard'
import { useAuthContext } from '../context/AuthProviders'

const ShuffleSurvey = () => {
    const surveyData = {
        title: "nice"
    }
    
    return (
        <div>
            <TopNav />
            <div className="cardDiv">
                <SurveyCard surveyInfo={surveyData}/>
            </div>
        </div>
    )
}

export default ShuffleSurvey
