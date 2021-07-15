import React from 'react'
import { FBaseDB } from '../tools/Firebase'
import { Link } from 'react-router-dom'
import TopNav from './Topnav'
import SurveyCard from './SurveyCard'
import { useAuthContext } from '../context/AuthProviders'

const ShuffleSurvey = () => {
    const title = "Test Survey"
    const desc = "this is a survey description"
    const length = 10
    const creditBoost= 20
    
    return (
        <div>
            <TopNav noCredits={0}/>
            <div className="cardDiv">
                <SurveyCard title={title} desc={desc} length={length} creditBoost={creditBoost}/>
            </div>
        </div>
    )
}

export default ShuffleSurvey
