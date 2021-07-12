firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var user = firebase.auth().currentUser;

      if (user != null){
        if (user.emailVerified){
          window.open("home.html", "_self")
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

function forgotPassword(){
    var email = document.getElementById("email").value;
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      // Password reset email sent!
      // ..
      document.getElementById("message").style.color = "black";
      document.getElementById("message").innerHTML = "email sent";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      document.getElementById("message").style.color = "red";
      document.getElementById("message").innerHTML = errorMessage;
      // ..
    });
}