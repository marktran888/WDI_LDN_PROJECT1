//DOM selectors
let gridElement;
let gameContainer;
let audio;
let allCells;

//grid size
const height = 25;
const width = 45;

//snake
const minSnakeSize = 5; //initial min
const startPoint = Math.floor(Math.random() * height * width);
//separates players at start
const startPoint2 = (startPoint + 2 + 2 * width) % (height * width);
let snakeBody = [];
let snakeBody2 = [];
let snakeHead;
let snakeHead2;
let direction;
let direction2;
let timerId;
let timerId2;
let speed = 350; //starting speed
let speed2 = 350; //starting speed

//food
let food;
const foodIcons = ['banana', 'cherry', 'grapes', 'orange', 'pear'];

// sounds
const audioFiles = ['after', 'faster', 'makes_us', 'over', 'better', 'harder', 'more_than', 'stronger', 'do_it', 'hour', 'never', 'work_is', 'ever', 'make_it', 'our', 'work_it'];

//commentary
const commentary = ['not bad!', 'faster!', 'lets go!', 'come on!', 'that\'s better', 'go hard or go home', 'go go go!', 'ya mon!', 'do it!', 'yeah!', 'nice work!', 'good!', 'excellent', 'OK!', 'you can do better!', 'winter is coming!'];
const colors = ['blue', 'dodgerblue', 'aqua', 'lavender', 'lightcyan', 'lime', 'green', 'red', 'magenta'];

//initialize
let score = 0;
let score2 = 0;
let winner;
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

function addToSnakeBody(item, snakeBody){
  return snakeBody.push(item);
}

function showSnake(snakeBodyClass, snakeBody){
  for (let i = 0; i < allCells.length; i++) {
    allCells[i].classList.remove(snakeBodyClass);
  }
  for (let i = 0; i < snakeBody.length; i++) {
    allCells[snakeBody[i]].classList.add(snakeBodyClass);
  }
}

function arrowKeys(){
  document.addEventListener('keydown', arrowKeyFunction);
}

