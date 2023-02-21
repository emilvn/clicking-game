"use strict";
window.addEventListener("load", main);

let player_lives = 3;
let player_score = 0;

/*
makes the health hearts grey depending on how many lives are left
if no more lives are left, stops timer and shows game over screen 
*/
function updateHealth(lives_left) {
    console.log("updateHealth");
    let heart1 = document.querySelector("#life_heart1");
    let heart2 = document.querySelector("#life_heart2");
    let heart3 = document.querySelector("#life_heart3");

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
    console.log("resetHealth");
    let heart1 = document.querySelector("#life_heart1");
    let heart2 = document.querySelector("#life_heart2");
    let heart3 = document.querySelector("#life_heart3");

    heart1.style.filter = "";
    heart2.style.filter = "";
    heart3.style.filter = "";

    player_lives = 3;
    updateHealth(player_lives);
}

/* updates the scoreboard to show the input score */
function updateScore(score) {
    console.log("updateScore");
    let score_element = document.querySelector("#score_number");
    score_element.textContent = score;
}

/* resets player score variable */
function resetScore(){
    console.log("resetScore");
    player_score = 0;
    updateScore(player_score);
}

/* randomly returns a class from an array of the animation classes */
function pickAnimation() {
    console.log("pickAnimation");
    let arr = ["falling_pos_1", "falling_pos_2", "falling_pos_3", "falling_pos_4", "falling_pos_5", "zigzag_right", "zigzag_left"];
    let i = Math.floor(Math.random() * arr.length);

    return arr[i];
}

/* resets the animation by asking for the height of the element */
function resetAnimation(element) {
    console.log("resetAnimation");
    element.offsetHeight;
}

/* adds the input class to the input element */
function addAnimation(element, animation) {
    console.log("addAnimation");
    element.classList.add(animation);
}

/* toggles a given class on an element */
function toggleAnimation(element, animation) {
    console.log("toggleAnimation");
    element.classList.toggle(animation);
}
/* replaces the class of the input element with the input class */
function replaceClass(element, animation) {
    console.log("replaceClass");
    element.className = animation;
}

/* starts timer */
function startTimer() {
    console.log("startTimer");
    let timer = document.querySelector("#time_bar_img");
    timer.className = "timer";
}

/* stops timer */
function stopTimer() {
    console.log("stopTimer");
    let timer = document.querySelector("#time_bar_img");
    timer.className = "";
}

/* resets the timer animation */
function resetTimer() {
    console.log("resetTimer");
    let timer = document.querySelector("#time_bar_img");
    timer.className = "";
    resetAnimation(timer);
}

/* shows start menu screen */
function showStartMenu() {
    console.log("showStartMenu");
    let start_menu = document.querySelector("#start");
    /* maximize start menu */
    start_menu.className = "maximize";
}

/* shows game over screen and stops the animations*/
function showGameover() {
    console.log("showGameover");
    let game_over = document.querySelector("#game_over");
    replaceClass(game_over, "maximize");
    hideElements();
}
/* shows level complete screen and stops the animations*/
function showLevelcomplete() {
    console.log("showLevelComplete");
    let level_complete = document.querySelector("#level_complete");
    replaceClass(level_complete, "maximize");
    hideElements();
}

/* removes hidden class and starts animations */
function startAnimations() {
    console.log("startAnimations");
    let syringe = document.querySelector("#syringe_container");
    let protein = document.querySelector("#protein_container");
    let chicken = document.querySelector("#chicken_container");
    let beer = document.querySelector("#beer_container");
    let vodka = document.querySelector("#vodka_container");
    
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
    console.log("hideElements");
    let syringe = document.querySelector("#syringe_container");
    let protein = document.querySelector("#protein_container");
    let chicken = document.querySelector("#chicken_container");
    let beer = document.querySelector("#beer_container");
    let vodka = document.querySelector("#vodka_container");
    
    // removeEvents("syringe");
    // removeEvents("protein");
    // removeEvents("chicken");
    // removeEvents("beer");
    // removeEvents("vodka");
    
    resetAnimation(syringe);
    resetAnimation(protein);
    resetAnimation(chicken);
    resetAnimation(beer);
    resetAnimation(vodka);
    
    replaceClass(syringe, "hidden");
    replaceClass(protein, "hidden");
    replaceClass(chicken, "hidden");
    replaceClass(beer, "hidden");
    replaceClass(vodka, "hidden");


}

