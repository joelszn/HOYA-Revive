
var physicalFile = "data/physical.txt";
var emotionalFile = "data/emotional.txt";
var socialFile = "data/social.txt";

var Files = [physicalFile, emotionalFile, socialFile];

var Activities = [];

/**
 * reads in and sets up the suggestion arrays by reading in the files provided
 */
function setUp() {
    for (var i = 0; i < Files.length; i++) {
        Activities.push(readFile(Files[i]));
    }
}

/**
 * Handles a given array containing a sentiment score and magnitude, choosing
 * @param numArray where the 0th element is the magnitude and the 1st element is the score
 */
function handleSentiment(numArray) {
    var magnitude = numArray[0];
    var score = numArray[1];
    if (score < -.6 && magnitude >= .05) handleSad();
    else if (score > .8 && magnitude >= .05) handleHappy();
    else handleMixed();
}

/**
 * Outputs a sympathetic message and suggests possible activities to feel better
 */
function handleSad() {
    console.log("I'm sorry that you aren't feeling so great.");
    console.log("Maybe try: ")
    showActivities();
}

/**
 * Handles the case where the user's emotions are not entirely clear
 */
function handleMixed() {
    // TODO: pass back to UI and listen again
    console.log("");
}

/**
 * Outputs an encouraging message
 * @returns {string}
 */
function handleHappy() {
    console.log("I'm glad that you seem happy!");
    // TODO: ask user what they have been doing that day and store activities
}

/**
 * Suggests one activity per type of activity
 */
function showActivities() {
    // TODO: Change category of suggestions based on user history
    for (var i = 0 ; i < Activities.length; i++){
        console.log(Activities[i][Math.floor(Math.random() * Activities[i].length)]);
    }
}

/**
 * Given a file path, reads in the file and returns an array where each line of the text file is an array entry
 * @param fileName is the path of the desired file
 * @returns {string[]} is the list suggestions of the current suggestion type
 */
function readFile(fileName) {
    var fs = require('fs');

    try {
        var data = fs.readFileSync(fileName, 'utf8');
        var array = data.toString().split("\n");
        return array;
    } catch(e) {
        console.log('Error:', e.stack);
    }
}