function arrowKeyFunction(e){
  switch (e.keyCode) {
    case 37:
      if (direction !== 'E'){
        direction = 'W';
        console.log('left');
        if (running === true){
          clearInterval(timerId);
          move(direction);
        }
      }
      break;
    case 38:
      if (direction !== 'S'){
        direction = 'N';
        console.log('up');
        if (running === true){
          clearInterval(timerId);
          move(direction);
        }
      }
      break;
    case 39:
      if (direction !== 'W'){
        direction = 'E';
        console.log('right');
        if (running === true){
          clearInterval(timerId);
          move(direction);
        }
      }
      break;
    case 40:
      if (direction !== 'N'){
        direction = 'S';
        console.log('down');
        if (running === true){
          clearInterval(timerId);
          move(direction);
        }
      }
      break;
    case 65:
      if (direction2 !== 'E'){
        direction2 = 'W';
        console.log('left');
        if (running === true){
          clearInterval(timerId2);
          move2(direction2);
        }
      }
      break;
    case 87:
      if (direction2 !== 'S'){
        direction2 = 'N';
        console.log('up');
        if (running === true){
          clearInterval(timerId2);
          move2(direction2);
        }
      }
      break;
    case 68:
      if (direction2 !== 'W'){
        direction2 = 'E';
        console.log('right');
        if (running === true){
          clearInterval(timerId2);
          move2(direction2);
        }
      }
      break;
    case 83:
      if (direction2 !== 'N'){
        direction2 = 'S';
        console.log('down');
        if (running === true){
          clearInterval(timerId2);
          move2(direction2);
        }
      }
      break;
    default:
      console.log('invalid button');
  }
  if (start){
    const message = document.querySelector('h2');
    message.innerHTML = '<p>Player1 score: 0</p><p>Player2 score: 0</p>';
    start = false;
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
function move2(){
  step2();
  if (score2 === 0 && score2 < 5){
    speed2 = 300;
  } else if (score2 >= 5 && score2 < 10){
    speed2 = 250;
  } else if (score2 >= 10 && score2 < 20){
    speed2 = 200;
  } else if (score2 >= 20 && score2 < 30){
    speed2 = 150;
  } else if (score2 >= 30){
    speed2 = 100;
  }
  if (running === true){
    timerId2 = setInterval(() => {
      step2();
    }, speed2);
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
  if (snakeBody.includes(snakeHead) || blocks.includes(snakeHead) || snakeBody2.includes(snakeHead)){
    console.log('CRASH'); //for debugging
    /////////////
    if (snakeBody.includes(snakeHead)){
      console.log('player1 crash into self');
    } else if (blocks.includes(snakeHead)){
      console.log('player1 crash into block');
    } else if (snakeBody2.includes(snakeHead)){
      console.log('player1 crash into player2');
    }
    /////////////
    winner = 'Player2';
    randomColors(1);
    // gameOver();
  } else {
    addToSnakeBody(snakeHead, snakeBody);
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
      message.innerHTML = `<p>Player1 score: ${score}</p><p>Player2 score: ${score2}</p><p class="commentary">${commentary[Math.floor(Math.random()*commentary.length)]}</p>`;
      const commentaryElement = document.querySelector('.commentary');
      commentaryElement.style.color = colors[Math.floor(Math.random() * colors.length)];
      allCells[food].classList.remove('food');
      allCells[food].innerHTML = '';
      placeFood();
      if (score >= 5) placeBlocks();
    }
    showSnake('snakeBody', snakeBody);
  }
}
function step2(){
  const allCells = document.querySelectorAll('.cell');
  switch (direction2){
    case 'N':
      snakeHead2 = ((snakeHead2 - width) + (width * height)) % (width * height);
      break;
    case 'S':
      snakeHead2 = ((snakeHead2 + width) + (width * height)) % (width * height);
      break;
    case 'E':
      snakeHead2 = (snakeHead2 - snakeHead2 % width)+(snakeHead2 + 1) % width;
      break;
    case 'W':
      if (snakeHead2 === 0){
        snakeHead2 = width - 1;
      } else {
        snakeHead2 = (snakeHead2 - snakeHead2 % width)+(snakeHead2 - 1) % width;
        break;
      }
  }
  if (snakeBody2.includes(snakeHead2) || blocks.includes(snakeHead2) || snakeBody.includes(snakeHead2)){
    console.log('CRASH'); //for debugging
    /////////////////////
    if (snakeBody2.includes(snakeHead2)){
      console.log('player2 crash into self');
    } else if (blocks.includes(snakeHead2)){
      console.log('player2 crash into block');
    } else if (snakeBody.includes(snakeHead2)){
      console.log('player2 crash into player1');
    }
    /////////////
    winner = 'Player1';
    randomColors(1);
    // gameOver();
  } else {
    addToSnakeBody(snakeHead2, snakeBody2);
    if (snakeHead2 !== food){
      if (snakeBody2.length > minSnakeSize){
        snakeBody2.splice(0,1);
      }
    }
    if (snakeHead2 === food){
      const audio = document.querySelector('audio');
      const message = document.querySelector('h2');
      audioChoose();
      audio.play();
      score2 = Math.max(0, snakeBody2.length - minSnakeSize);
      message.innerHTML = `<p>Player1 score: ${score}</p><p>Player2 score: ${score2}</p><p class="commentary">${commentary[Math.floor(Math.random()*commentary.length)]}</p>`;
      const commentaryElement = document.querySelector('.commentary');
      commentaryElement.style.color = colors[Math.floor(Math.random() * colors.length)];
      allCells[food].classList.remove('food');
      allCells[food].innerHTML = '';
      placeFood();
      if (score2 >= 5) placeBlocks();
    }
    showSnake('snakeBody2', snakeBody2);
  }
}

function placeFood(){
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
  while (tryBlock === food || tryBlock === snakeHead || tryBlock === snakeHead2){
    tryBlock = Math.floor(Math.random() * width * height);
  }
  blocks.push(tryBlock);
  // for (let i = 0; i < blocks.length; i++) {
  //   allCells[blocks[i]].classList.add('block');
  // }
  allCells[tryBlock].classList.add('block');
}

function randomColors(seconds){
  let x = 0;
  const colorTimer = setInterval(() => {
    for (let i = 0; i < allCells.length; i++) {
      allCells[i].setAttribute('style', `background-color: ${colors[Math.floor(Math.random() * colors.length)]};`);
    }
    x++;
    if (x === seconds*10){
      clearInterval(colorTimer);
      gameOver();
    }
  }, 100);
}

function gameOver(){
  clearInterval(timerId);
  clearInterval(timerId2);
  allCells[food].classList.remove('food');
  // snakeBody=[];
  // snakeBody2=[];
  // showSnake();
  running = false;
  gameContainer.innerHTML = '<img class="snake-icon" src="/images/snake.png" alt="snake-icon">';
  const message = document.querySelector('h2');
  if (winner === 'Player1'){
    message.innerHTML = '<p>click on snake to start again<p><p class="red">Player1 WINS</p>';
  } else {
    message.innerHTML = '<p>click on snake to start again<p><p class="blue">Player2 WINS</p>';
  }
  document.removeEventListener('keydown', arrowKeyFunction);
  reset();
}

function reset(){
  const snakeIconElement = document.querySelector('.snake-icon');
  snakeIconElement.addEventListener('click', () => {
    gameContainer.innerHTML = '';
    const message = document.querySelector('h2');
    message.innerHTML = '<p>Player1 score: 0</p><p>Player2 score: 0</p>';
    score = 0;
    snakeBody = [];
    snakeBody2 = [];
    blocks = [];
    running = true;
    startGame();
  });
}

function startGame(){
  buildGrid();
  //find all cells after Grid is built
  allCells = document.querySelectorAll('.cell');
  snakeHead = startPoint;
  snakeHead2 = startPoint2;
  addToSnakeBody(snakeHead, snakeBody);
  addToSnakeBody(snakeHead2, snakeBody2);
  showSnake('snakeBody', snakeBody);
  showSnake('snakeBody2', snakeBody2);
  arrowKeys();
  // arrowKeys2();
  placeFood();
}

function init() {
  gridElement = document.querySelector('.grid');
  gameContainer = document.querySelector('.game-container');
  audio = document.querySelector('audio');

  startGame();
}

window.addEventListener('DOMContentLoaded', init);
