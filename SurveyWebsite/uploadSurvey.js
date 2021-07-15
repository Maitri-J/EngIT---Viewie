// JavaScript source code
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        var user = firebase.auth().currentUser;
        if (user != null) {
            if (user.emailVerified) {
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

// js function for time selection
for (var i = 1; i <= 24; i++) {
    var select = document.getElementById("durationInput");
    var option = document.createElement("OPTION");
    select.options.add(option);
    option.text = i;
    option.value = i;
}

function goBack() { //x work
    window.history.back();
}
