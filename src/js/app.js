let gridElement;
let gameContainer;

const height = 25;
const width = 25;
let snakeBody = [];
let snakeHead;
const minSnakeSize = 5; //initial min
let direction;
const startPoint = Math.floor(Math.random() * height * width);
let timerId;
let speed = 350; //starting speed
let food;
let running = true;
let sound;
const foodIcons = ['banana', 'cherry', 'grapes', 'orange', 'pear'];
const audioFiles = ['after', 'faster', 'makes_us', 'over', 'better', 'harder', 'more_than', 'stronger', 'do_it', 'hour', 'never', 'work_is', 'ever', 'make_it', 'our', 'work_it'];
const commentary = ['not bad!', 'faster!', 'lets go!', 'come on!', 'that\'s better', 'go hard or go home', 'go go go!', 'ya mon!', 'do it!', 'yeah!', 'nice work!', 'good!', 'excellent', 'OK!', 'you can do better!', 'winter is coming!'];
const colors = ['blue', 'dodgerblue', 'aqua', 'lavender', 'lightcyan', 'lime', 'green', 'red', 'magenta'];
let audioIndex;
let score;

function audioChoose (){
  const audio = document.querySelector('audio');
  audioIndex = Math.floor(Math.random()*audioFiles.length);
  sound = audioFiles[audioIndex];
  return audio.setAttribute('src',`/sounds/${sound}.wav`);
}

//Build grid
function buildGrid(){
  let cellNumber = 0;
  gridElement = document.createElement('div');
  gameContainer = document.querySelector('.game-container');
  gameContainer.appendChild(gridElement);
  gridElement.classList.add('grid');

  for (let i = 0; i < height; i++) {
    const rowElement = document.createElement('div');
    gridElement.appendChild(rowElement);
    rowElement.classList.add('row');

    for (let j = 0; j < width; j++) {
      const cellElement = document.createElement('div');
      rowElement.appendChild(cellElement);
      cellElement.classList.add('cell');
      cellElement.classList.add(cellNumber);
      // cellElement.innerHTML = cellNumber; //for debugging
      cellNumber++;
    }
  }
}

function addToSnakeBody(item){
  return snakeBody.push(item);
}

function showSnake(){
  const allCells = document.querySelectorAll('.cell');
  for (var i = 0; i < allCells.length; i++) {
    allCells[i].classList.remove('snakeBody');
  }
  for (let i = 0; i < snakeBody.length; i++) {
    allCells[snakeBody[i]].classList.add('snakeBody');
  }
}

function arrowKeys(){
  document.addEventListener('keydown', arrowKeyFunction);
}

function arrowKeyFunction(e){
  switch (e.keyCode) {
    case 37:
      direction = 'W';
      console.log('left');
      break;
    case 38:
      direction = 'N';
      console.log('up');
      break;
    case 39:
      direction = 'E';
      console.log('right');
      break;
    case 40:
      direction = 'S';
      console.log('down');
      break;
    default:
      console.log('invalid button');
  }
  if (running === true){
    console.log('stopping timerId: '+timerId);
    clearInterval(timerId);
    move(direction);
  }
}

function move(){
  step();
  if (score === 0 && score < 5){
    speed = 300;
  } else if (score >= 5 && score < 10){
    speed = 250;
  } else if (score >= 10 && score < 30){
    speed = 200;
  } else if (score >= 30 && score < 50){
    speed = 150;
  } else if (score >= 50){
    speed = 100;
  }
  if (running === true){
    timerId = setInterval(() => {
      console.log('timerId: '+timerId);
      step();
      console.log('speed' +speed);
    }, speed);
  }
}

function step(){
  const allCells = document.querySelectorAll('.cell');
  switch (direction){
    case 'N':
      snakeHead = ((snakeHead - width) + (width * height)) % (width * height);
      break;
    case 'S':
      snakeHead = ((snakeHead + width) + (width * height)) % (width * height);
      break;
    case 'E':
      snakeHead = (snakeHead - snakeHead % width)+(snakeHead + 1) % width;
      break;
    case 'W':
      if (snakeHead === 0){
        snakeHead = width - 1;
      } else {
        snakeHead = (snakeHead - snakeHead % width)+(snakeHead - 1) % width;
        break;
      }
  }
  if (snakeBody.includes(snakeHead)){
    console.log('CRASH'); //for debugging
    gameOver();
  } else {
    addToSnakeBody(snakeHead);
    if (snakeHead !== food){
      if (snakeBody.length > minSnakeSize){
        snakeBody.splice(0,1);
      }
    }
    if (snakeHead === food){
      const audio = document.querySelector('audio');
      const message = document.querySelector('h2');
      audioChoose();
      audio.play();
      score = Math.max(0, snakeBody.length - minSnakeSize);
      message.innerHTML = `<p>Score: ${score}</p><p class="commentary">${commentary[audioIndex]}</p>`;
      const commentaryElement = document.querySelector('.commentary');
      commentaryElement.style.color = colors[Math.floor(Math.random() * colors.length)];
      allCells[food].classList.remove('food');
      allCells[food].innerHTML = '';
      placeFood();
    }
    showSnake();
  }
}

function placeFood(){
  const allCells = document.querySelectorAll('.cell');
  food = Math.floor(Math.random() * width * height);
  allCells[food].classList.add('food');
  const foodIcon = foodIcons[Math.floor(Math.random()*foodIcons.length)];
  allCells[food].innerHTML = `<img class="food-icon" src="/images/${foodIcon}.png" alt="${foodIcon}-icon">`;
}

function gameOver(){
  clearInterval(timerId);
  console.log(timerId); //for debugging
  const allCells = document.querySelectorAll('.cell');
  allCells[food].classList.remove('food');
  // score = Math.max(0, snakeBody.length - minSnakeSize);
  snakeBody=[];
  showSnake();
  running = false;
  gameContainer.removeChild(gridElement);
  gameContainer.innerHTML = '<img class="snake-icon" src="/images/snake.png" alt="snake-icon">';
  const message = document.querySelector('h2');
  message.innerHTML = 'click on snake to start again';
  document.removeEventListener('keydown', arrowKeyFunction);
  reset();
}

function reset(){
  const snakeIconElement = document.querySelector('.snake-icon');
  snakeIconElement.addEventListener('click', () => {
    gameContainer.innerHTML = '';
    score = 0;
    snakeBody = [];
    running = true;
    startGame();
  });
}

function startGame(){
  buildGrid();
  snakeHead = startPoint;
  addToSnakeBody(snakeHead);
  showSnake();
  arrowKeys();
  placeFood();
}

function init() {
  gridElement = document.querySelector('.grid');
  gameContainer = document.querySelector('.game-container');
  //show welcome message
  //display leaderboard
  //select speed
  startGame();

}

window.addEventListener('DOMContentLoaded', init);
