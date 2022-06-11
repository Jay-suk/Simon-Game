
var buttonColours = ["red", "blue", "green", "yellow"];

//pattern created by the system
var gamePattern = [];
//pattern entered by the user
var userClickedPattern=[];

//checks if game started or not
var started = false;
//maintains the count of level we are currently playing
var level =0;

//to start the game user must enter any key
$(document).keypress(function(){
  //only works for the first key press,,started variable helps in achieving it
  if(!started){
    //game started with level 0
    $("#level-title").text("Level "+level);
    //generate the sequence
    nextSequence();
    started=true;
  }
});


//stores the pattern entered by user
$(".btn").click(function(){
//selecting the particular box based on its id
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length -1);
});


//checking if user and game patterns are same or not
function checkAnswer(currentLevel)
{
  //when user pattern is correct
  //checking if input entered at that order is correct or not
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
  {
    console.log("success");
    //when all the inputs have been covered
    if(userClickedPattern.length === gamePattern.length)
    {
      //delay before next pattern gets displayed
      setTimeout(function(){
        nextSequence();
      },1000);
    }
 }
 //when user pattern is wrong
  else
  {
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver()
  }
}

//generates the sequence of color
function nextSequence()
{

  userClickedPattern = [] ;
  //level is incremented
  level++;
  $("#level-title").text("Level "+level);

  //choosing a random number to generatecolor patterns
  var randomNumber = Math.floor((Math.random()*4));
  var randomChosenColour = buttonColours[randomNumber];   //associating the random number with a color
  gamePattern.push(randomChosenColour);   //adding the random color to the array

  //tells this color is the next in sequence by showing animation
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);   //animation for the color chosen
  playSound(randomChosenColour);   //play sound for the color chosen
}

//to play the sound
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//restart the game after game is over
function startOver()
{
  level=0;
  started=false;
  gamePattern=[];
}

//animation for buttons when user presses it
function animatePress(currentColor) {
 $("#" + currentColor).addClass("pressed");
setTimeout(function () {
  $("#" + currentColor).removeClass("pressed");
  }, 100);
}
