import React, {useState, useEffect} from 'react'
import { FBaseDB } from '../tools/Firebase'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthProviders'

const Dashboard = () => {
    const { currentUser } = useAuthContext();

    const [isLoading, setLoading] = useState(true);
    const [userData, setuserData] = useState({})

    // fetch user profile from firebase => run everytime dashboard is loaded
    // to ensure accurate information
    useEffect(() => {
        console.log(JSON.stringify(currentUser));

        // fetch user profile information
        const userRef = FBaseDB.ref(`users/${currentUser.uid}`);

        userRef.on('value', (snapshot) => {
            const data = snapshot.val();
            setuserData(data);
        });

        // fetch current users surveys

        
        // console.log(userData);
        setLoading(false);

    }, [])

    return (
        <div>
            
            {/* Debug function below */}
            {!isLoading && <p>{JSON.stringify(userData)}</p>}

            {/* Only render user profile after loading */}
            {!isLoading &&
                <div>
                    <p>{userData.username}</p>
                    <p>{userData.userEmail}</p>
                    <p>Credit Balance: {userData.noCredits}</p>
                </div> 
            }


            User Profile Information + Completed Surveys + Uploaded Surveys Go Here
            <Link to="/uploadsurvey">Create New Survey</Link> + 
            <Link to="/shufflesurvey">Shuffle</Link>
        </div>
    )
}

export default Dashboard
