window.addEventListener("load", main);

/*
makes the health hearts grey depending on how many lives are left
if no more lives are left, stops timer and shows game over screen 
*/
function updateHealth(lives_left) {
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
    let heart1 = document.querySelector("#life_heart1");
    let heart2 = document.querySelector("#life_heart2");
    let heart3 = document.querySelector("#life_heart3");

    heart1.style.filter = "";
    heart2.style.filter = "";
    heart3.style.filter = "";
}

/* updates the scoreboard to show the input score */
function updateScore(score) {
    let score_element = document.querySelector("#score_number");
    score_element.textContent = score;
}

/* randomly returns a class from an array of the animation classes */
function pickAnimation() {
    let arr = ["falling_pos_1", "falling_pos_2", "falling_pos_3", "falling_pos_4", "falling_pos_5", "zigzag_right", "zigzag_left"];
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
    let timer = document.querySelector("#time_bar_img");
    timer.className = "timer";
}

/* stops timer */
function stopTimer() {
    let timer = document.querySelector("#time_bar_img");
    timer.className = "";
}

/* resets the timer animation */
function resetTimer() {
    let timer = document.querySelector("#time_bar_img");
    resetAnimation(timer);
    timer.className = "";
}

/* shows game over screen and stops the animations*/
function showGameover() {
    let game_over = document.querySelector("#game_over");
    replaceClass(game_over, "maximize");
    hideElements();
}
/* shows level complete screen and stops the animations*/
function showLevelcomplete() {
    let level_complete = document.querySelector("#level_complete");
    replaceClass(level_complete, "maximize");
    hideElements();
}

/* removes hidden class and starts animations */
function startAnimations() {
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
    let syringe = document.querySelector("#syringe_container");
    let protein = document.querySelector("#protein_container");
    let chicken = document.querySelector("#chicken_container");
    let beer = document.querySelector("#beer_container");
    let vodka = document.querySelector("#vodka_container");
    
    syringe.className = "hidden";
    protein.className = "hidden";
    chicken.className = "hidden";
    beer.className = "hidden";
    vodka.className = "hidden";
}

function clickEvents(element_name) {
    let container = document.querySelector(`#${element_name}_container`);
    let sprite = document.querySelector(`#${element_name}_sprite`);
    let splash = document.querySelector(`#${element_name}_splash`);
    /*
    when element is clicked: 
    becomes unclickable
    gets paused
    sprite animation plays
    splash animation plays
    adding points/subtracting lives where needed
    updating scoreboard and/or health bar
    */
    container.style.pointerEvents = "none";
    addAnimation(container, "pause");
    toggleAnimation(sprite, "explode_away");
    toggleAnimation(splash, "fade_in_out");
}
    
function animationendEvents(element_name) {
    let container = document.querySelector(`#${element_name}_container`);
    let sprite = document.querySelector(`#${element_name}_sprite`);
    let splash = document.querySelector(`#${element_name}_splash`);

    container.style.pointerEvents = "";
    container.className = "";
    resetAnimation(container);
    addAnimation(container, pickAnimation());
    toggleAnimation(sprite, "explode_away");
    toggleAnimation(splash, "fade_in_out");

}

/* 
calls startAnimations
minimizes the start window 
calls startTimer
*/
function startGame() {
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

function addButtonlisteners() {
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

function endGame() {
    
    console.log("Out of time!");
}


function main() {
    
    let syringe = document.querySelector("#syringe_container");
    let protein = document.querySelector("#protein_container");
    let chicken = document.querySelector("#chicken_container");
    let beer = document.querySelector("#beer_container");
    let vodka = document.querySelector("#vodka_container");
    
    let player_lives = 3;
    let player_score = 0;

    syringe.addEventListener("mousedown", function () { clickEvents("syringe"); player_score += 75; player_lives--; updateHealth(player_lives); updateScore(player_score); });
    protein.addEventListener("mousedown", function () { clickEvents("protein"); player_score += 15; updateScore(player_score); });
    chicken.addEventListener("mousedown", function () { clickEvents("chicken"); player_score += 15; updateScore(player_score); });
    beer.addEventListener("mousedown", function () { clickEvents("beer"); player_lives--; updateHealth(player_lives); });
    vodka.addEventListener("mousedown", function () { clickEvents("vodka"); player_lives--; updateHealth(player_lives); });
    
    syringe.addEventListener("animationend", function () { animationendEvents("syringe"); });
    protein.addEventListener("animationend", function () { animationendEvents("protein"); });
    chicken.addEventListener("animationend", function () { animationendEvents("chicken"); });
    beer.addEventListener("animationend", function () { animationendEvents("beer"); });
    vodka.addEventListener("animationend", function () { animationendEvents("vodka"); });
    
    let start_menu = document.querySelector("#start");
    /* maximize start menu */
    start_menu.className = "maximize";
    
    addButtonlisteners();
    let timer = document.querySelector("#time_bar_img");
    timer.addEventListener("animationend", function () {
      if (player_score >= 300) {
        showLevelcomplete();
      } else {
        showGameover();
      }
    });
}