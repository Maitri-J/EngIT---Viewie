import React from 'react'
import { AuthProviders } from './AuthProviders'
import Signup from '../components/Signup'
import Home from '../components/Home';
import Login from '../components/Login';
import ForgetPassword from '../components/ForgetPassword';

import {
    Switch,
    Route
  } from "react-router-dom";


const Providers = () => {
    return (
        <AuthProviders>
            {/* Providing routing to other pages */}
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/signup">
                    <Signup />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/resetpassword">
                    <ForgetPassword />
                </Route>
            </Switch>
        </AuthProviders>
    )
}

export default Providers
