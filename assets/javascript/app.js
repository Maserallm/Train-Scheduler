let firebaseConfig = {
    apiKey: "AIzaSyDQLGeVRQ859YKnLHO8vfsgcInrId4WW3E",
    databaseURL: "https://train-time-schedule-dab0c.firebaseio.com"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database();

function currentTime() {
    var currentTimeFormat = "hh:mm:ss A";
    var currentTime = moment(moment(), currentTimeFormat);
    var currentTimeFormatted = currentTime.format(currentTimeFormat);
    $('#current-time').addClass("").html('Current Time: ' + currentTimeFormatted)
};
setInterval(currentTime, 1000);

$("#add-train").on("click", function (event) {
    event.preventDefault();

    let trainName = $("#train-name").val().trim();
    let destination = $("#destination").val().trim();
    let firstTrainTime = $("#t-time").val().trim();
    let frequency = $("#frequency").val().trim();

    database.ref().push({
        train: trainName,
        destination: destination,
        arrival: firstTrainTime,
        frequency: frequency,
    });

}); //submit button


database.ref().on("child_added", function (snapshot) {
    let snapVal = snapshot.val();

    let trainName = snapVal.train;
    let destination = snapVal.destination;
    let firstTrainTime = snapVal.arrival;
    let frequency = snapVal.frequency;

    let timeDiff = moment().diff(moment(firstTrainTime, "HH:mm"), "minutes");
    console.log(timeDiff);

    let remaind = timeDiff % frequency;
    console.log(remaind);

    let minAway = frequency - remaind;
    console.log(minAway);

    let nextTrain = moment().add(minAway, "minutes").format("hh:mm A");
    console.log(nextTrain);

    let trainAdded = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(firstTrainTime),
        $("<td>").text(frequency),
        $("<td>").text(minAway),
        $("<td>").text(nextTrain),
    );

    $("#train-info").append(trainAdded);
});

$("#clear-train").on("click", function (){
    $("tbody").empty();
})


