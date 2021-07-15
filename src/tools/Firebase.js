// Alternate way of setting up Firebase 

import { firebase } from "@firebase/app";
import "firebase/auth"; 
import "firebase/database";

const config = require('../google-credentials.json');

const FBase = firebase.initializeApp(config);
const FBaseAuth = FBase.auth();
const FBaseDB = firebase.database();

// surveyInfo - information about the form, publisherID - UID for user in db
const addSurvey = (surveyInfo, userUID) => {
    const surveysRef = FBaseDB.ref("surveys");
    const newSurveyRef = surveysRef.push();

    // add new survey
    newSurveyRef.set({
        title: surveyInfo.title,
        publisherUID: userUID,
        desc: surveyInfo.desc,
        link: surveyInfo.link,
        creditBoost: parseInt(surveyInfo.creditBoost),
        surveyUID: newSurveyRef.key,
        length: parseInt(surveyInfo.length),
        tags: surveyInfo.tags
    });

    // add reference to survey in users account
    const userRef = FBaseDB.ref(`users/${userUID}`);

    // gets current user information
    var currentVal;
    userRef.on('value', (snapshot) => {
        const data = snapshot.val();
        currentVal = data;
    });

    // calculates new amount of credits after using credits on survey
    var updateData = {
        noCredits: parseInt(currentVal.noCredits) - parseInt(surveyInfo.creditBoost),
    }

    // appends survey to user records
    if(!currentVal.surveysUploaded){
        updateData.surveysUploaded = [newSurveyRef.getKey()]
    }
    else{
        updateData.surveysUploaded = [...(currentVal.surveysUploaded), newSurveyRef.getKey()]
    }

    // console.log(JSON.stringify(currentVal));
    // console.log(updateData);

    // update these details firebase
    userRef.update(updateData)
    .then(() => {})
    .catch(error => {
        console.log(error);
    });

}

// adds new user to firebase under users
const addNewUsertoFBaseDB = (user, username) => {
    const userRef = FBaseDB.ref(`users/${user.uid}`);
    // const newUsersRef = userRef.push();

    userRef.set({
        userUID: user.uid,
        userEmail: user.email,
        username: username,
        noCredits: 0,
        surveysUploaded: {},
        surveysCompleted: {}
    });
}


export { FBase, FBaseAuth, FBaseDB, addSurvey, addNewUsertoFBaseDB, firebase };