/*
adds mousedown event on the game element to play animations
and then animationend listener to restart the animation on animation end
*/
function addEvents(game_element) {
    console.log("addEvents");
    let container = document.querySelector(`#${game_element}_container`);
    let sprite = document.querySelector(`#${game_element}_sprite`);
    let splash = document.querySelector(`#${game_element}_splash`);
    let points = 0;
    let lives_lost = 0;

    /* 
    checks what element it is
    applies the correct points/lives to be added/subtracted on click
    */
    if (game_element == "syringe") {
      points = 50;
      lives_lost = 1;
    } else if (game_element == "protein" || game_element == "chicken") {
      points = 10;
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
    container.addEventListener("mousedown", function () {
        this.style.pointerEvents = "none";
        addAnimation(this, "pause");
        toggleAnimation(sprite, "explode_away");
        toggleAnimation(splash, "fade_in_out");
        player_score += points;
        player_lives -= lives_lost;
        updateScore(player_score);
        updateHealth(player_lives);
    });

    /*
    when animation on element ends:
    makes element clickable again
    clears element classes
    resets animation
    toggles off sprite and splash animations
    */
    splash.addEventListener("animationend", function () {
        container.style.pointerEvents = "";
        container.className = "";
        resetAnimation(container);
        addAnimation(container, pickAnimation());
        toggleAnimation(sprite, "explode_away");
        toggleAnimation(this, "fade_in_out");
    });

    container.addEventListener("animationend", function () {
        this.className = "";
        resetAnimation(this);
        addAnimation(this, pickAnimation());
    });
}    

// function removeEvents(game_element) {
//     console.log("removeEvents");
//     let container = document.querySelector(`#${game_element}_container`);
//     let sprite = document.querySelector(`#${game_element}_sprite`);
//     let splash = document.querySelector(`#${game_element}_splash`);

//     container.removeEventListener("mousedown", function () {
//         this.style.pointerEvents = "none";
//         addAnimation(this, "pause");
//         toggleAnimation(sprite, "explode_away");
//         toggleAnimation(splash, "fade_in_out");
//         player_score += points;
//         player_lives -= lives_lost;
//         updateScore(player_score);
//         updateHealth(player_lives);
//     });

//     splash.removeEventListener("animationend", function () {
//         container.style.pointerEvents = "";
//         container.className = "";
//         resetAnimation(container);
//         addAnimation(container, pickAnimation());
//         toggleAnimation(sprite, "explode_away");
//         toggleAnimation(this, "fade_in_out");
//     });

//     container.removeEventListener("animationend", function () {
//         this.className = "";
//         resetAnimation(this);
//         addAnimation(this, pickAnimation());
//     });
// }

/* 
calls startAnimations
minimizes the start window 
calls startTimer
*/
function startGame() {
    console.log("startGame");
    let start_menu = document.querySelector("#start");

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
    console.log("restartGame");
    let game_over = document.querySelector("#game_over");
    let level_complete = document.querySelector("#level_complete");

    

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

/* adds event listeners to start and restart buttons */
function addButtonEvents() {
    console.log("addButtonEvents");
    /* start and restart button variables */
    let start_button = document.querySelector("#start_button");
    let restart_button1 = document.querySelector("#restart_button1");
    let restart_button2 = document.querySelector("#restart_button2");

    /* starts game when start button is clicked */
    start_button.addEventListener("click", startGame);
    /* restarts game when restart buttons are clicked */
    restart_button1.addEventListener("click", restartGame);
    restart_button2.addEventListener("click", restartGame);
}

/* adds all the event listeners for the elements */
function addAnimationEvents(){
    console.log("addAnimationEvents");
    // addEvents("syringe");
    addEvents("syringe");
    addEvents("protein");
    addEvents("chicken");
    addEvents("beer");
    addEvents("vodka");
}

/* picks correct screen to show when timer ends */
function endGame() {
    console.log("endGame");
    let timer = document.querySelector("#time_bar_img");
    timer.addEventListener("animationend", function () {
      if (player_score >= 300) {
        showLevelcomplete();
      } else {
        showGameover();
      }
    });
}

/* 
main function, plays at window load
defines global variables for health and score
*/
function main() {
    console.log("main");

    showStartMenu();
    addButtonEvents();
    addAnimationEvents();
    endGame();
}