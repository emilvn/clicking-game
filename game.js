function healthBar(lives_left){
const style = document.createElement('style');
if (lives_left == 3){
    style.textContent = `
    #life_heart1, #life_heart2, #life_heart3 {
        filter: grayscale(0);
    }
    `
}
else if (lives_left == 2){
    style.textContent = `
    #life_heart1, #life_heart2 {
        filter: grayscale(0);
    }
    `
}
else if (lives_left == 1){
    style.textContent = `
    #life_heart1 {
        filter: grayscale(0);
    }
    `
}
else {
    return
}
document.head.append(style);
}

var player_lives = 3;

healthBar(player_lives)