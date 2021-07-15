import React from 'react'
import { Link } from 'react-router-dom'

const TopNav = ({}) => {
    return (
        <div className="topNav">
            <img src="images/logoTop.png" className="logoTop"/>
            <Link to="/dashboard"><span className="homeBtn">Home</span></Link>
            <Link to="/dashboard"><span className="aboutBtn">About</span></Link>
            <Link to="/uploadsurvey"><img src="images/add.png" className="addBtn"/></Link>
            <img src="images/bell.png" className="bellBtn"/>
            <Link to="/dashboard"><img src="images/profile.png" className="profileBtn"/></Link>
        </div>
    )
}

export default TopNav
