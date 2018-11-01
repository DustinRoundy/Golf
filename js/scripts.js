players = [];
class Player {
    constructor(score){
        this.score = score;
    }
    delete(){
        players.splice(this, 1);
        renderPlayers();
    }
}

function addPlayers(){
    let numplayers = $(".numinput").val();
    for (let i = 1; i <= numplayers; i++){
        players.push(new Player(0));
    }
    renderPlayers();

}

function renderPlayers(){
    $(".content").html("");
    for (let i = 1; i <= players.length; i++){
        $(".content").append('<div class="row"><i class="far fa-trash-alt trashcan"></i><span contenteditable="true">Player' + i + '</span></div>');
        $('.trashcan').click(function(){
            $(this).parent().animate({
                opacity: 0,
                left: "-=80"
            }, 400, function(){
                //when animation is done
                $(this).remove();
                players[i].delete();
            });

        })
    }
    $(".modal").hide();
    $(".content").css("filter", "blur(0)");
}

(function() {
    $.ajax({
        url: 'https://golf-courses-api.herokuapp.com/courses/',
        type: 'GET',
        success: (response) => {
            console.log('something');
            console.log(response);

        },
        error: (response) => {
            console.log('error', response);
        }
    });
})();

let numplayer = 4;
let numholes = 18;

function buildCard(){
    for (i=1; i <= numholes; i++){
        $('.card').append(`<div class="column" id="col${i}"></div>`);
    }
    addholes();
}

function addholes(){
    for (let p=1; p <= numplayer; p++){
        for(let h = 1; h<=numholes; h++){
            console.log("are we here??");
            $('#col' + h).append(`<input class="hole" type="text" id="${p}p${h}h">`);
        }
    }
}