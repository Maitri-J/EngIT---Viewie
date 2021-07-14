import React from 'react'
import SurveyCard from './SurveyCard'
import { addSurvey } from "../tools/Firebase"
import { Link } from 'react-router-dom'
import UploadSurvey from './UploadSurvey'

import { useAuthContext } from '../context/AuthProviders'


const Home = () => {

    const { logout, currentUser } = useAuthContext();

    return (
        <div>
            Home Page
            {/* Testing upload survey */}
            {/* <UploadSurvey /> */}

            {/* If the user is logged in => offer option to sign out,
            If user is not logged in => offer option to sign in */}
            {
                (!currentUser) 
                ? 
                <div>
                    <Link to="/signup">Sign Up Here</Link>
                    <Link to="/login">Login Here</Link>
                </div>
                : 
                <div>
                    <Link to="/dashboard">Dashboard</Link>
                    <button onClick={logout}>Logout</button>
                </div>
            }

            
        </div>
    )
}

export default Home;
