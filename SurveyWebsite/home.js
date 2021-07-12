firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var user = firebase.auth().currentUser;

      if (user != null){
        if (user.emailVerified){
          //do nothing
        } else {
          logout();
          window.open("login.html", "_self");
        }
      }
      // ...
    } else {
      // User is signed out
      // ...
      logout();
      window.open("login.html", "_self");
    }
});