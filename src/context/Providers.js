import React from 'react'
import { AuthProviders } from './AuthProviders'
import Signup from '../components/Signup'
import Home from '../components/Home';
import Login from '../components/Login';

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
            </Switch>
        </AuthProviders>
    )
}

export default Providers
