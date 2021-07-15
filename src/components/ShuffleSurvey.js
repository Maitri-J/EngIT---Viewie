import React from 'react'
import { FBaseDB } from '../tools/Firebase'
import { Link } from 'react-router-dom'
import TopNav from './Topnav'
import SurveyCard from './SurveyCard'
import { useAuthContext } from '../context/AuthProviders'

const ShuffleSurvey = () => {
    return (
        <div>
            <TopNav />
            <div className="cardDiv">
                <SurveyCard />
            </div>
        </div>
    )
}

export default ShuffleSurvey
