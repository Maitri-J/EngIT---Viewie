firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User

      var user = firebase.auth().currentUser;
      if (user != null){
        if (user.emailVerified){
          window.open("home.html", "_self");
        } else {
          logout();
        }
      }
      // ...
    } else {
      // User is signed out
      // ...
    }
});

function login(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        var emailVerified = user.emailVerified;
        if (emailVerified){
          window.open("home.html", "_self");
        } else {
          document.getElementById("errorMessage").innerHTML = "Please verify your email";
        }
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        document.getElementById("errorMessage").innerHTML = errorMessage;
    });
}

function googleLogin(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}