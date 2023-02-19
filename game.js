/*
makes the health hearts grey depending on how many lives are left
if no more lives are left, stops timer and shows game over screen 
*/
function updateHealth(lives_left) {
    let heart1 = document.getElementById("life_heart1");
    let heart2 = document.getElementById("life_heart2");
    let heart3 = document.getElementById("life_heart3");
    
    if (lives_left == 3) {
        return;
    }
    else if (lives_left == 2){
        heart3.style.filter = "grayscale(1)";
    }
    else if (lives_left == 1){
        heart2.style.filter = "grayscale(1)";
        heart3.style.filter = "grayscale(1)";
    }
    else if (lives_left == 0){
        heart1.style.filter = "grayscale(1)";
        heart2.style.filter = "grayscale(1)";
        heart3.style.filter = "grayscale(1)";
        
        showGameover();
        stopTimer();
    }
    else {
        return
    }
}

/* resets the player lives variable to 3
and resets the player hearts */
function resetHealth() {
    let heart1 = document.getElementById("life_heart1");
    let heart2 = document.getElementById("life_heart2");
    let heart3 = document.getElementById("life_heart3");

    heart1.style.filter = "";
    heart2.style.filter = "";
    heart3.style.filter = "";

    player_lives = 3;
}

/* updates the scoreboard to show the input score */
function updateScore(score) {
    let score_element = document.getElementById("score_number");
    score_element.textContent = score;
}

/* resets the player score to 0 */
function resetScore() {
    player_score = 0;
    updateScore(player_score);
}

/* randomly returns a class from an array of the animation classes */
function pickAnimation() {
    let arr = ["falling1", "falling2", "falling3", "falling4", "falling5", "side_to_side1", "side_to_side2"];
    let i = Math.floor(Math.random() * arr.length);

    return arr[i];
}

/* resets the animation by asking for the height of the element */
function resetAnimation(element) {
    element.offsetHeight;
}

/* adds the input class to the input element */
function addAnimation(element, animation) {
    element.classList.add(animation);
}

/* toggles a given class on an element */
function toggleAnimation(element, animation) {
    element.classList.toggle(animation);
}
/* replaces the class of the input element with the input class */
function replaceClass(element, animation) {
    element.className = animation;
}

/* starts timer */
function startTimer() {
    let timer = document.getElementById("time_bar_img");
    timer.className = "timer";
}

/* stops timer */
function stopTimer() {
    let timer = document.getElementById("time_bar_img");
    timer.className = "";
}

/* resets the timer animation */
function resetTimer() {
    let timer = document.getElementById("time_bar_img");
    resetAnimation(timer);
}

/* shows game over screen and stops the animations*/
function showGameover() {
    let game_over = document.getElementById("game_over");
    game_over.className = "maximize";
    hideElements();
}
/* shows level complete screen and stops the animations*/
function showLevelcomplete() {
    let level_complete = document.getElementById("level_complete");
    level_complete.className = "maximize";
    hideElements();
}

/* removes hidden class and starts animations */
function startAnimations() {
    let syringe = document.getElementById("syringe_container");
    let protein = document.getElementById("protein_container");
    let chicken = document.getElementById("chicken_container");
    let beer = document.getElementById("beer_container");
    let vodka = document.getElementById("vodka_container");
    
    syringe.className = "";
    protein.className = "";
    chicken.className = "";
    beer.className = "";
    vodka.className = "";
    
    addAnimation(syringe, pickAnimation());
    addAnimation(protein, pickAnimation());
    addAnimation(chicken, pickAnimation());
    addAnimation(beer, pickAnimation());
    addAnimation(vodka, pickAnimation());
}

/* hides elements by applying the "hidden" class */
function hideElements() {
    let syringe = document.getElementById("syringe_container");
    let protein = document.getElementById("protein_container");
    let chicken = document.getElementById("chicken_container");
    let beer = document.getElementById("beer_container");
    let vodka = document.getElementById("vodka_container");
    
    syringe.className = "hidden";
    protein.className = "hidden";
    chicken.className = "hidden";
    beer.className = "hidden";
    vodka.className = "hidden";
}

function addEvents(game_element) {
    let container = document.getElementById(`${game_element}_container`);
    let sprite = document.getElementById(`${game_element}_sprite`);
    let splash = document.getElementById(`${game_element}_splash`);
    let points = 0;
    let lives_lost = 0;

    /* 
    checks what element it is
    applies the correct points/lives to be added/subtracted on click
    */
    if (game_element == "syringe") {
      points = 75;
      lives_lost = 1;
    } else if (game_element == "protein" || game_element == "chicken") {
      points = 15;
      lives_lost = 0;
    } else if (game_element == "beer" || game_element == "vodka") {
      points = 0;
      lives_lost = 1;
    }

    /*
    when element is clicked: 
    becomes unclickable
    gets paused
    sprite animation plays
    splash animation plays
    adding points/subtracting lives where needed
    updating scoreboard and/or health bar
    */
    container.addEventListener("click", function () {
        this.style.pointerEvents = "none";
        addAnimation(this, "pause");
        toggleAnimation(sprite, "explodeout");
        toggleAnimation(splash, "blur_in_out");
        player_score += points;
        player_lives -= lives_lost;
        updateScore(player_score);
        updateHealth(player_lives);
    });

    container.addEventListener("animationend", function () {
        this.style.pointerEvents = "";
        this.className = "";
        resetAnimation(this);
        addAnimation(this, pickAnimation());
        toggleAnimation(sprite, "explodeout");
        toggleAnimation(splash, "blur_in_out");
    });
}

/* 
calls startAnimations
minimizes the start window 
calls startTimer
*/
function startGame() {
    startAnimations();
    replaceClass(start_menu, "minimize");
    startTimer();
}

/*
restarts animations
minimizes either the game over or level complete window depending on which is open
resets, and then starts the timer
resets the score and health
*/
function restartGame() {
    startAnimations();
    if (game_over.className == "maximize") {    
        replaceClass(game_over, "minimize");
    }
    else if (level_complete.className == "maximize") {
        replaceClass(level_complete, "minimize");
    }
    resetTimer();
    startTimer();
    resetScore();
    resetHealth();
}

/* start, game over and level complete variables */
let start_menu = document.getElementById("start");
let game_over = document.getElementById("game_over");
let level_complete = document.getElementById("level_complete");

/* start and restart button variables */
let start_button = document.getElementById("start_button");
let restart_button1 = document.getElementById("restart_button1");
let restart_button2 = document.getElementById("restart_button2");

/* starts game when start button is clicked */
start_button.addEventListener('click', startGame);
/* restarts game when restart buttons are clicked */
restart_button1.addEventListener('click', restartGame);
restart_button2.addEventListener("click", restartGame);

/* variables for the players lives and score */
let player_lives = 3;
let player_score = 0;

addEvents("syringe");
addEvents("protein");
addEvents("chicken");
addEvents("beer");
addEvents("vodka");

/* maximize start menu */
start_menu.className = "maximize";

let timer = document.getElementById("time_bar_img");
timer.addEventListener("animationend", function(){
    if (player_score >= 300){
        showLevelcomplete();
    }
    else {
        showGameover();
    }
});