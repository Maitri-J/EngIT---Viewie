// Alternate way of setting up Firebase 

import { firebase } from "@firebase/app";
import "firebase/auth"; 
import "firebase/database";

const config = require('../google-credentials.json');

const FBase = firebase.initializeApp(config);
const FBaseAuth = FBase.auth();
const FBaseDB = firebase.database();

// surveyInfo - information about the form, publisherID - UID for user in db
const addSurvey = (surveyInfo, userEmail) => {
    const surveysRef = FBaseDB.ref("surveys");
    const newSurveyRef = surveysRef.push();

    newSurveyRef.set({
        title: surveyInfo.title,
        publisherEmail: userEmail,
        desc: surveyInfo.desc,
        link: surveyInfo.link,
        creditBoost: parseInt(surveyInfo.creditBoost),
        length: parseInt(surveyInfo.length),
        maxParticipants: parseInt(surveyInfo.maxParticipants),
        tags: surveyInfo.tags
    });
}

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