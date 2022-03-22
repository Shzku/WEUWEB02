class Register{

    constructor(name, surname, club, time){
        this.name = name;
        this.surname = surname;
        this.club = club;
        this.number = number;
        number++;
        this.time = time;
    }

    Print(){
        return "Number: "+ this.number + " | Name: "+this.name + " " + this.surname + " | Club: " + this.club + " | Time: "+ this.time +"<br />";
    }
}

var number = 1;
var store = [];
let storeArray = document.getElementById("print");

document.getElementById("store").onclick = addValue
document.getElementById("storeTime").onclick = storeTime
document.getElementById("shuffle").onclick = shuffle
document.getElementById("best").onclick = bestTime
document.getElementById("start").onclick = startPosition

function storeTime(){
    var number = document.getElementById("number").value;
    var time = document.getElementById("time").value;

    if (time == ""){
        time = 0;
    }

    store.forEach(runner => {
        if (runner.number == number) {
            runner.time = time;
        }
    });

    _Register();
}

function addValue(){
    var _name = document.getElementById("name").value;
    var _surname = document.getElementById("surname").value;
    var _club = document.getElementById("club").value;
    var _time = 0;

    store.push(new Register(_name, _surname, _club, _time));

    _Register();
}

function shuffle(){

    

    for (let current = store.length - 1; current > 0; current-- ) {
        let random = Math.floor(Math.random() * (current + 1));

        let temp = store[current];
        store[current] = store[random];
        store[random] = temp;
    }
    _Register();
}

function bestTime(){
    store = store.sort((a, b) => a.time - b.time);
    _Register();
}

function startPosition(){
    store = store.sort((a, b) => a.number - b.number);
    _Register();
}

function _Register(){
    storeArray.innerHTML = "";
    store.forEach(localstore => {
        storeArray.innerHTML += localstore.Print();
    });
}