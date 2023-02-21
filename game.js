"use strict";
window.addEventListener("load", main);

/* player variables */
let player_lives = 3;
let player_score = 0;

/* update display functions */
function updateHealth(lives_left) {
    console.log("updateHealth");
    let heart1 = document.querySelector("#life_heart1");
    let heart2 = document.querySelector("#life_heart2");
    let heart3 = document.querySelector("#life_heart3");

    if (lives_left == 3) {
        return;
    }
    else if (lives_left == 2){
        heart3.classList.add("gray_heart");
    }
    else if (lives_left == 1){
        heart2.classList.add("gray_heart");
        heart3.classList.add("gray_heart");
    }
    else if (lives_left == 0){
        heart1.classList.add("gray_heart");
        heart2.classList.add("gray_heart");
        heart3.classList.add("gray_heart");
        
        showGameover();
        stopTimer();
    }
    else {
        return
    }
}
function updateScore(score) {
    console.log("updateScore");
    document.querySelector("#score_number").textContent = score;
}

/* reset display functions */
function resetHealth() {
    console.log("resetHealth");
    let heart1 = document.querySelector("#life_heart1");
    let heart2 = document.querySelector("#life_heart2");
    let heart3 = document.querySelector("#life_heart3");

    heart1.classList.remove("gray_heart");
    heart2.classList.remove("gray_heart");
    heart3.classList.remove("gray_heart");

    player_lives = 3;
    updateHealth(player_lives);
}
function resetScore(){
    console.log("resetScore");
    player_score = 0;
    updateScore(player_score);
}

/* animation functions */
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
function startAnimations() {
    console.log("startAnimations");
    let syringe = document.querySelector("#syringe_container");
    let protein = document.querySelector("#protein_container");
    let chicken = document.querySelector("#chicken_container");
    let beer = document.querySelector("#beer_container");
    let vodka = document.querySelector("#vodka_container");
    
    replaceAnimation(syringe, "");
    replaceAnimation(protein, "");
    replaceAnimation(chicken, "");
    replaceAnimation(beer, "");
    replaceAnimation(vodka, "");
    
    addAnimation(syringe, pickAnimation());
    addAnimation(protein, pickAnimation());
    addAnimation(chicken, pickAnimation());
    addAnimation(beer, pickAnimation());
    addAnimation(vodka, pickAnimation());
}

/* timer functions */
function startTimer() {
    console.log("startTimer");
    let timer = document.querySelector("#time_bar_img");
    timer.className = "timer";
}
function stopTimer() {
    console.log("stopTimer");
    let timer = document.querySelector("#time_bar_img");
    timer.className = "";
}
function resetTimer() {
    console.log("resetTimer");
    let timer = document.querySelector("#time_bar_img");
    timer.className = "";
    resetAnimation(timer);
}

/* functions for displaying start/end game screens */
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

/* hides game elements */
function hideElements() {
    console.log("hideElements");
    let syringe = document.querySelector("#syringe_container");
    let protein = document.querySelector("#protein_container");
    let chicken = document.querySelector("#chicken_container");
    let beer = document.querySelector("#beer_container");
    let vodka = document.querySelector("#vodka_container");
    
    replaceAnimation(syringe, "hidden");
    replaceAnimation(protein, "hidden");
    replaceAnimation(chicken, "hidden");
    replaceAnimation(beer, "hidden");
    replaceAnimation(vodka, "hidden");
}

/* event functions for event listeners */
function neutralElementEvents(game_element) {
    console.log("neutral events");
    let container = document.querySelector(`#${game_element}_container`);
    let sprite = document.querySelector(`#${game_element}_sprite`);
    let splash = document.querySelector(`#${game_element}_splash`);
    let points = 50;
    container.removeEventListener("mousedown", () => { neutralElementEvents(game_element); });

    container.style.pointerEvents = "none";
    addAnimation(container, "pause");
    toggleAnimation(sprite, "explode_away");
    toggleAnimation(splash, "fade_in_out");
    player_score += points;
    player_lives --;
    updateScore(player_score);
    updateHealth(player_lives);
}
function goodElementEvents(game_element) {
    console.log("good events");
    let container = document.querySelector(`#${game_element}_container`);
    let sprite = document.querySelector(`#${game_element}_sprite`);
    let splash = document.querySelector(`#${game_element}_splash`);
    let points = 10;
    container.removeEventListener("mousedown", () => { goodElementEvents(game_element); });

    container.style.pointerEvents = "none";
    addAnimation(container, "pause");
    toggleAnimation(sprite, "explode_away");
    toggleAnimation(splash, "fade_in_out");
    player_score += points;
    updateScore(player_score);
    updateHealth(player_lives);
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
    updateScore(player_score);
    updateHealth(player_lives);
}
function splashEvents(game_element) {
    console.log("splash events")
    let container = document.querySelector(`#${game_element}_container`);
    let sprite = document.querySelector(`#${game_element}_sprite`);
    let splash = document.querySelector(`#${game_element}_splash`);
    splash.removeEventListener("animationend", () => { splashEvents(game_element); });

    container.style.pointerEvents = "";
    container.className = "";
    resetAnimation(container);
    addAnimation(container, pickAnimation());
    toggleAnimation(sprite, "explode_away");
    toggleAnimation(splash, "fade_in_out");
}
function unclickedEvents(game_element) {
    console.log("unclicked events");
    let container = document.querySelector(`#${game_element}_container`);
    container.removeEventListener("animationend", () => { unclickedEvents(game_element); });

    container.className = "";
    resetAnimation(container);
    addAnimation(container, pickAnimation());
}

/* event listener functions */
function addEvents() {
    console.log("addEvents");
    let syringe = document.querySelector("#syringe_container");
    let protein = document.querySelector("#protein_container");
    let chicken = document.querySelector("#chicken_container");
    let beer = document.querySelector("#beer_container");
    let vodka = document.querySelector("#vodka_container");
    
    let syringe_splash = document.querySelector("#syringe_splash");
    let protein_splash = document.querySelector("#protein_splash");
    let chicken_splash = document.querySelector("#chicken_splash");
    let beer_splash = document.querySelector("#beer_splash");
    let vodka_splash = document.querySelector("#vodka_splash");
    
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

/* functions for starting, restarting and ending the game */
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
    let restart_button1 = document.querySelector("#restart_button1");
    let restart_button2 = document.querySelector("#restart_button2");
    let game_over = document.querySelector("#game_over");
    let level_complete = document.querySelector("#level_complete");
    restart_button1.removeEventListener("click", restartGame);
    restart_button2.removeEventListener("click", restartGame);

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
    let timer = document.querySelector("#time_bar_img");
    timer.addEventListener("animationend", function () {
      if (player_score >= 300) {
        showLevelcomplete();
      } else {
        showGameover();
      }
    });
}

/* main function */
function main() {
    console.log("main");
    showStartMenu();
    addButtonListeners();
    addEvents();
    endGame();
}