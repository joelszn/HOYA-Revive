
var physicalActivities = ["Going for a jog", "Going on a bike ride", "Going for a hike", "Going for a swim"];
var emotionalActivities = ["Writing a journal entry", "Trying some deep breathing exercises", "Taking a relaxing bath"];
var socialActivities = ["Calling a friend to chat", "Grabbing a meal with a friend", "Inviting a friend over"];

var Activities = [physicalActivities, emotionalActivities, socialActivities];

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
    // TODO: ask user what they have been doing that day and store activities
    console.log("I'm glad that you seem happy!");

}

function showActivities() {
    for (var i = 0 ; i < Activities.length; i++){
        console.log(Activities[i][Math.floor(Math.random() * Activities[i].length)]);
    }
}

// TODO: Add file reader and read in options for activities to provide a wider variety

handleSentiment([1,-1]);