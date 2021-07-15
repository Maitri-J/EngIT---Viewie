import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthProviders'

const TopNav = ({ noCredits }) => {

    return (
        <div className="topNav">
            <img src="images/logoTop.png" className="logoTop"/>
            <Link to="/"><span className="homeBtn">Home</span></Link>
            <Link to="/shufflesurvey"><span className="aboutBtn">Shuffle</span></Link>
            <Link to="/uploadsurvey"><img src="images/add.png" className="addBtn"/></Link>
            <img src="images/bell.png" className="bellBtn"/>
            <span className="balanceTop">Balance: {noCredits} </span>
            <Link to="/dashboard"><img src="images/profile.png" className="profileBtn"/></Link>
        </div>
    )
}

export default TopNav
