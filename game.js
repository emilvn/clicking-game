/*
makes the health hearts grey depending on how many lives are left
and pulls up the game over screen if no more lives are left 
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
    else if (lives_left == 0) {
        heart1.style.filter = "grayscale(1)";
        heart2.style.filter = "grayscale(1)";
        heart3.style.filter = "grayscale(1)";
        
        showGameover();
    }
    else {
        return
    }
}

/* updates the scoreboard to show the input score */
function updateScore(score) {
    let score_element = document.getElementById("score_number");
    score_element.textContent = score;
}

/* randomly returns a class from an array of the animation classes */
function pickAnimation() {
    let arr = ["falling1", "falling2", "falling3", "falling4", "falling5", "side_to_side1", "side_to_side2"];
    let i = Math.floor(Math.random() * arr.length);

    return arr[i];
}

function resetAnimation(element) {
    element.offsetHeight;
}

/* adds the input class to the input element */
function addAnimation(element, animation) {
    element.classList.add(animation);
}

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
/* shows game over screen */
function showGameover() {
    game_over.className = "maximize";
}
/* shows level complete screen */
function showLevelcomplete() {
    level_complete.className = "maximize";
}

/* starts animations */
function startAnimations() {
    addAnimation(syringe, pickAnimation());
    addAnimation(protein, pickAnimation());
    addAnimation(chicken, pickAnimation());
    addAnimation(beer, pickAnimation());
    addAnimation(vodka, pickAnimation());
}

/* start, game over and level complete variables */
let start_menu = document.getElementById("start");
let game_over = document.getElementById("game_over");
let level_complete = document.getElementById("level_complete");

/* start and restart button variables */
let start_button = document.getElementById("start_button");
let restart_button1 = document.getElementById("restart_button1");
let restart_button2 = document.getElementById("restart_button2");

/* onclick listeners for starting the game and minimizing the menu */
start_button.addEventListener('click', function () { startAnimations(); replaceClass(start_menu, "minimize"); startTimer(); });
restart_button1.addEventListener('click', function () { playGame(); replaceClass(game_over, "minimize"); });
restart_button2.addEventListener('click', function () { playGame(); replaceClass(level_complete, "minimize"); });

/* game element container variables */
let syringe = document.getElementById("syringe_container");
let protein = document.getElementById("protein_container");
let chicken = document.getElementById("chicken_container");
let beer = document.getElementById("beer_container");
let vodka = document.getElementById("vodka_container");

/* game element sprite variables */
let syringe_sprite = document.getElementById("syringe_sprite");
let protein_sprite = document.getElementById("protein_sprite");
let chicken_sprite = document.getElementById("chicken_sprite");
let beer_sprite = document.getElementById("beer_sprite");
let vodka_sprite = document.getElementById("vodka_sprite");

/* game element splash effect variables */
let syringe_splash = document.getElementById("syringe_splash");
let protein_splash = document.getElementById("protein_splash");
let chicken_splash = document.getElementById("chicken_splash");
let beer_splash = document.getElementById("beer_splash");
let vodka_splash = document.getElementById("vodka_splash");

/* variables for the players lives and score */
let player_lives = 3;
let player_score = 0;

/*
when element is clicked: playing pause animation,
playing sprite/splash effect animations
adding points/subtracting lives where needed
updating scoreboard and/or health bar
*/
syringe.addEventListener("click", function () {
    addAnimation(this, "pause");
    toggleAnimation(syringe_sprite, "explodeout");
    toggleAnimation(syringe_splash, "blur_in_out");
    player_score += 75;
    player_lives--;
    updateScore(player_score);
    updateHealth(player_lives);
    setTimeout(function () {
        syringe.className = "";
        resetAnimation(syringe);
        addAnimation(syringe, pickAnimation());
        toggleAnimation(syringe_sprite, "explodeout");
        toggleAnimation(syringe_splash, "blur_in_out");
    }, 1500);
});
/*
if the element reaches bottom of screen without being clicked
resets animation and picks a new animation
*/
syringe.addEventListener("animationend", function () {
  this.className = "";
  resetAnimation(this);
  addAnimation(this, pickAnimation());
  toggleAnimation(syringe_sprite, "explodeout");
  toggleAnimation(syringe_splash, "blur_in_out");
});

/* repeating above process on each game element */
protein.addEventListener("click", function () {
    addAnimation(this, "pause");
    addAnimation(protein_sprite, "explodeout");
    addAnimation(protein_splash, "blur_in_out");
    player_score += 15;
    updateScore(player_score);
    setTimeout(function () {
        protein.className = "";
        resetAnimation(protein);
        addAnimation(protein, pickAnimation());
        toggleAnimation(protein_sprite, "explodeout");
        toggleAnimation(protein_splash, "blur_in_out");
    }, 1500);
});
protein.addEventListener("animationend", function () {
    this.className = "";
    resetAnimation(this);
    addAnimation(this, pickAnimation());
    toggleAnimation(protein_sprite, "explodeout");
    toggleAnimation(protein_splash, "blur_in_out");
});

chicken.addEventListener("click", function () {
    addAnimation(this, "pause");
    addAnimation(chicken_sprite, "explodeout");
    addAnimation(chicken_splash, "blur_in_out");
    player_score += 15;
    updateScore(player_score);
});
chicken.addEventListener("animationend", function () {
  this.className = "";
  resetAnimation(this);
  addAnimation(this, pickAnimation());
  toggleAnimation(chicken_sprite, "explodeout");
  toggleAnimation(chicken_splash, "blur_in_out");
});

beer.addEventListener("click", function () {
    addAnimation(this, "pause");
    addAnimation(beer_sprite, "explodeout");
    addAnimation(beer_splash, "blur_in_out");
    player_lives--;
    updateHealth(player_lives);
});
beer.addEventListener("animationend", function () {
  this.className = "";
  resetAnimation(this);
  addAnimation(this, pickAnimation());
  toggleAnimation(beer_sprite, "explodeout");
  toggleAnimation(beer_splash, "blur_in_out");
});

vodka.addEventListener("click", function () {
    addAnimation(this, "pause");
    addAnimation(vodka_sprite, "explodeout");
    addAnimation(vodka_splash, "blur_in_out");
    player_lives--; 
    updateHealth(player_lives);
});
vodka.addEventListener("animationend", function () {
  this.className = "";
  resetAnimation(this);
  addAnimation(this, pickAnimation());
  toggleAnimation(vodka_sprite, "explodeout");
  toggleAnimation(vodka_splash, "blur_in_out");
});

/* maximize start menu */
start_menu.className = "maximize";