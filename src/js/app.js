const height = 25;
const width = 25;
const snakeBody = [];
let snakeHead;
const minSnakeSize = 5; //initial min
// const directions = ['N','E','S','W'];
// let direction = directions[Math.floor(Math.random()*directions.length)];
let direction;
const startPoint = Math.floor(Math.random() * height * width);
let timerId;
const speedOptions = ['normal', 'fast'];
let speed = speedOptions[1];
let food;

function addToSnakeBody(item){
  return snakeBody.push(item);
}

//Build grid
function buildGrid(){
  let cellNumber = 0;
  const gridElement = document.createElement('div');
  document.body.appendChild(gridElement);
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
    clearInterval(timerId);
    move(direction);
  });
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
      snakeHead = (snakeHead - snakeHead % width)+(snakeHead - 1) % width;
      break;
  }
  addToSnakeBody(snakeHead);
  if (snakeHead !== food){
    if (snakeBody.length > minSnakeSize){
      snakeBody.splice(0,1);
    }
  }
  if (snakeHead === food){
    allCells[food].classList.remove('food');
    placeFood();
  }
  showSnake();
}

function move(){
  step();
  timerId = setInterval(() => {
    step();
  }, speed === 'fast' ? 100 : 250);
}

function placeFood(){
  const allCells = document.querySelectorAll('.cell');
  food = Math.floor(Math.random() * width * height);
  allCells[food].classList.add('food');
}

function init() {

  buildGrid();
  snakeHead = startPoint;
  addToSnakeBody(snakeHead);
  showSnake();
  arrowKeys();
  placeFood();

}

window.addEventListener('DOMContentLoaded', init);
