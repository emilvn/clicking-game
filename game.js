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

/* shows game over screen */
function showGameover() {
    let game_over = document.getElementById("game_over");
    game_over.className = "maximize";
}
/* shows level complete screen */
function showLevelcomplete() {
    let level_complete = document.getElementById("level_complete");
    level_complete.className = "maximize";
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
/* reloads page when the restart buttons are clicked */
restart_button1.addEventListener('click', function () { document.location.reload(); });
restart_button2.addEventListener("click", function () { document.location.reload(); });

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
when element is clicked: 
becomes unclickable
gets paused
sprite animation plays
splash animation plays
adding points/subtracting lives where needed
updating scoreboard and/or health bar
*/
syringe.addEventListener("click", function () {
    this.style.pointerEvents = "none";
    addAnimation(this, "pause");
    toggleAnimation(syringe_sprite, "explodeout");
    toggleAnimation(syringe_splash, "blur_in_out");
    player_score += 75;
    player_lives--;
    updateScore(player_score);
    updateHealth(player_lives);
});

/*
when the animation of the element stops
resets animations and picks a new animation
*/
syringe.addEventListener("animationend", function () {
    this.style.pointerEvents = "";
    this.className = "";
    resetAnimation(this);
    addAnimation(this, pickAnimation());
    toggleAnimation(syringe_sprite, "explodeout");
    toggleAnimation(syringe_splash, "blur_in_out");
});

/* repeating above process on each game element */
protein.addEventListener("click", function () {
    this.style.pointerEvents = "none";
    addAnimation(this, "pause");
    addAnimation(protein_sprite, "explodeout");
    addAnimation(protein_splash, "blur_in_out");
    player_score += 15;
    updateScore(player_score);
});
protein.addEventListener("animationend", function () {
    this.style.pointerEvents = "";
    this.className = "";
    resetAnimation(this);
    addAnimation(this, pickAnimation());
    toggleAnimation(protein_sprite, "explodeout");
    toggleAnimation(protein_splash, "blur_in_out");
});

chicken.addEventListener("click", function () {
    this.style.pointerEvents = "none";
    addAnimation(this, "pause");
    addAnimation(chicken_sprite, "explodeout");
    addAnimation(chicken_splash, "blur_in_out");
    player_score += 15;
    updateScore(player_score);
});
chicken.addEventListener("animationend", function () {
    this.style.pointerEvents = "";
    this.className = "";
    resetAnimation(this);
    addAnimation(this, pickAnimation());
    toggleAnimation(chicken_sprite, "explodeout");
    toggleAnimation(chicken_splash, "blur_in_out");
});

beer.addEventListener("click", function () {
    this.style.pointerEvents = "none";
    addAnimation(this, "pause");
    addAnimation(beer_sprite, "explodeout");
    addAnimation(beer_splash, "blur_in_out");
    player_lives--;
    updateHealth(player_lives);
});
beer.addEventListener("animationend", function () {
    this.style.pointerEvents = "";
    this.className = "";
    resetAnimation(this);
    addAnimation(this, pickAnimation());
    toggleAnimation(beer_sprite, "explodeout");
    toggleAnimation(beer_splash, "blur_in_out");
});

vodka.addEventListener("click", function () {
    this.style.pointerEvents = "none";
    addAnimation(this, "pause");
    addAnimation(vodka_sprite, "explodeout");
    addAnimation(vodka_splash, "blur_in_out");
    player_lives--; 
    updateHealth(player_lives);
});
vodka.addEventListener("animationend", function () {
    this.style.pointerEvents = "";
    this.className = "";
    resetAnimation(this);
    addAnimation(this, pickAnimation());
    toggleAnimation(vodka_sprite, "explodeout");
    toggleAnimation(vodka_splash, "blur_in_out");
});

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