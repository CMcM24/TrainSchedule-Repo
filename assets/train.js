console.log("hi");


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDuNwQAlXGlg6uhBme4omi4YqW5kfnQTmI",
    authDomain: "train-schedule-b56a1.firebaseapp.com",
    databaseURL: "https://train-schedule-b56a1.firebaseio.com",
    projectId: "train-schedule-b56a1",
    storageBucket: "",
    messagingSenderId: "841111604226",
    appId: "1:841111604226:web:1e4f71d5b4cf5c73"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();


  $("#add-train-btn").on("click", function(){
      event.preventDefault();

      var trainName = $("#train-namer").val().trim();
      var destName = $("#destination-namer").val().trim();
      var trainTime = moment($("#train-timer").val().trim(), 'HH:mm').format('hh:mm a');
      var frequencyTime = $("#frequence").val().trim();

      var trainEntry = {
          name: trainName,
          dest: destName,
          time: trainTime,
          freq: frequencyTime
      };

      database.ref().push(trainEntry);

      console.log(trainEntry.name);
      console.log(trainEntry.dest);
      console.log(trainEntry.time);
      console.log(trainEntry.freq);

      $("#train-namer").val("");
      $("#destination-namer").val("");
      $("#train-timer").val("");
      $("#frequence").val("");
  });

  database.ref().on("child_added", function(childsnapshot){
      console.log(childsnapshot.val());

      var trainName = childsnapshot.val().name;
      var destName = childsnapshot.val().dest;
      var trainTime = childsnapshot.val().time;
      var frequencyTime = childsnapshot.val().freq;

      //couldn't get the moment.js to display a minute countdown timer. I will keep working on this

      var listTime = moment(trainTime, 'hh:mm a');
      var diffTime = moment(trainTime, 'hh:mm a').add(frequencyTime, 'm');
      var theDiff = listTime.to(diffTime);

    //   var now = moment().minute();
    //   var lilDiff = now.to(listTime).minute();
    //   var bigDiff = now.to(diffTime).minute();

    //   var ultimateDiff = theDiff.to(bigDiff);


      var newTrainRow = $("<tr>").append(
          $("<td>").text(trainName),
          $("<td>").text(destName),
          $("<td>").text(frequencyTime),
          $("<td>").text(trainTime),
          $("<td>").text(theDiff),
      );
      $("#train-schedule > tbody").append(newTrainRow);
    });








  

