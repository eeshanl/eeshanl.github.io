function logIn() {
    var pass = document.getElementById("input").value;
    if (pass == "abcd") {
        window.location.replace('main.html');
    } else {
    	alert("Log in failed.");
    }
}