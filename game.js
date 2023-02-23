"use strict";
window.addEventListener("load", main);

/* =============== player variables =============== */
let player_lives = 3;
let player_score = 0;

/* =============== gui variables =============== */
let score = document.querySelector("#score_number");
let timer = document.querySelector("#time_bar_img");
let heart1 = document.querySelector("#life_heart1");
let heart2 = document.querySelector("#life_heart2");
let heart3 = document.querySelector("#life_heart3");

/* =============== element variables =============== */
let syringe = document.querySelector("#syringe_container");
let syringe_splash = document.querySelector("#syringe_splash");

let protein = document.querySelector("#protein_container");
let protein_splash = document.querySelector("#protein_splash");

let chicken = document.querySelector("#chicken_container");
let chicken_splash = document.querySelector("#chicken_splash");

let beer = document.querySelector("#beer_container");
let beer_splash = document.querySelector("#beer_splash");

let vodka = document.querySelector("#vodka_container");
let vodka_splash = document.querySelector("#vodka_splash");

/* =============== update display functions =============== */
function updateHealth() {
    console.log("updateHealth");

    if (player_lives == 3) {
        return;
    }
    else if (player_lives == 2){
        addAnimation(heart3, "gray_heart");
    }
    else if (player_lives == 1){
        addAnimation(heart2, "gray_heart");
        addAnimation(heart3, "gray_heart");
    }
    else if (player_lives == 0){
        addAnimation(heart1, "gray_heart");
        addAnimation(heart2, "gray_heart");
        addAnimation(heart3, "gray_heart");
        showGameover();
        stopTimer();
    }
    else {
        return
    }
}
function updateScore() {
    console.log("updateScore");
    score.textContent = player_score;
}

