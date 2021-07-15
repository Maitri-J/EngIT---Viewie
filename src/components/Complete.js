import React from 'react'
import { FBaseDB } from '../tools/Firebase'
import { Link } from 'react-router-dom'
import TopNav from './Topnav'
import SurveyCard from './SurveyCard'
import { useAuthContext } from '../context/AuthProviders'

const Complete = () => {
    
    return (
        <div>
            <TopNav noCredits={0}/>
            <div className="survey">
            </div>
        </div>
    )
}

export default Complete
