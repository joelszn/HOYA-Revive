let Activities = [];
function setUp(file) {
    for (i = 0; i < Files.length; i++) {
        Activities.push(readFile(Files[i]));
    }
}

class SentimentResponse {
    constructor(analysis) {
        setUp();
        this.handleSentiment(analysis);
    }
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
    handleHappy(score) { this.text = "I'm glad that you seem happy! What have you been up to today?";}
    handleNeutral() { this.text = "What have you done today?"; }
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
    handleScared(score) {
        if (score > .85) {
            this.text = "I am sorry that you are going through this. Take some deep breaths. Everything will be okay.";
        }
        else {
            this.text = "You seem a bit anxious. Why don't you: "
            this.getActivities();
        }
    }
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
    handleConfident(score) {
        this.text = "You sound like you are feeling good about yourself today!"
    }
    getActivities() {
        var responseArray = [];
        for (var i = 0; i < Activities.length; i++) {
            responseArray.push(Activities[i][Math.floor(Math.random() * Activities[i].length)]);
        }
        this.suggestions = responseArray;
    }
}
