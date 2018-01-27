
class User {

    constructor(username){
        this.name = username;
        this.feelingsHistory = [];
    }

    updateFeelings(feeling, strength)  {
        for (var i = 0; i < this.feelingsHistory.length; i++){
            if (feeling.localeCompare(this.feelingsHistory[i].name)){
                this.feelingsHistory[i].scores.push(feeling);
                this.feelingHistory[i].occurence++;
                return;
            }
        }
        this.feelingsHistory.push(new Feeling(feeling,strength));
    }

    sayHello() {
        console.log("Hello, " + this.name + ".");
    }

    askFeelings() {
        console.log("Are you still feeling " + this.feelingsHistory[0].name + "?");
    }
}


class Feeling {

    constructor(feeling, strength) {
        this.name = feeling;
        this.score = [strength];
        this.occurrence = 1;
    }

    updateFeeling(strength) {
        this.score.push(strength);
        this.occurrence++;
    }
}



