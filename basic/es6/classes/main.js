class Animals {
    constructor(name, size) {
        this.name = name;
        this.size = size;
    }

    speaker(sound) {
        return sound;
    }
}

var birth = new Animals();
birth.name = "chim sẻ";
birth.size = "small";
var soundBirth = birth.speaker("rich.., rich..");
var birthFly = function (fly) {
    console.log(fly);
}

var pig = new Animals();
pig.name = "Con heo";
pig.size = "medium";
var soundPig = pig.speaker("Éc éc...");
var pigRun= function (run) {console.log(run);}