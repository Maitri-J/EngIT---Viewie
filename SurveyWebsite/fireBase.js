//This javascipt file if for function that are used by all html pages

// The firbase key used by all html pages on the app
var app_fireBase = {};
(function(){
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAKfxRX_pwpsCmLGm2xjazAfFSaqRcpJX4",
    authDomain: "survey-website-e88e6.firebaseapp.com",
    databaseURL: "https://survey-website-e88e6-default-rtdb.firebaseio.com",
    projectId: "survey-website-e88e6",
    storageBucket: "survey-website-e88e6.appspot.com",
    messagingSenderId: "722878596713",
    appId: "1:722878596713:web:c0d839f69131194df284f8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  app_fireBase = firebase;
})()

// Signs the user out of their account
function logout(){
  firebase.auth().signOut();
}

// Checks for data errors and logs them to the console
function errData(err){
  console.log(err);
}