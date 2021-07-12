import React, { createContext, useState, useEffect, useContext } from 'react'
import { FBaseAuth } from '../tools/Firebase';

const AuthContext = createContext();

// export to allow child react elements to use auth hook
const useAuthContext = () => {
    return useContext(AuthContext);
}



// Implementation of Google Login/ Logout/ Signup

const AuthProviders = ({ children }) => {

    // Default - user not logged in
    // Holds a global state for all components if a user is logged in
    const [user, setUser] = useState(null);

    // only set when login state has changed
    useEffect(() => {
        const unsubscribe = FBaseAuth.onAuthStateChanged(user => {
            setUser(user);
        })

        // removes the onAuthStateChanged Listener when AuthProvider component is unmounted
        return unsubscribe;
    }, [])
    

    return (
        // Providing context for all children react elements to use => similar to global state
        // We pass user information and the ability to login and logout function

        <AuthContext.Provider value={{
        user,
        login: () => {
            // API Call to Firebase => Login
        },

        logout: () =>{
            // API Call to Firebase => Logout
        },

        signup: (email, password) => {
            // API Call to Firebase => Signup
            return FBaseAuth.createUserWithEmailAndPassword(email, password);
        }
        
        }}>
            {children}
        </AuthContext.Provider>    
    )
}

export {AuthProviders, useAuthContext}