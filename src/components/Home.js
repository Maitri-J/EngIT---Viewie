import React, {useState, useEffect} from 'react'
import { FBaseDB } from '../tools/Firebase'
import SurveyCard from './SurveyCard'
import { addSurvey } from "../tools/Firebase"
import { Link } from 'react-router-dom'
import UploadSurvey from './UploadSurvey'
import { useAuthContext } from '../context/AuthProviders'
import TopNav from './Topnav'
import firebase from '@firebase/app'


const Home = () => {

    const { logout, currentUser } = useAuthContext();

    const [userData, setuserData] = useState({})

    const [isLoading, setLoading] = useState(true);

    const [title, settitleData] = useState([])
    const [desc, setdescData] = useState([])
    const [length, setlengthData] = useState([])
    const [creditBoost, setcreditBoostData] = useState([])
    const [userSurveys, setuserSurveys] = useState([]);
    
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
        var ref = firebase.database().ref();

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

        // const surveyRef = FBaseDB.ref('surveys/');

        // // fetch survey data => dynamic rendering
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

        //     console.log(`JSON TEST: ${JSON.stringify(res1)}`);
        //     setuserSurveys(res1);
        // });

        // console.log(userData);
        setLoading(false);

    }, [currentUser])

    return (
        <div>

            {/* Testing upload survey */}
            {/* <UploadSurvey /> */}


            {/* If the user is logged in => offer option to sign out,
            If user is not logged in => offer option to sign in */}
            {!isLoading &&
                (!currentUser) 
                ? 
                <div>
                    <Link to="/login">Create New Survey</Link>
                    <Link to="/signup">Sign Up Here</Link>
                    <Link to="/login">Login Here</Link>
                </div>

                : 

                <div>
                    <TopNav noCredits={userData.noCredits}/>
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

                        {/* {
                            userSurveys.map((surv) => 
                                <div key={surv.surveyUID}>
                                    <SurveyCard surveyInfo={surv[0]} />
                                </div>
                                
                            )
                        } */}

                        <div className="oneOne">
                        <SurveyCard title={title[0]} desc={desc[0]} length={length[0]} creditBoost={creditBoost[0]}/>
                        </div>
                        <div className="oneTwo">
                        <SurveyCard title={title[1]} desc={desc[1]} length={length[1]} creditBoost={creditBoost[1]}/>
                        </div>
                        <div className="oneThree">
                        <SurveyCard title={title[2]} desc={desc[2]} length={length[2]} creditBoost={creditBoost[2]}/>
                        </div>
                        <div className="twoOne">
                        <SurveyCard title={title[3]} desc={desc[3]} length={length[3]} creditBoost={creditBoost[3]}/>
                        </div>
                        <div className="twoTwo">
                        <SurveyCard title={title[4]} desc={desc[4]} length={length[4]} creditBoost={creditBoost[4]}/>
                        </div>
                        <div className="twoThree">
                        <SurveyCard title={title[5]} desc={desc[5]} length={length[5]} creditBoost={creditBoost[5]}/>
                        </div>
                        <div className="threeOne">
                        <SurveyCard title={title[6]} desc={desc[6]} length={length[6]} creditBoost={creditBoost[6]}/>
                        </div>
                        <div className="threeTwo">
                        <SurveyCard title={title[7]} desc={desc[7]} length={length[7]} creditBoost={creditBoost[7]}/>
                        </div>
                        <div className="threeThree">
                        <SurveyCard title={title[8]} desc={desc[8]} length={length[8]} creditBoost={creditBoost[8]}/>
                        </div>
                        <div className="fourOne">
                        <SurveyCard title={title[9]} desc={desc[9]} length={length[9]} creditBoost={creditBoost[9]}/>
                        </div>
                        <div className="fourTwo">
                        <SurveyCard title={title[10]} desc={desc[10]} length={length[10]} creditBoost={creditBoost[10]}/>
                        </div>
                        <div className="fourThree">
                        <SurveyCard title={title[11]} desc={desc[11]} length={length[11]} creditBoost={creditBoost[11]}/>
                        </div>
                        <div className="fiveOne">
                        <SurveyCard title={title[12]} desc={desc[12]} length={length[12]} creditBoost={creditBoost[12]}/>
                        </div>
                        <div className="fiveTwo">
                        <SurveyCard title={title[13]} desc={desc[13]} length={length[13]} creditBoost={creditBoost[13]}/>
                        </div>
                        <div className="fiveThree">
                        <SurveyCard title={title[14]} desc={desc[14]} length={length[14]} creditBoost={creditBoost[14]}/>
                        </div>
                        <div className="sixOne">
                        <SurveyCard title={title[15]} desc={desc[15]} length={length[15]} creditBoost={creditBoost[15]}/>
                        </div>
                        <div className="sixTwo">
                        <SurveyCard title={title[16]} desc={desc[16]} length={length[16]} creditBoost={creditBoost[16]}/>
                        </div>
                        <div className="sixThree">
                        <SurveyCard title={title[17]} desc={desc[17]} length={length[17]} creditBoost={creditBoost[17]}/>
                        </div>
                    </div>
                </div>
            }
       
        </div>
    )
}

export default Home;
