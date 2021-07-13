// Alternate way of setting up Firebase 

import { firebase } from "@firebase/app";
import "firebase/auth"; 
import "firebase/database";

const config = require('../google-credentials.json');

const FBase = firebase.initializeApp(config);
const FBaseAuth = FBase.auth();
const FBaseDB = firebase.database();

// surveyInfo - information about the form, publisherID - UID for user in db
const addSurvey = (surveyInfo, publisherID) => {
    const surveysRef = FBaseDB.ref("surveys");
    const newSurveyRef = surveysRef.push();

    newSurveyRef.set({
        title: surveyInfo.title,
        publisherId: publisherID,
        desc: surveyInfo.desc,
        link: surveyInfo.link,
        creditReward: surveyInfo.creditReward,
        creditBoost: surveyInfo.creditBoost,
        duration: surveyInfo.duration,
        maxParticipants: surveyInfo.maxParticipants,
        tags: surveyInfo.tags
    });
}

export { FBase, FBaseAuth, addSurvey, firebase };