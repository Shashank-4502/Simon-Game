var buttonColors=["red","blue","green","yellow"];

var gamePattern=[]
var userClickedPattern=[]

var started=false;
var level=0;

$(document).keydown(function(){
    if(!started){
        started=true;
        $("#level-title").text("Level "+level);
        nextSequence();
    }
});

$(".btn").click(function(){
    var userChoosenColor=$(this).attr("id");
    userClickedPattern.push(userChoosenColor);

    playSound(userChoosenColor);
    animatePress(userChoosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);

    var randomChoosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#color-teller").text(randomChoosenColor);
    $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
}

function playSound(randomChoosenColor){
    var audio=new Audio("sounds/"+randomChoosenColor+".mp3");
    audio.play();
}
function animatePress(userChoosenColor){
    $("#"+userChoosenColor).addClass("pressed");
    setTimeout(function(){
        $("#"+userChoosenColor).removeClass("pressed");

    },100);
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over Press Any Key To Restart");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}