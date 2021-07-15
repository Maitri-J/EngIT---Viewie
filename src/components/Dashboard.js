import React, {useState, useEffect} from 'react'
import { FBaseDB } from '../tools/Firebase'
import { Link, Redirect } from 'react-router-dom'
import { useAuthContext } from '../context/AuthProviders'
import SurveyCard from './SurveyCard'
import TopNav from './Topnav'

const Dashboard = () => {
    const { currentUser } = useAuthContext();

    const [isLoading, setLoading] = useState(true);
    const [userData, setuserData] = useState({})
    const [userSurveys, setuserSurveys] = useState([]);

    const [title, settitleData] = useState([])
    const [desc, setdescData] = useState([])
    const [length, setlengthData] = useState([])
    const [creditBoost, setcreditBoostData] = useState([])

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
        
        // const surveyRef = FBaseDB.ref('surveys/');

        // // fetch survey data
        // surveyRef.on('value', (snapshot) => {
        //     const surveyData = snapshot.val();

        //     console.log(JSON.stringify(surveyData));
            
        //     var res1 = [];
        //     for(var i in surveyData){
        //         // console.log(i)
        //         // console.log(surveyData[i])

        //         var res2 = [];

        //         // converts the object to an array
        //         res2.push(surveyData[i]);
        //         // console.log(res2);

        //         // push the array into the final array
        //         res1.push(res2);
        //     }
        //     // now in json format
        //     console.log(res1);

        //     setuserSurveys(res1);
        // });

        // fetch current users surveys
        var ref = FBaseDB.ref();

        ref.on("value", function(snapshot) {
            let data = snapshot.val();
            let surveys = data.surveys;
            var titles = [];
            var descs = [];
            var lengths = [];
            var creditBoosts = [];
            
            let keys = Object.keys(surveys);
            console.log(surveys);
            for (let i = 0; i < keys.length; i++){
                let k = keys[i];
                titles.push(surveys[k].title);
                descs.push(surveys[k].desc);
                lengths.push(surveys[k].length);
                creditBoosts.push(surveys[k].creditBoost);
            }
            settitleData(titles);
            setdescData(descs);
            setlengthData(lengths);
            setcreditBoostData(creditBoosts);
                
        }, function (error) {
            console.log("Error: " + error.code);
        });
        

        setLoading(false);

    }, [currentUser])

    return (
        <div>
            
            
            
            // {/* Debug function below */}
            {!isLoading && <p>{JSON.stringify(userData)}</p>}

            {/* Only render user profile after loading */}
            {/* {
                userSurveys.map((surv) => 
                    <div key={surv.surveyUID}>
                        <SurveyCard surveyInfo={surv[0]} />
                    </div>
                    
                )
            } */}

            {/* if not logged in => redirect */}
            {
                !currentUser && <Redirect to="/login" />
            }

            {!isLoading && currentUser &&
            (<div>
                <TopNav noCredits={userData.noCredits}/>
                <div>
                    <p>{userData.username}</p>
                    <p>{userData.userEmail}</p>
                    <p>Credit Balance: {userData.noCredits}</p>
                </div> 
            

                <div>
                    <span className="yourSurveys">Your Surveys</span>
                    <img src="images/edit.png" className="editBtn"/>
                    <img src="images/ProfileSearch.png" className="profileSearch"/>
                    <img src="images/editProfile.png" className="editProfile"/>
                    <Link to="/uploadsurvey">Create New Survey</Link> + 
                    <Link to="/shufflesurvey">Shuffle</Link>
                </div>

                <div className="mySurveys">
                    <div className="dashboardOne">
                    <SurveyCard title={title[0]} desc={desc[0]} length={length[0]} creditBoost={creditBoost[0]}/>
                    </div>
                    <div className="dashboardTwo">
                    <SurveyCard title={title[1]} desc={desc[1]} length={length[1]} creditBoost={creditBoost[1]}/>
                    </div>
                    <div className="dashboardThree">
                    <SurveyCard title={title[2]} desc={desc[2]} length={length[2]} creditBoost={creditBoost[2]}/>
                    </div>
                    <div className="dashboardFour">
                    <SurveyCard title={title[3]} desc={desc[3]} length={length[3]} creditBoost={creditBoost[3]}/>
                    </div>
                </div>
            </div>)
            }
            </div>
    )
}

export default Dashboard
