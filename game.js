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

let player_lives = 3;

healthBar(player_lives)