/* =============== reset display functions =============== */
function resetHealth() {
    console.log("resetHealth");
    replaceAnimation(heart1, "");
    replaceAnimation(heart2, "");
    replaceAnimation(heart3, "");
    player_lives = 3;
    updateHealth();
}
function resetScore(){
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
function removeAnimation(element, animation) {
    element.classList.remove(animation);
}
function startAnimations() {
    console.log("startAnimations");
    showElements();
    addAnimation(syringe, pickAnimation());
    addAnimation(protein, pickAnimation());
    addAnimation(chicken, pickAnimation());
    addAnimation(beer, pickAnimation());
    addAnimation(vodka, pickAnimation());
}

/* =============== timer functions =============== */
function startTimer() {
    console.log("startTimer");
    addAnimation(timer, "timer");
}
function stopTimer() {
    console.log("stopTimer");
    replaceAnimation(timer, "");
}
function resetTimer() {
    console.log("resetTimer");
    replaceAnimation(timer, "");
    resetAnimation(timer);
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
    replaceAnimation(game_over, "maximize");
    hideElements();
}
function showLevelcomplete() {
    console.log("showLevelComplete");
    let level_complete = document.querySelector("#level_complete");
    replaceAnimation(level_complete, "maximize");
    hideElements();
}

/* =============== hide/show elements functions =============== */
function showElements() {
    console.log("showElements");
    resetAnimation(syringe);
    resetAnimation(protein);
    resetAnimation(chicken);
    resetAnimation(beer);
    resetAnimation(vodka);
    removeAnimation(syringe, "hidden");
    removeAnimation(protein, "hidden");
    removeAnimation(chicken, "hidden");
    removeAnimation(beer, "hidden");
    removeAnimation(vodka, "hidden");
    syringe.style.scale = 1;
    protein.style.scale = 1;
    chicken.style.scale = 1;
    beer.style.scale = 1;
    vodka.style.scale = 1;
}
function hideElements() {
    console.log("hideElements");
    syringe.style.scale = 0;
    protein.style.scale = 0;
    chicken.style.scale = 0;
    beer.style.scale = 0;
    vodka.style.scale = 0;
}

/* =============== event functions =============== */
function neutralElementEvents(game_element) {
    console.log("neutral events");
    let container = document.querySelector(`#${game_element}_container`);
    let sprite = document.querySelector(`#${game_element}_sprite`);
    let splash = document.querySelector(`#${game_element}_splash`);
    let points = 50;
    container.removeEventListener("mousedown", () => { neutralElementEvents(game_element); });

    container.style.pointerEvents = "none";
    toggleAnimation(container, "pause");
    toggleAnimation(sprite, "explode_away");
    toggleAnimation(splash, "fade_in_out");
    player_score += points;
    player_lives --;
    updateScore();
    updateHealth();
}
function goodElementEvents(game_element) {
    console.log("good events");
    let container = document.querySelector(`#${game_element}_container`);
    let sprite = document.querySelector(`#${game_element}_sprite`);
    let splash = document.querySelector(`#${game_element}_splash`);
    let points = 10;
    container.removeEventListener("mousedown", () => { goodElementEvents(game_element); });

    container.style.pointerEvents = "none";
    toggleAnimation(container, "pause");
    toggleAnimation(sprite, "explode_away");
    toggleAnimation(splash, "fade_in_out");
    player_score += points;
    updateScore();
    updateHealth();
}
function badElementEvents(game_element) {
    console.log("bad events");
    let container = document.querySelector(`#${game_element}_container`);
    let sprite = document.querySelector(`#${game_element}_sprite`);
    let splash = document.querySelector(`#${game_element}_splash`);
    container.removeEventListener("mousedown", () => { badElementEvents(game_element); });

    container.style.pointerEvents = "none";
    addAnimation(container, "pause");
    toggleAnimation(sprite, "explode_away");
    toggleAnimation(splash, "fade_in_out");
    player_lives--;
    updateScore();
    updateHealth();
}
function splashEvents(game_element) {
    console.log("splash events")
    let container = document.querySelector(`#${game_element}_container`);
    let sprite = document.querySelector(`#${game_element}_sprite`);
    let splash = document.querySelector(`#${game_element}_splash`);
    splash.removeEventListener("animationend", () => { splashEvents(game_element); });

    container.style.pointerEvents = "";
    removeAnimation(container, "pause");
    resetAnimation(container); 
    addAnimation(container, pickAnimation());
    toggleAnimation(sprite, "explode_away");
    toggleAnimation(splash, "fade_in_out");
}
function unclickedEvents(game_element) {
    console.log("unclicked events");
    let container = document.querySelector(`#${game_element}_container`);
    container.removeEventListener("animationend", () => { unclickedEvents(game_element); });

    replaceAnimation(container, "");
    resetAnimation(container);
    addAnimation(container, pickAnimation());
}

/* =============== event listener functions =============== */
function addEvents() {
    console.log("addEvents");
    
    syringe.addEventListener("mousedown", () => { neutralElementEvents("syringe"); });
    protein.addEventListener("mousedown", () => { goodElementEvents("protein"); });
    chicken.addEventListener("mousedown", () => { goodElementEvents("chicken"); });
    beer.addEventListener("mousedown", () => { badElementEvents("beer"); });
    vodka.addEventListener("mousedown", () => { badElementEvents("vodka"); });
    
    syringe_splash.addEventListener("animationend", () => { splashEvents("syringe"); });
    protein_splash.addEventListener("animationend", () => { splashEvents("protein"); });
    chicken_splash.addEventListener("animationend", () => { splashEvents("chicken"); });
    beer_splash.addEventListener("animationend", () => { splashEvents("beer"); });
    vodka_splash.addEventListener("animationend", () => { splashEvents("vodka"); });
    
    syringe.addEventListener("animationend", () => { unclickedEvents("syringe"); });
    protein.addEventListener("animationend", () => { unclickedEvents("protein"); });
    chicken.addEventListener("animationend", () => { unclickedEvents("chicken"); });
    beer.addEventListener("animationend", () => { unclickedEvents("beer"); });
    vodka.addEventListener("animationend", () => { unclickedEvents("vodka"); });
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

/* =============== start/restart/end game functions =============== */
function startGame() {
    console.log("startGame");
    let start_button = document.querySelector("#start_button");
    let start_menu = document.querySelector("#start");
    start_button.removeEventListener("click", startGame);

    startAnimations();
    replaceAnimation(start_menu, "minimize");
    startTimer();
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
}
function endGame() {
    console.log("endGame");
    timer.addEventListener("animationend", function () {
      if (player_score >= 300) {
        showLevelcomplete();
      } else {
        showGameover();
      }
    });
}

/* =============== main function =============== */
function main() {
    console.log("main");
    showStartMenu();
    addButtonListeners();
    addEvents();
    endGame();
}