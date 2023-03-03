"use strict";
window.addEventListener("load", main);

/* =============== player variables =============== */
let player_lives = 3;
let player_score = 0;

/* =============== time bar variable =============== */
let time_bar = document.querySelector("#time_bar_img");

/* =============== element variables =============== */
let syringe = document.querySelector("#syringe_container");
let protein = document.querySelector("#protein_container");
let chicken = document.querySelector("#chicken_container");
let beer = document.querySelector("#beer_container");
let vodka = document.querySelector("#vodka_container");

/* =============== main function =============== */
function main() {
    console.log("main");
    showStartMenu();
    addButtonListeners();
}

/* =============== update display functions =============== */
function updateHealth() {
    let heart = document.querySelector(`#life_heart${player_lives + 1}`);
    console.log("updateHealth");
    if (player_lives < 3) {
        addAnimation(heart, "gray_heart");
    }
    if (player_lives == 0) {
        showGameover();
        stopTimer();
    }
}
function updateScore() {
    console.log("updateScore");
    let score_board = document.querySelector("#score_number");
    score_board.textContent = player_score;
}

/* =============== reset display functions =============== */
function resetHealth() {
    let heart1 = document.querySelector("#life_heart1");
    let heart2 = document.querySelector("#life_heart2");
    let heart3 = document.querySelector("#life_heart3");
    console.log("resetHealth");
    replaceAnimation(heart1, "");
    replaceAnimation(heart2, "");
    replaceAnimation(heart3, "");
    player_lives = 3;
    updateHealth();
}
function resetScore() {
    console.log("resetScore");
    player_score = 0;
    updateScore();
}

/* =============== animation functions =============== */
function pickAnimation() {
    console.log("pickAnimation");
    let arr = ["falling_pos_1", "falling_pos_2", "falling_pos_3", "falling_pos_4", "falling_pos_5", "zigzag_right", "zigzag_left"];
    let i = Math.floor(Math.random() * arr.length);
    return arr[i];
}
function resetAnimation(element) {
    console.log("resetAnimation");
    element.offsetHeight;
}
function addAnimation(element, animation) {
    console.log("addAnimation");
    element.classList.add(animation);
}
function toggleAnimation(element, animation) {
    console.log("toggleAnimation");
    element.classList.toggle(animation);
}
function replaceAnimation(element, animation) {
    console.log("replaceAnimation");
    element.className = animation;
}
function removeAnimations(element) {
    console.log("removeAnimations");
    element.classList.remove("falling_pos_1", "falling_pos_2", "falling_pos_3", "falling_pos_4", "falling_pos_5", "zigzag_right", "zigzag_left");
}
function removeClass(element, animation) {
    console.log("removeClass");
    element.classList.remove(animation);
}
function startAnimations() {
    console.log("startAnimations");
    showElements();
    removeAnimations(syringe);
    removeAnimations(protein);
    removeAnimations(chicken);
    removeAnimations(beer);
    removeAnimations(vodka);
    resetAnimation(syringe);
    resetAnimation(protein);
    resetAnimation(chicken);
    resetAnimation(beer);
    resetAnimation(vodka);
    addAnimation(syringe, pickAnimation());
    addAnimation(protein, pickAnimation());
    addAnimation(chicken, pickAnimation());
    addAnimation(beer, pickAnimation());
    addAnimation(vodka, pickAnimation());
}

/* =============== timer functions =============== */
function startTimer() {
    console.log("startTimer");
    addAnimation(time_bar, "timer");
    
    document.querySelector("#background_music").currentTime = 0;
    document.querySelector("#background_music").play();
    time_bar.addEventListener("animationend", endGame);
}
function stopTimer() {
    console.log("stopTimer");
    replaceAnimation(time_bar, "");
    document.querySelector("#background_music").pause();
}
function resetTimer() {
    console.log("resetTimer");
    replaceAnimation(time_bar, "");
    resetAnimation(time_bar);
}

/* =============== start/endgame screen functions =============== */
function showStartMenu() {
    console.log("showStartMenu");
    let start_menu = document.querySelector("#start");
    replaceAnimation(start_menu, "maximize");
}
function showGameover() {
    console.log("showGameover");
    let game_over = document.querySelector("#game_over");

    document.querySelector("#gameover_sound").currentTime = 0;
    document.querySelector("#gameover_sound").play();
    replaceAnimation(game_over, "maximize");
    hideElements();
}
function showLevelcomplete() {
    console.log("showLevelComplete");
    let level_complete = document.querySelector("#level_complete");

    document.querySelector("#levelcomplete_sound").currentTime = 0;
    document.querySelector("#levelcomplete_sound").play();
    replaceAnimation(level_complete, "maximize");
    hideElements();
}

/* =============== hide/show elements functions =============== */
function showElements() {
    console.log("showElements");
    removeAnimations(syringe);
    removeAnimations(protein);
    removeAnimations(chicken);
    removeAnimations(beer);
    removeAnimations(vodka);

    removeClass(syringe, "hidden");
    removeClass(protein, "hidden");
    removeClass(chicken, "hidden");
    removeClass(beer, "hidden");
    removeClass(vodka, "hidden");
}
function hideElements() {
    console.log("hideElements");
    removeUnclickedEvents();
    addAnimation(syringe, "hidden");
    addAnimation(protein, "hidden");
    addAnimation(chicken, "hidden");
    addAnimation(beer, "hidden");
    addAnimation(vodka, "hidden");
}

