import React from 'react'
import { FBaseDB } from '../tools/Firebase'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthProviders'

const Dashboard = () => {
    return (
        <div>
            User Profile Information + Completed Surveys + Uploaded Surveys Go Here
            <Link to="/uploadsurvey">Create New Survey</Link>


        </div>
    )
}

export default Dashboard
