var $start = document.querySelector('#start');
var $background = document.querySelector('#game');
var $timeText = document.querySelector('#time');
var $input = document.querySelector('input');
var $scoreText = document.querySelector('#score')
var score = 0;
$background.addEventListener('click', handleBoxClick);

$start.addEventListener('click', () => {
    $scoreText.innerHTML = score;
    $input.disabled = true
    $start.classList.add('hide');
    $background.style.backgroundColor = '#fff'
    renderBox();

    var interval = setInterval(()=>{
        if($timeText.innerHTML == 0) {
            clearInterval(interval)
            console.log(score);
            endGame();
        }
        else {
            $timeText.innerHTML = ($timeText.innerHTML - 0.1).toFixed(1)
            console.log($timeText.innerHTML == 0)
        }
    },100)
})

function endGame() {
    $input.disabled = false;
    $start.classList.remove('hide')
    $background.style.backgroundColor = '#ccc'
    $timeText.innerHTML = seconds + '.0';
    $scoreText.innerHTML = score;
    score = 0;
}

var seconds = 5;
$input.addEventListener('change', (event) => {
    seconds = event.target.value
    $timeText.innerHTML = seconds + '.0'
})


function handleBoxClick(event) {
    if(event.target.dataset.box) {
        score++;
        renderBox();
    }
}

function randomColor() {
    return '#' + Math.floor(Math.random() * (0xffffff + 1)).toString(16).padStart(6,'0')
}

function renderBox() {
    $background.innerHTML = ''
    var box = document.createElement('div');
    var boxSize = getRandom(30,100);
    var backgroundSize = $background.getBoundingClientRect();
    var maxTop = backgroundSize.height - boxSize;
    var maxLeft = backgroundSize.width - boxSize;
    box.style.backgroundColor = randomColor();
    box.style.height = box.style.width = boxSize + 'px';
    box.style.position = 'absolute';
    box.style.top =  getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true');

    $background.insertAdjacentElement('afterbegin', box);
}

function getRandom(min,max){
    return Math.floor(Math.random() * (max-min) + min);
}