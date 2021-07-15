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
            <div className="googleSurvey">
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSejd99Ca9klqZYVNP0WLEJJJ024jRqQRDX_Lf5erHR4FFWGeg/viewform?embedded=true" width="640" height="615" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
            </div>
        </div>
    )
}

export default Complete
