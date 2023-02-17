function healthBar(lives_left){
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

//adds an animation class to the element
function addClass(element, animation) {
    element.className += ` ${animation}`;
}

let player_lives = 3;

healthBar(player_lives);

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

//adds falling animations to the game element containers
addClass(syringe, "side_to_side1");
addClass(protein, "falling1");
addClass(chicken, "falling2");
addClass(beer, "falling3");
addClass(vodka, "falling4");

//adds an onclick event that pauses the falling animation and plays the animations for the sprites and splashes of the elements
syringe.addEventListener('click', function () { addClass(syringe, "pause"); addClass(syringe_sprite, "explodeout"); addClass(syringe_splash, "blur_in_out"); });
protein.addEventListener('click', function () { addClass(protein, "pause"); addClass(protein_sprite, "blurout"); addClass(protein_splash, "blur_in_out"); });
chicken.addEventListener('click', function () { addClass(chicken, "pause"); addClass(chicken_sprite, "blurout"); addClass(chicken_splash, "blur_in_out"); });
beer.addEventListener('click', function () { addClass(beer, "pause"); addClass(beer_sprite, "explodeout"); addClass(beer_splash, "blur_in_out"); });
vodka.addEventListener('click', function () { addClass(vodka, "pause"); addClass(vodka_sprite, "explodeout"); addClass(vodka_splash, "blur_in_out"); });