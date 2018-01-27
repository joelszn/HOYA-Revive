
var fs = require('fs');
var us = require('./user');

var physicalFile = "data/physical.txt";
var emotionalFile = "data/emotional.txt";
var socialFile = "data/social.txt";

Files = [physicalFile, emotionalFile, socialFile];

Activities = [];

class SentimentResponse {

    /**
     * Creates a new SentimentResponse that
     * @param analysis
     */
    constructor(analysis) {
        setUp();
        this.handleSentiment(analysis);
    }

    /**
     * Handles a given array containing a sentiment score and magnitude, choosing
     * @param numArray {{score, tone_id, tone_name},{score, tone_id, tone_name},....} OR {magnitude, score}
     */
    handleSentiment(numArray) {
        var magnitude = numArray[0];
        var score = numArray[1];
        if (score < -.5 && magnitude >= 1) this.handleSad();
        else this.handleHappy();
    }

    /**
     * Handles the case where the user is happy and returns encouraging text
     */
    handleHappy() {
        this.isSad = false;
        this.text = "I'm glad that you seem happy!";
        this.suggestions = null;

        // TODO: ask user what they have been doing that day and store activities
    }

    /**
     * Handles the case where the user's emotions are not entirely clear
     */
    handleMixed() {
        // TODO: pass back to UI and listen again
    }

    /**
    * returns a sympathetic message and a list of three possible activities that would improve mood
    */
    handleSad() {
        this.isSad = true;
        this.text = "I'm sorry that you aren't feeling so great. Maybe try:";
        this.getActivities();
    };

    /**
     * Suggests one activity per type of activity
     */
    getActivities() {
        // TODO: Change category of suggestions based on user history
        var responseArray = [];
        for (var i = 0; i < Activities.length; i++) {
            responseArray.push(Activities[i][Math.floor(Math.random() * Activities[i].length)]);
        }
        this.suggestions = responseArray;
    }
}

/**
 * reads in and sets up the suggestion arrays by reading in the files provided
 */
function setUp() {
    for (i = 0; i < Files.length; i++) {
        Activities.push(readFile(Files[i]));
    }
}

/**
 * Given a file path, reads in the file and returns an array where each line of the text file is an array entry
 * @param fileName is the path of the desired file
 * @returns {string[]} is the list suggestions of the current suggestion type
 */
function readFile(fileName) {
    try {
        var data = fs.readFileSync(fileName, 'utf8');
        var array = data.toString().split("\n");
        return array;
    } catch (e) {
        console.log('Error:', e.stack);
    }
}

module.exports = SentimentResponse;