//updates the health hearts to grayscale the hearts
//depending on how many lives are left
function updateHealth(lives_left) {
const style = document.createElement('style');
    //does nothing if 3 lives are left
    if (lives_left == 3) {
        return;
    }
    
    //grays out 1 heart if 2 lives are left
    else if (lives_left == 2){
        style.textContent = `
            #life_heart3 {
                filter: grayscale(1);
            }
        `;
    }
    //grays out 2 hearts if 1 life is left
    else if (lives_left == 1){
        style.textContent = `
            #life_heart3, #life_heart2 {
                filter: grayscale(1);
            }
        `;
    }
    //if there are no more lives left, grays out all hearts and
    //maximizes game over screen
    else if (lives_left == 0) {
        style.textContent = `
            #life_heart3, #life_heart2, #life_heart1 {
                filter: grayscale(1);
            }
        `;
        game_over.className = "maximize";
    }
    //does nothing if lives_left has other values than 0-3
    else {
        return
    }
    //adds the style from the if else if statements to the head of the html
    document.head.append(style);
}

//updates the scoreboard to show the input score
function updateScore(score) {
    let score_element = document.getElementById("score_number");
    score_element.innerHTML = score;
}

//randomly returns a class from an array of the animation classes
function pickAnimation() {
    let arr = ["falling1", "falling2", "falling3", "falling4", "falling5", "side_to_side1", "side_to_side2"];
    let i = Math.floor(Math.random() * arr.length);

    return arr[i];
}

//adds a class to the element
function addClass(element, animation) {
    element.classList.add(animation);
}
//replaces the class of the element with the input class
function replaceClass(element, animation) {
    element.className = animation;
}

//plays on game start
function playGame() {
    //timer varible
    let timer = document.getElementById("time_bar_img");

    //adds falling animations to the game element containers
    addClass(syringe, pickAnimation());
    addClass(protein, pickAnimation());
    addClass(chicken, pickAnimation());
    addClass(beer, pickAnimation());
    addClass(vodka, pickAnimation());
    
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

//onclick listeners that calls playGame function and minimizes the window
start_button.addEventListener('click', function () { playGame(); replaceClass(start_menu, "minimize");});
restart_button1.addEventListener('click', function () { playGame(); replaceClass(game_over, "minimize"); });
restart_button2.addEventListener('click', function () { playGame(); replaceClass(level_complete, "minimize"); });

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

//adds onclick events that pauses the falling animations
//plays the animations for the sprites and splashes
//adds points on good things, subtracts lives on bad things
//then updates the scoreboard and health bar
syringe.addEventListener("click", function () {
    addClass(this, "pause");
    addClass(syringe_sprite, "explodeout");
    addClass(syringe_splash, "blur_in_out");
    player_score += 50;
    player_lives--;
    updateScore(player_score);
    updateHealth(player_lives);
});
protein.addEventListener("click", function () {
    addClass(this, "pause");
    addClass(protein_sprite, "explodeout");
    addClass(protein_splash, "blur_in_out");
    player_score += 10;
    updateScore(player_score);
});
chicken.addEventListener("click", function () {
    addClass(this, "pause");
    addClass(chicken_sprite, "explodeout");
    addClass(chicken_splash, "blur_in_out");
    player_score += 10;
    updateScore(player_score);
});
beer.addEventListener("click", function () {
    addClass(this, "pause");
    addClass(beer_sprite, "explodeout");
    addClass(beer_splash, "blur_in_out");
    player_lives--;
    updateHealth(player_lives);
});
vodka.addEventListener("click", function () {
    addClass(this, "pause");
    addClass(vodka_sprite, "explodeout");
    addClass(vodka_splash, "blur_in_out");
    player_lives--; 
    updateHealth(player_lives);
});

//maximizes the start menu
start_menu.className = "maximize";