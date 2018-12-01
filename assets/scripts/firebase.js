//Firebase saves the Gym, Indoors or Outdoors data to bring it back for the video

var config = {
    apiKey: "AIzaSyBTUty_2eQIF51UpzBShEe0XvRUwsdtEzc",
    authDomain: "weightloss-c69df.firebaseapp.com",
    databaseURL: "https://weightloss-c69df.firebaseio.com",
    projectId: "weightloss-c69df",
    storageBucket: "weightloss-c69df.appspot.com",
    messagingSenderId: "360811521364"
};
//initialize firebase
firebase.initializeApp(config);
var database = firebase.database();

//wait until document is ready
$(document).ready(function () {
    //sends data to firebase database once the button is clicked
    $('#submitBtn').click(function (e) {
        e.preventDefault();
        var selValue = $('input[name=gridRadios]:checked').val();
        console.log('Selected Workout is: ' + selValue); //makes sure data is selected correctly
        var selGender = $("#inputState").val();
        console.log('Selected Gender is: ' + selGender);
        //var name = $("#firstname").val();
            // Code for handling the push
            database.ref().push({
                //name: name,
                selValue: selValue,
                selGender: selGender,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
        });

        // Firebase callback to bring back data
     database.ref().on("child_added", function(childSnapshot) {

        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().selValue);
        console.log(childSnapshot.val().selGender);
        console.log(childSnapshot.val().dateAdded);
        console.log("Hi " + childSnapshot.val().name + "!" + " Your workout type is: " + childSnapshot.val().selValue);
     })

     
    })
