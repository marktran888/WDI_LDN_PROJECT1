const height = 25;
const width = 25;
let snakeBody = [];
let snakeHead;
const minSnakeSize = 5; //initial min
// const directions = ['N','E','S','W'];
// let direction = directions[Math.floor(Math.random()*directions.length)];
let direction;
const startPoint = Math.floor(Math.random() * height * width);
let timerId;
const speedOptions = ['normal', 'fast'];
const speed = speedOptions[0];
let food;
let running = true;
let sound;
const foodIcons = ['banana', 'cherry', 'grapes', 'orange', 'pear'];
const audioFiles = ['after', 'faster', 'makes_us', 'over', 'better', 'harder', 'more_than', 'stronger', 'do_it', 'hour', 'never', 'work_is', 'ever', 'make_it', 'our', 'work_it'];
let score;

function audioChoose (){
  const audio = document.querySelector('audio');
  sound = audioFiles[Math.floor(Math.random()*audioFiles.length)];
  return audio.setAttribute('src',`/sounds/${sound}.wav`);
}

//Build grid
function buildGrid(){
  let cellNumber = 0;
  const gridElement = document.createElement('div');
  const gameContainer = document.querySelector('.game-container');
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
  document.addEventListener('keydown', (e) => {
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
      clearInterval(timerId);
      move(direction);
    }
  });
}

function move(){
  step();
  if (running === true){
    timerId = setInterval(() => {
      step();
    }, speed === 'fast' ? 100 : 250);
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
      message.innerHTML = `<p>Score: ${score}</p><p>${sound}</p>`;
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
  score = Math.max(0, snakeBody.length - minSnakeSize);
  snakeBody=[];
  showSnake();
  running = false;
  const gridElement = document.querySelector('.grid');
  const gameContainer = document.querySelector('.game-container');
  gameContainer.removeChild(gridElement);
  gameContainer.innerHTML = `<img src="/images/snake.png" alt="snake-icon">\
  <p class="score">YOUR SCORE IS ${score}<p>`;
  return running;
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
  //show welcome message
  //display leaderboard
  //select speed
  startGame();

}

window.addEventListener('DOMContentLoaded', init);
