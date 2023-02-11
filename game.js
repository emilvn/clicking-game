function hideChars(x){
    if (x == true){
        var char_list = document.getElementsByClassName('character');

        for (let i = 0; i < char_list.length; i++) {
            const element = char_list[i];
            document.getElementsByClassName('character')[i].style.display = 'none';
        }
    }
    else {
        return
    }   
}

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

function scoreBoard(score){
    var score_board = document.getElementById('score_id');
    score_board.innerHTML = score;
}

var hours =0;
var mins =0;
var seconds =0;


var timeLeft = 0.5;
    var elem = document.getElementById('seconds');
    
    var timerId = setInterval(timer, 1000);
    
    function timer() {
      if (timeLeft == 1000) {
        clearTimeout(timerId);
      } else {
        elem.innerHTML = timeLeft;
        timeLeft+=0.5;
      }
    }

var player_lives = 3;

var player_score = 500;

hideChars(true);

healthBar(player_lives);

scoreBoard(player_score);