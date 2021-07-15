import React, {useState, useEffect} from 'react'
import { FBaseDB } from '../tools/Firebase'
import SurveyCard from './SurveyCard'
import { addSurvey } from "../tools/Firebase"
import { Link } from 'react-router-dom'
import UploadSurvey from './UploadSurvey'
import { useAuthContext } from '../context/AuthProviders'
import TopNav from './Topnav'


const Home = () => {

    const { logout, currentUser } = useAuthContext();

    const [isLoading, setLoading] = useState(true);
    const [userData, setuserData] = useState({})

    // fetch user profile from firebase => run everytime dashboard is loaded
    // to ensure accurate information
    useEffect(() => {
        if(!currentUser){
            return;
        }
        console.log(JSON.stringify(currentUser));

        
        // fetch user profile information
        const userRef = FBaseDB.ref(`users/${currentUser.uid}`);
        //const surveys = FBaseDB.ref(`surveys/`);

        userRef.on('value', (snapshot) => {
            const data = snapshot.val();
            setuserData(data);
        });

        // fetch current users surveys

        
        // console.log(userData);
        setLoading(false);

    }, [currentUser])

    return (
        <div>

            {/* Testing upload survey */}
            {/* <UploadSurvey /> */}


            {/* If the user is logged in => offer option to sign out,
            If user is not logged in => offer option to sign in */}
            {
                (!currentUser) 
                ? 
                <div>
                    <Link to="/login">Create New Survey</Link>
                    <Link to="/signup">Sign Up Here</Link>
                    <Link to="/login">Login Here</Link>
                </div>

                : 

                <div>
                    <TopNav noCredits={currentUser.noCredits}/>
                    <button onClick={logout}>Logout</button>
                    <div className="loggedInHome">
                        <span className="startText">Start Sharing</span>
                        <span className="surveysText">SURVEYS & FORMS</span>
                        <span className="homeDescText">You can always find the share button at the top of each pages. By simply clicking on that, we help you find the most users as we can.</span>
                        <img src="images/group.png" className="arrow"/>
                        <img src="images/dogPerson.png" className="dogPerson"/>
                    </div>
                    <img src="images/searchBar.png" className="searchBar"/>
                    <Link to="/shufflesurvey"><span className="homeShuffleBtn">Shuffle</span></Link>
                    <span className="helpText">Help complete surveys without logging in</span>
                    <div className="surveys">
                    </div>
                </div>
            }
       
        </div>
    )
}

export default Home;