/* =============== event functions =============== */
function neutralElementEvents() {
    console.log("neutral events");
    let container = this;
    let sprite = this.querySelector(".sprite");
    let splash = this.querySelector(".splash");
    let points = 50;
    container.removeEventListener("mousedown", neutralElementEvents);

    document.querySelector("#evil_sound").currentTime = 0;
    document.querySelector("#evil_sound").play();
    toggleAnimation(container, "pause");
    toggleAnimation(sprite, "explode_away");
    toggleAnimation(splash, "fade_in_out");
    player_score += points;
    player_lives --;
    updateScore();
    updateHealth();

    splash.addEventListener("animationend", splashEvents);
}
function goodElementEvents() {
    console.log("good events");
    let container = this;
    let sprite = this.querySelector(".sprite");
    let splash = this.querySelector(".splash");
    let points = 10;
    container.removeEventListener("mousedown", goodElementEvents);

    
    document.querySelector("#good_sound").currentTime = 0;
    document.querySelector("#good_sound").play();
    toggleAnimation(container, "pause");
    toggleAnimation(sprite, "explode_away");
    toggleAnimation(splash, "fade_in_out");
    player_score += points;
    updateScore();
    updateHealth();

    splash.addEventListener("animationend", splashEvents);
}
function badElementEvents() {
    console.log("bad events");
    let container = this;
    let sprite = this.querySelector(".sprite");
    let splash = this.querySelector(".splash");
    container.removeEventListener("mousedown", badElementEvents);

    document.querySelector("#bad_sound").currentTime = 0;
    document.querySelector("#bad_sound").play();
    addAnimation(container, "pause");
    toggleAnimation(sprite, "explode_away");
    toggleAnimation(splash, "fade_in_out");
    player_lives--;
    updateScore();
    updateHealth();

    splash.addEventListener("animationend", splashEvents);
}
function splashEvents() {
    console.log("splash events")
    console.log(this);
    let container = this.parentElement;
    let sprite = container.querySelector(".sprite");
    let splash = this;
    let event;

    removeClass(container, "pause");
    removeAnimations(container);
    resetAnimation(container);
    addAnimation(container, pickAnimation());
    toggleAnimation(sprite, "explode_away");
    toggleAnimation(splash, "fade_in_out");

    switch(container){
        case syringe:
            event = neutralElementEvents;
            break;
        case protein:
        case chicken:
            event = goodElementEvents;
            break;
        case beer:
        case vodka:
            event = badElementEvents;
            break;
        default:
            console.log("unknown element");
            break;
    }
    container.addEventListener("mousedown", event);
}
function unclickedEvents() {
    console.log("unclicked events");
    let container = this;
    removeAnimations(container);
    resetAnimation(container);
    addAnimation(container, pickAnimation());
}

/* =============== event listener functions =============== */
function addEvents() {
    console.log("addEvents");
    
    syringe.addEventListener("mousedown", neutralElementEvents);
    protein.addEventListener("mousedown", goodElementEvents);
    chicken.addEventListener("mousedown", goodElementEvents);
    beer.addEventListener("mousedown", badElementEvents);
    vodka.addEventListener("mousedown", badElementEvents);
    
    syringe.addEventListener("animationend", unclickedEvents);
    protein.addEventListener("animationend", unclickedEvents);
    chicken.addEventListener("animationend", unclickedEvents);
    beer.addEventListener("animationend", unclickedEvents);
    vodka.addEventListener("animationend", unclickedEvents);
}    
function addButtonListeners() {
    console.log("addButtonEvents");
    let start_button = document.querySelector("#start_button");
    let restart_button1 = document.querySelector("#restart_button1");
    let restart_button2 = document.querySelector("#restart_button2");

    start_button.addEventListener("click", startGame);
    restart_button1.addEventListener("click", restartGame);
    restart_button2.addEventListener("click", restartGame);
}
function removeUnclickedEvents() {
    console.log("removeUnclickedEvents");
    syringe.removeEventListener("animationend", unclickedEvents);
    protein.removeEventListener("animationend", unclickedEvents);
    chicken.removeEventListener("animationend", unclickedEvents);
    beer.removeEventListener("animationend", unclickedEvents);
    vodka.removeEventListener("animationend", unclickedEvents);
}

/* =============== start/restart/end game functions =============== */
function startGame() {
    console.log("startGame");
    let start_button = document.querySelector("#start_button");
    let start_menu = document.querySelector("#start");
    start_button.removeEventListener("click", startGame);

    startAnimations();
    replaceAnimation(start_menu, "minimize");
    startTimer();
    addEvents();
}
function restartGame() {
    console.log("restartGame");
    let game_over = document.querySelector("#game_over");
    let level_complete = document.querySelector("#level_complete");

    if (game_over.className == "maximize") {    
        replaceAnimation(game_over, "minimize");
    }
    else if (level_complete.className == "maximize") {
        replaceAnimation(level_complete, "minimize");
    }
    resetTimer();
    resetScore();
    resetHealth();
    startAnimations();
    startTimer();
    addEvents();
}
function endGame() {
    console.log("endGame");
    document.querySelector("#background_music").pause();
      if (player_score >= 300) {
        showLevelcomplete();
      } else {
        showGameover();
    }
    time_bar.removeEventListener("animationend", endGame);
}