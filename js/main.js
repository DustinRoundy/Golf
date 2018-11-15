// Get Courses

let courseCollection;
let numPlayers = 5;
let numHoles = 18;

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
            buildCard();
        }
    };
    xhttp.open('GET', 'https://golf-courses-api.herokuapp.com/courses/'+courseid, true);
    xhttp.send();
}

function buildCard() {
    for(let i = 1; i <= numHoles; i++) {
        $('.card').append('<div id="col' + i +'" class="column">' + i + '</div>')
    }
    addHoles();
}

function addHoles() {
    for(let p = 1; p <= numPlayers; p++) {
        for(let h = 1; h <= numHoles; h++) {
            $('#col' + h).append('<input class="hole" type="text" id="p' + p + 'h' + h + '">');
        }
    }
}

function addScore(myId) {
    let myScore = 0;
    // Parse the player number out of the id, make that p
    for(let i = 0; i < 18; i ++) {
        let scoreItem = $('#p' + p + 'h' + i).val();
        myScore += scoreItem;
    }

    return myScore;

}