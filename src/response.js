
var fs = require('fs');

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
     * @param numArray [score, tone_id]
     */
    handleSentiment(responseArray) {
        var score = responseArray[0];
        var name = responseArray[1];
        if (name == 'sadness') this.handleSad(score);
        else if (name == 'joy') this.handleHappy(score);
        else if (name == 'anger') this.handleMad(score);
        else if (name == 'fear') this.handleScared(score);
        else if (name == 'confident') this.handleConfident(score);
        else this.handleNeutral();
    }

    /**
     * Handles the case where the user is happy and returns encouraging text
     */
    handleHappy(score) {
        this.text = "I'm glad that you seem happy! What have you been up to today?";
        // TODO: ask user what they have been doing that day and store activities
    }

    /**
     * Handles the case where the user's emotions are not entirely clear
     */
    handleNeutral() {
        // TODO: pass back to UI and listen again
        this.text = "What have you done today?";
    }

    /**
     * Handles the case where the the user seems angry
     * @param score
     */
    handleMad(score) {
        if (score > .75) {
            this.text = "It seems like something has really affected you. Why don't you blow some steam off by: "
            this.getActivities();
        }
        else {
            this.text = "You seem a bit irritated. You might want to calm down by:"
            this.getActivities();
        }
    }

    /**
     * Handles the case where the user seems afraid or anxious
     * @param score
     */
    handleScared(score) {
        if (score > .85) {
            this.text = "I am sorry that you are going through this. Take some deep breaths. Everything will be okay.";
        }
        else {
            this.text = "You seem a bit anxious. Why don't you: "
            this.getActivities();
        }
    }

    /**
    * returns a sympathetic message and a list of three possible activities that would improve mood
    */
    handleSad(score) {
        if (score > .9) {
            this.text = "I am sorry that you are feeling so bad. If you need to talk to someone, please call 1-800-273-8255."
        }
        else if (score > .75) {
            this.text = "It sounds like you are having a pretty bad day. It might help to try one of these: "
            this.getActivities();
        }
        else {
            this.text = "I'm sorry that you aren't feeling so great. Maybe try:";
            this.getActivities();
        }
    }

    /**
     * Handles the case where the user seems confident
     * @param score
     */
    handleConfident(score) {
        this.text = "You sound like you are feeling good about yourself today!"
    }

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