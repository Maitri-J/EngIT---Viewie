import React from 'react'
import { AuthProviders } from './AuthProviders'
import Signup from '../components/Signup'
import Home from '../components/Home';
import Login from '../components/Login';
import ForgetPassword from '../components/ForgetPassword';
import Dashboard from '../components/Dashboard';
import UploadSurvey from '../components/UploadSurvey';
import ShuffleSurvey from '../components/ShuffleSurvey';

import {
    Switch,
    Route
  } from "react-router-dom";


const Providers = () => {
    return (
        <AuthProviders>
            {/* Providing routing to other pages */}
            <Switch>
                <Route exact path="/" component={Home} />

                <Route path="/signup" component={Signup} />

                <Route path="/login" component={Login} />

                <Route path="/resetpassword" component={ForgetPassword} />
            
                <Route path="/dashboard" component={Dashboard} />

                <Route path="/uploadsurvey" component={UploadSurvey} />

                <Route path="/shufflesurvey" component={ShuffleSurvey} />
            </Switch>
        </AuthProviders>
    )
}

export default Providers
