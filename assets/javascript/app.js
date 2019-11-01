let firebaseConfig = {
    apiKey: "AIzaSyDQLGeVRQ859YKnLHO8vfsgcInrId4WW3E",
    databaseURL: "https://train-time-schedule-dab0c.firebaseio.com"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database();

$("#add-train").on("click", function (event) {
    event.preventDefault();

    let trainName = $("#train-name").val().trim();
    let desti = $("#destination").val().trim();
    let firstTrainTime = $("#t-time").val().trim();
    let freq = $("#frequency").val().trim();

    database.ref().push({
        train: trainName,
        destination: desti,
        arrival: firstTrainTime,
        frequency: freq,
    });
    console.log(event);
})

database.ref().on("child_added", function(snapshot){
    let snapVal = snapshot.val();

    let trainName = snapVal.train;
    let destination = snapVal.destination;
    let nextArrival = snapVal.arrival;
    let frequency = snapVal.frequency;

    let trainAdded = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(nextArrival),
        $("<td>").text(frequency),
    );

    $("#train-info").append(trainAdded);


})

