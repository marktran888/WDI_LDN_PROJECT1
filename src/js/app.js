//DOM selectors
let gridElement;
let gameContainer;
let audio;
let allCells;
//grid size
const height = 25;
const width = 25;

//snake
const minSnakeSize = 5; //initial min
const startPoint = Math.floor(Math.random() * height * width);
let snakeBody = [];
let snakeHead;
let direction;
let timerId;
let speed = 350; //starting speed

//food
let food;
const foodIcons = ['banana', 'cherry', 'grapes', 'orange', 'pear'];

// sounds
const audioFiles = ['after', 'faster', 'makes_us', 'over', 'better', 'harder', 'more_than', 'stronger', 'do_it', 'hour', 'never', 'work_is', 'ever', 'make_it', 'our', 'work_it'];

//commentary
const commentary = ['not bad!', 'faster!', 'lets go!', 'come on!', 'that\'s better', 'go hard or go home', 'go go go!', 'ya mon!', 'do it!', 'yeah!', 'nice work!', 'good!', 'excellent', 'OK!', 'you can do better!', 'winter is coming!'];
const colors = ['blue', 'dodgerblue', 'aqua', 'lavender', 'lightcyan', 'lime', 'green', 'red', 'magenta'];

//initialize
let score;
let start = true; // for welcome message
let running = true;
let blocks = [];

function audioChoose (){
  return audio.setAttribute('src',`/sounds/${audioFiles[Math.floor(Math.random()*audioFiles.length)]}.wav`);
}

//Build grid
function buildGrid(){
  let cellNumber = 0;
  gridElement = document.createElement('div');
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
  if (start){
    const message = document.querySelector('h2');
    message.innerHTML = 'Score: 0';
    start = false;
  }
  if (running === true){
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
  } else if (score >= 10 && score < 20){
    speed = 200;
  } else if (score >= 20 && score < 30){
    speed = 150;
  } else if (score >= 30){
    speed = 100;
  }
  if (running === true){
    timerId = setInterval(() => {
      step();
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
  if (snakeBody.includes(snakeHead) || blocks.includes(snakeHead)){
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
      message.innerHTML = `<p>Score: ${score}</p><p class="commentary">${commentary[Math.floor(Math.random()*commentary.length)]}</p>`;
      const commentaryElement = document.querySelector('.commentary');
      commentaryElement.style.color = colors[Math.floor(Math.random() * colors.length)];
      allCells[food].classList.remove('food');
      allCells[food].innerHTML = '';
      placeFood();
      if (score >= 2) placeBlocks();
    }
    showSnake();
  }
}

function placeFood(){
  // const allCells = document.querySelectorAll('.cell');
  food = Math.floor(Math.random() * width * height);
  while (blocks.includes(food)){
    food = Math.floor(Math.random() * width * height);
  }
  allCells[food].classList.add('food');
  const foodIcon = foodIcons[Math.floor(Math.random()*foodIcons.length)];
  allCells[food].innerHTML = `<img class="food-icon" src="/images/${foodIcon}.png" alt="${foodIcon}-icon">`;
}

function placeBlocks(){
  //make sure rand isnt already taken
  let tryBlock = Math.floor(Math.random() * width * height);
  while (tryBlock === food){
    tryBlock = Math.floor(Math.random() * width * height);
  }
  blocks.push(tryBlock);
  for (let i = 0; i < blocks.length; i++) {
    allCells[blocks[i]].classList.add('block');
  }
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
    const message = document.querySelector('h2');
    message.innerHTML = 'Score: 0';
    score = 0;
    snakeBody = [];
    blocks = [];
    running = true;
    startGame();
  });
}

function startGame(){
  buildGrid();
  allCells = document.querySelectorAll('.cell');
  snakeHead = startPoint;
  addToSnakeBody(snakeHead);
  showSnake();
  arrowKeys();
  placeFood();
}

function init() {
  gridElement = document.querySelector('.grid');
  gameContainer = document.querySelector('.game-container');
  audio = document.querySelector('audio');
  gameContainer = document.querySelector('.game-container');

  //select speed
  startGame();

}

window.addEventListener('DOMContentLoaded', init);
