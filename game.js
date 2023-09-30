// let buttonColours , gamePattern, userClickedPattern, level declared

buttonColours=[ "red", "blue", "green", "yellow" ];
gamePattern=[];
userClickedPattern=[];
var level=0;


// to start game
startOver();
function startOver(){

gamePattern=[];
userClickedPattern=[];
level=0;

$(document).one('keydown', function(event) {
   nextSequence();
 });
}

// click event
$(".btn").click(function(){
      var userChosenColour =$(this).attr("id");
      userClickedPattern.push(userChosenColour);
      playSound(userChosenColour);
      animatePress(userChosenColour);
      checkAnswer(userClickedPattern.length - 1);
      });

   
   
// next sequence
function nextSequence(){
    var randomNumber=Math.floor((Math.random())*4);
    randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    userClickedPattern=[];
    level++;
    $('h1').text(' Level '+level);
    
    
 }

// sound
 function playSound(name){
    var audioaPath = "sounds/"+name+".mp3";
    var audio = new Audio(audioaPath);
    audio.play()
   
 }
// button animation
 function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
 }

// check answer
function checkAnswer(currentLevel){
var allCorrect = true;
for (var i = 0; i <= currentLevel; i++) {
    if (gamePattern[i] !== userClickedPattern[i]) {
        allCorrect = false;
        break;
    }
}

if (allCorrect) {
    if (currentLevel === gamePattern.length - 1) {
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }
}
else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
}

      
} 