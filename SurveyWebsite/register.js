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
    } else {
      // User is signed out
      // ...
    }
});

function register(){

    var username = document.getElementById("username").value;
    if(document.getElementById("email").value == document.getElementById("confirmEmail").value) {
      var email = document.getElementById("email").value;

      if(document.getElementById("password").value == document.getElementById("confirmPassword").value) {
        var password = document.getElementById("password").value;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          firebase.auth().currentUser.sendEmailVerification()
          .then(() => {
            // Email verification sent!
            // ...
            document.getElementById("errorMessage").style.color = "black";
            document.getElementById("errorMessage").innerHTML = "Confirmation email sent please verify to login";
          });
        })

        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          document.getElementById("errorMessage").style.color = "red";
          document.getElementById("errorMessage").innerHTML = errorMessage;
          // ..
        });

      } else {
        document.getElementById("errorMessage").style.color = "red";
        document.getElementById("errorMessage").innerHTML = "Entered passwords do not match";
      }
    } else {
      document.getElementById("errorMessage").style.color = "red";
      document.getElementById("errorMessage").innerHTML = "Entered emails do not match";
    }  
        
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