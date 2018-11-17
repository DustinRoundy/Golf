// Get Courses

let courseCollection;
let numPlayers = 5;
let numHoles = 18;
let globalTee;

(function () {
    loadDoc();
})();

function loadDoc() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            courseCollection = JSON.parse(this.responseText);
            console.log(courseCollection);

            for (let i = 0; i < courseCollection.courses.length; i++) {
                $('#courseSelect').append('<option value="' + courseCollection.courses[i].id + '">' + courseCollection.courses[i].name + '</option>')
            }
        }
    };
    xhttp.open('GET', 'https://golf-courses-api.herokuapp.com/courses', true);
    xhttp.send();
}

// Course Information

let myCourse;

function loadCourse(courseid) {
    console.log(courseid);
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            myCourse = JSON.parse(this.responseText);
            console.log(myCourse);
            let teeArray = myCourse.data.holes[0].teeBoxes;
            for(let i = 0; i < teeArray.length; i++) {
                $('#teeSelect').append('<option value="' + i + '">' + teeArray[i].teeType + '</option>')
            }

        }
    };
    xhttp.open('GET', 'https://golf-courses-api.herokuapp.com/courses/'+courseid, true);
    xhttp.send();
}

function getTee(id){
    globalTee = id;
    buildCard();
}

function buildCard() {
    $('.card').append(`<div class="column" id="info"><div class="infoEle">Hole:</div><div class="infoEle">Par:</div><div class="infoEle">Handicap:</div></div>`);
    for(let p = 1; p <= numPlayers; p++){
        $('#info').append(`<div class="infoEle">Player ${p}</div>`)
    }
    for(let i = 1; i <= numHoles; i++) {
        $('.card').append(`<div id="col${i}" class="column"><div class="hole">${i}</div><div class="hole">${myCourse.data.holes[i - 1].teeBoxes[globalTee].yards}</div><div class="hole">${myCourse.data.holes[i - 1].teeBoxes[globalTee].hcp}</div></div>`)
    }
    $('.card').append(`<div class="column" id="outScore"><div class="top">Out</div><div>Score</div></div>`);
    $('.card').append(`<div class="column" id="inScore"><div class="top">In</div><div>Score</div></div>`);
    $('.card').append(`<div class="column" id="totalScore"><div class="top">Total</div><div>Score</div></div>`);
    addHoles();

}

function addHoles() {
    for(let p = 1; p <= numPlayers; p++) {
        $('#outScore').append(`<input class="hole" type="text" id="outScore_${p}" readonly>`);
        $('#inScore').append(`<input class="hole" type="text" id="inScore_${p}" readonly >`);
        $('#totalScore').append(`<input class="hole" type="text" id="totalScore_${p}" readonly>`);
        for(let h = 1; h <= numHoles; h++) {
            $('#col' + h).append(`<input class="hole" type="text" id="p${p}h${h}" onchange="addScore(${p})">`);
        }
    }
}

function addScore(myId) {
   let  myScore = 0;
    // Parse the player number out of the id, make that p
    for(let i = 1; i <= 18; i ++) {
        // console.log(Number($('#p' + myId + 'h' + i).val()));
        let item = $('#p' + myId + 'h' + i).val();
        let scoreItem = Number(item);
        console.log(scoreItem);
        myScore += scoreItem;
        if(i <= 9){
            $(`#outScore_${myId}`).val(myScore);
        } else if (i >= 10){
            $(`#inScore_${myId}`).val(myScore);
        }
        $(`#totalScore_${myId}`).val(myScore);
    }
    console.log(myScore);
    // return myScore;

}

function calcScore(){
    console.log("calc score");
    let $inputs = $('.hole :input');
    console.log($inputs);
    $inputs.each(function() {
        if(jQuery.type(this.val() != "number")) {
            console.log("error, input is not a number!");

        }
        else{
            console.log("ok!")
        }
    })
}
