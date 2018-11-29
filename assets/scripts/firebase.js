//Firebase saves the Gym, Indoors or Outdoors data to bring it back for the video

var config = {
    apiKey: "AIzaSyBTUty_2eQIF51UpzBShEe0XvRUwsdtEzc",
    authDomain: "weightloss-c69df.firebaseapp.com",
    databaseURL: "https://weightloss-c69df.firebaseio.com",
    projectId: "weightloss-c69df",
    storageBucket: "weightloss-c69df.appspot.com",
    messagingSenderId: "360811521364"
};
firebase.initializeApp(config);
var database = firebase.database();

$(document).ready(function () {
    $('#submitBtn').click(function (e) {
        e.preventDefault();
        var selValue = $('input[name=gridRadios]:checked').val();
        alert('Selected Workout is:' + selValue);
            var name = $("#firstname").val().trim();
            // Code for handling the push
            debugger;
            database.ref().push({
                selValue: selValue,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
        });
    })