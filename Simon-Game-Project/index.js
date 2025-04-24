var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;
var levelcompleted = false;
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    handleClick(userChosenColour);
    levelcompleted = checkAnswer(level);
    if (!levelcompleted) {
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        playSound("wrong");
        setTimeout(function(){startOver()},1000);
    } else if (userClickedPattern.length == gamePattern.length) {
        setTimeout(function(){nextSequence()}, 1000);
        userClickedPattern = [];
    }

})
//3. Check if the user answer is correct.
function checkAnswer(currentLevel) {
    for (var i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] != gamePattern[i]) {
            return false;
        }
    }
    return true;
}
function randomNumber() {
    var number = Math.floor(Math.random() * 4);
    return number;
}
function randomColor(number) {
    var colors = ["red", "blue", "green", "yellow"];
    return colors[number];
}
function nextSequence() {

    //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;

    //5. Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);
    var randomNum = randomNumber();
    var randomCol = randomColor(randomNum);
    gamePattern.push(randomCol);
    $("." + randomCol).fadeOut(100).fadeIn(100);
    playSound(randomCol);
}

function handleClick(color) {
    $("." + color).addClass("pressed");
    setTimeout(function () {
        $("." + color).removeClass("pressed");
    }, 100);
}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;
    levelcompleted = false;
}