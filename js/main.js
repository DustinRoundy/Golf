// Get Courses

let courseCollection;
let numPlayers;
let numHoles = 18;
let globalTee;
let totalPar;

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
            $('#setup').modal();
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
    // buildCard();
}
function addPlayers(num){
    numPlayers = num;
    buildCard();
    $.modal.close();
}
function buildCard() {
    $('.card').html("");
    totalPar = 0;
    let totalYard = 0;
    $('.card').append(`<div class="column" id="info"><div class="infoEle">Hole:</div><div class="infoEle">Par:</div><div class="infoEle">Yardage:</div><div class="infoEle">Handicap:</div></div>`);
    for(let p = 1; p <= numPlayers; p++){
        $('#info').append(`<div class="infoEle">Player ${p}</div>`)
    }
    for(let i = 1; i <= numHoles; i++) {
        let hcp = myCourse.data.holes[i - 1].teeBoxes[globalTee].hcp;
        let yards = myCourse.data.holes[i - 1].teeBoxes[globalTee].yards;
        let par = myCourse.data.holes[i - 1].teeBoxes[globalTee].par;
        totalPar += par;
        totalYard += yards;
        $('.card').append(`<div id="col${i}" class="column"><div class="hole">${i}</div><div class="hole par" >${par}</div><div class="hole">${yards}</div><div class="hole">${hcp}</div></div>`)
    }
    $('.card').append(`<div class="column" id="outScore"><div class="top1">Total Par:</div><div class="top">Total Yardage:</div><div class="top">Out Score</div><div></div></div>`);
    $('.card').append(`<div class="column" id="inScore"><div class="top1" id="coursePar">${totalPar}</div><div class="top">${totalYard}</div><div class="top">In Score</div></div>`);
    $('.card').append(`<div class="column" id="totalScore"><div class="top2 top">Total Score</div></div>`);
    addHoles();

}

function addHoles() {
    for(let p = 1; p <= numPlayers; p++) {
        $('#outScore').append(`<input class="score" type="text" id="outScore_${p}" readonly>`);
        $('#inScore').append(`<input class="score" type="text" id="inScore_${p}" readonly >`);
        $('#totalScore').append(`<input class="score" type="text" id="totalScore_${p}" readonly>`);
        for(let h = 1; h <= numHoles; h++) {
            if(h === 18){
                $('#col' + h).append(`<input class="hole" type="text" id="p${p}h${h}" onchange="addScore(${p},${h});">`);
            } else {
                $('#col' + h).append(`<input class="hole" type="text" id="p${p}h${h}" onchange="addScore(${p}, ${h})">`);
            }

        }
    }
}

function addScore(myId, hole) {
   let  total = 0;
   let inScore = 0;
   let outScore = 0;
    // Parse the player number out of the id, make that p
    for(let i = 1; i <= 18; i++) {
        // console.log(Number($('#p' + myId + 'h' + i).val()));
        let item = $('#p' + myId + 'h' + i).val();
        let scoreItem = Number(item);
        console.log(scoreItem);
        total += scoreItem;
        $(`#totalScore_${myId}`).val(total);
    }
    for(let i = 1; i <= 9; i++) {
        // console.log(Number($('#p' + myId + 'h' + i).val()));
        let item = $('#p' + myId + 'h' + i).val();
        let scoreItem = Number(item);
        console.log(scoreItem);
        outScore += scoreItem;
        $(`#outScore_${myId}`).val(outScore);
    }
    for(let i = 10; i <= 18; i++) {
        // console.log(Number($('#p' + myId + 'h' + i).val()));
        let item = $('#p' + myId + 'h' + i).val();
        let scoreItem = Number(item);
        console.log(scoreItem);
        inScore += scoreItem;
        $(`#inScore_${myId}`).val(inScore);
    }
    if(hole == 18 && myId == numPlayers){
        for(i = 1; i <= numPlayers; i++){
            let pScore = $('#totalScore_' + i).val();
            let pPar = totalPar - pScore;
            console.log("calcualte score");
            console.log(totalPar);
            console.log(pScore);
            console.log(pPar);
            if(pPar > 0 && pPar < totalPar){
                $('#ex1').append(`<h3>Good Job Player ${i} you were ${pPar} below par!</h3>`);
            }
            else if (pPar == totalPar) {
                $('#ex1').append(`<h3>Good Job Player ${i} you were right on Par!!</h3>`);
            }
            else{
                pPar = Math.abs(pPar);
                $('#ex1').append(`<h3>Better luck next time Player ${i}, you were ${pPar} over par!</h3>`);
            }

        }
        $('#ex1').modal();
    }
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
function final(user){
    alert(`Player ${user} is finished`)
}
