import React, {useState, useEffect} from 'react'
import { FBaseDB } from '../tools/Firebase'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthProviders'
import SurveyCard from './SurveyCard'
import TopNav from './Topnav'

const Dashboard = () => {
    const { currentUser } = useAuthContext();

    const [isLoading, setLoading] = useState(true);
    const [userData, setuserData] = useState({})
    const [userSurveys, setuserSurveys] = useState([]);

    // fetch user profile from firebase => run everytime dashboard is loaded
    // to ensure accurate information
    useEffect(() => {
        if(!currentUser){
            return;
        }

        console.log(JSON.stringify(currentUser));
        
        // fetch user data
        const userRef = FBaseDB.ref(`users/${currentUser.uid}`);
            
        userRef.on('value', (snapshot) => {
            const data = snapshot.val();
            setuserData(data);
        })
        
        const surveyRef = FBaseDB.ref('surveys/');

        // fetch survey data
        surveyRef.on('value', (snapshot) => {
            const surveyData = snapshot.val();

            console.log(JSON.stringify(surveyData));
            
            var res1 = [];
            for(var i in surveyData){
                // console.log(i)
                // console.log(surveyData[i])

                var res2 = [];

                // converts the object to an array
                res2.push(surveyData[i]);
                // console.log(res2);

                // push the array into the final array
                res1.push(res2);
            }
            // now in json format
            console.log(res1);

            setuserSurveys(res1);

        //     // console.log(JSON.stringify(surveyData));
            
        //     var res1 = [];
        //     for(var i in surveyData){
        //         // console.log(i)
        //         // console.log(surveyData[i])

        //         var res2 = [];

        //         // converts the object to an array
        //         res2.push(Object.values(surveyData[i]));
        //         // console.log(res2);

        //         // push the array into the final array
        //         res1.push(res2);
        //     }

        //     // console.log(res1);
        //     // Array order: [creditBoost, desc, length, link, publisherUID, surveyUID, title]

            // setuserSurveys(res1);
            
            // setuserSurveys(surveyData);
        });

        

        setLoading(false);

    }, [currentUser])

    return (
        <div>
            <TopNav noCredits={userData.noCredits}/>
            
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

            {
                !isLoading &&
                <div>
                    {/* <SurveyCard surveyInfo={}/> */}
                </div>
            }

            {/* User Profile Information + Completed Surveys + Uploaded Surveys Go Here */}
            <Link to="/uploadsurvey">Create New Survey</Link> + 
            <Link to="/shufflesurvey">Shuffle</Link>

            {
                userSurveys.map((surv) => 
                    <div key={surv.surveyUID}>
                        <SurveyCard surveyInfo={surv[0]} />
                    </div>
                    
                )
            }
        </div>
    )
}

export default Dashboard
