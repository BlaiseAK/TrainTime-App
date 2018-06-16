var config = {
    apiKey: "AIzaSyCnB9sutksxZSmAimUSxh_8zReI-oFdshY",
    authDomain: "traintime-app.firebaseapp.com",
    databaseURL: "https://traintime-app.firebaseio.com",
    projectId: "traintime-app",
    storageBucket: "traintime-app.appspot.com",
    messagingSenderId: "46561242414"
  };
  firebase.initializeApp(config);

//   Storing direction to firebase for later
  var database = firebase.database();

//  Establish click function to add Train information
$(document).on("click", ".btn-primary", function() {
    // Allows for both button click and 'enter' key to pre pressed to submit information
    event.preventDefault();

    // Create variables to store user inputs
    var trainName = $("#nameInput").val().trim();
    var trainDestination = $("#destinationInput").val().trim();
    var trainStart = $("#timeInput").val().trim();
    var trainFrequency = $("#frequencyInput").val().trim();

    // Create a formula to put the trainStart time to be the most current time of arrival and the time modulus to the next arrival

    var trainStartConverted = moment(trainStart, "HH:mm").subtract(1, "years");
    console.log(trainStartConverted);

    // current time
    var currentTime = moment();
    console.log("Current time: "+ moment(currentTime).format("hh:mm"));

    // 



    // Create an object to store our new variables inside of.
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        start: trainStart,
        frequency: trainFrequency,
    };

    // Push newTrain information up to the database
    database.ref().push(newTrain);

    // Console logging this to see if they actually take.
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);

    // Alert to let user know we have stored the info.
    alert(newTrain.name + "  has sucessfuly been added to the table");

    // Clears the inputs
    $("#nameInput").val("");
    $("#destinationInput").val("");
    $("#timeInput").val("");
    $("#frequencyInput").val("");

})

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store new train info into variables.
    var dataName = childSnapshot.val().name;
    var dataDestination = childSnapshot.val().destination;
    var dataTime = childSnapshot.val().start;
    var dataFrequency = childSnapshot.val().frequency;

    // See if the information is calling back
    console.log(dataName);
    console.log(dataDestination);
    console.log(dataTime);
    console.log(dataFrequency);

    // Add each train's data into the table
    // empMonths needs to be changed to next arrival time and empBilled needs to be Minutes away
  $("#trainTable > tbody").append("<tr><td>" + dataName + "</td><td>" + dataDestination + "</td><td>" + dataFrequency + "</td><td>" + empMonths + "</td><td>" + empBilled + "</td></tr>");

})