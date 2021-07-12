import React from 'react'
import { AuthProviders } from './AuthProviders'
import Signup from '../components/Signup'

const Providers = () => {
    return (
        <AuthProviders>
            <Signup />
        </AuthProviders>
    )
}

export default Providers
