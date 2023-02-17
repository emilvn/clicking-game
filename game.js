//grayscales the hearts depending on how many lives are left
function healthBar(lives_left) {
const style = document.createElement('style');
if (lives_left == 3){
    return
}
else if (lives_left == 2){
    style.textContent = `
    #life_heart3 {
        filter: grayscale(1);
    }
    `
}
else if (lives_left == 1){
    style.textContent = `
    #life_heart3, #life_heart2 {
        filter: grayscale(1);
    }
    `
}
else if (lives_left == 0) {
    style.textContent = `
    #life_heart3, #life_heart2, #life_heart1 {
        filter: grayscale(1);
    }
    `;
}
else {
    return
}
document.head.append(style);
}

//changes the scoreboard to show the input score
function scoreBoard(score) {
    let score_element = document.getElementById("score_number");
    score_element.innerHTML = score;
}

//adds an animation class to the element
function addClass(element, animation) {
    element.className += ` ${animation}`;
}
function replaceClass(element, animation) {
    element.className = ` ${animation}`;
}

//plays on game start
function gameStart() {
    //timer varible
    let timer = document.getElementById("time_bar_img");

    //adds falling animations to the game element containers
    addClass(syringe, "side_to_side1");
    addClass(protein, "falling1");
    addClass(chicken, "falling2");
    addClass(beer, "falling3");
    addClass(vodka, "falling4");
    
    //starts the timer animation
    timer.className = "timer";

    //when timer animation ends, tests if player has high enough score
    //and pops up the "game over" or "level complete" screen depending on the score
    timer.addEventListener("animationend", function () {
        if (player_score >= 300) {
            level_complete.className = "maximize";
        }
        else {
            game_over.className = "maximize";
        }
  });
}

//stores the menu, game over and level complete screens in variables
let start_menu = document.getElementById("start");
let game_over = document.getElementById("game_over");
let level_complete = document.getElementById("level_complete");

//stores the start and restart buttons in variables
let start_button = document.getElementById("start_button");
let restart_button1 = document.getElementById("restart_button1");
let restart_button2 = document.getElementById("restart_button2");

//onclick listeners that calls gamestart function and minimizes the window
start_button.addEventListener('click', function () { gameStart(); replaceClass(start_menu, "minimize"); });
restart_button1.addEventListener('click', function () { gameStart(); replaceClass(game_over, "minimize"); });
restart_button2.addEventListener('click', function () { gameStart(); replaceClass(level_complete, "minimize"); });

//stores the game element containers in variables
let syringe = document.getElementById("syringe_container");
let protein = document.getElementById("protein_container");
let chicken = document.getElementById("chicken_container");
let beer = document.getElementById("beer_container");
let vodka = document.getElementById("vodka_container");

//stores the game element sprites in variables
let syringe_sprite = document.getElementById("syringe_sprite");
let protein_sprite = document.getElementById("protein_sprite");
let chicken_sprite = document.getElementById("chicken_sprite");
let beer_sprite = document.getElementById("beer_sprite");
let vodka_sprite = document.getElementById("vodka_sprite");

//stores the game element splashes in variables
let syringe_splash = document.getElementById("syringe_splash");
let protein_splash = document.getElementById("protein_splash");
let chicken_splash = document.getElementById("chicken_splash");
let beer_splash = document.getElementById("beer_splash");
let vodka_splash = document.getElementById("vodka_splash");

//variables for the players lives and score
let player_lives = 3;
let player_score = 0;

//adds an onclick event that pauses the falling animation and plays the animations for the sprites and splashes of the elements
syringe.addEventListener("click", function () {
    addClass(this, "pause");
    addClass(syringe_sprite, "explodeout");
    addClass(syringe_splash, "blur_in_out");
    player_score += 50;
    player_lives -= 1;
});
protein.addEventListener("click", function () {
    addClass(this, "pause");
    addClass(protein_sprite, "explodeout");
    addClass(protein_splash, "blur_in_out");
    player_score += 10;
});
chicken.addEventListener("click", function () {
    addClass(this, "pause");
    addClass(chicken_sprite, "explodeout");
    addClass(chicken_splash, "blur_in_out");
    player_score += 10;
});
beer.addEventListener("click", function () {
    addClass(this, "pause");
    addClass(beer_sprite, "explodeout");
    addClass(beer_splash, "blur_in_out");
    player_lives -= 1;
});
vodka.addEventListener("click", function () {
    addClass(this, "pause");
    addClass(vodka_sprite, "explodeout");
    addClass(vodka_splash, "blur_in_out");
    player_lives -= 1;
});



//updates the health bar
healthBar(player_lives);
//updates the scoreboard
scoreBoard(player_score);

//maximizes the start menu
start_menu.className = "maximize";