const height = 25;
const width = 25;
const snakeBody = [];
let snakeHead;
const minSnakeSize = 5; //initial min
const directions = ['N','E','S','W'];
let direction = directions[Math.floor(Math.random()*directions.length)];
const startPoint = Math.floor(Math.random() * height * width);
let timerId;
const speedOptions = ['normal', 'fast'];
let speed = speedOptions[0];

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
        // goWest();
        console.log('left');
        break;
      case 38:
        direction = 'N';
        // goNorth();
        console.log('up');
        break;
      case 39:
        direction = 'E';
        // goEast();
        console.log('right');
        break;
      case 40:
        direction = 'S';
        // goSouth();
        console.log('down');
        break;
      default:
        console.log('invalid button');
    }
    clearInterval(timerId);
    move(direction);
  });
}

function goNorth(){
  snakeHead = ((snakeHead - width) + (width * height)) % (width * height);
  addToSnakeBody(snakeHead);
  if (snakeBody.length > minSnakeSize){
    snakeBody.splice(0,1);
  }
  showSnake();
}
function goSouth(){
  snakeHead = ((snakeHead + width) + (width * height)) % (width * height);
  addToSnakeBody(snakeHead);
  if (snakeBody.length > minSnakeSize){
    snakeBody.splice(0,1);
  }
  showSnake();
}

function goEast(){
  snakeHead = (snakeHead - snakeHead % width)+(snakeHead + 1) % width;
  addToSnakeBody(snakeHead);
  if (snakeBody.length > minSnakeSize){
    snakeBody.splice(0,1);
  }
  showSnake();
}
function goWest(){
  snakeHead = (snakeHead - snakeHead % width)+(snakeHead - 1) % width;
  addToSnakeBody(snakeHead);
  if (snakeBody.length > minSnakeSize){
    snakeBody.splice(0,1);
  }
  showSnake();
}

function move(direction){
  console.log(direction); //for debugging
  timerId = setInterval(() => {
    switch(direction) {
      case 'N':
        goNorth();
        break;
      case 'E':
        goEast();
        break;
      case 'S':
        goSouth();
        break;
      case 'W':
        goWest();
        break;
      default:
        console.log('invalid move');
    }
  }, speed === 'fast' ? 250 : 100);
}


function init() {

  buildGrid();
  snakeHead = startPoint;
  addToSnakeBody(snakeHead);
  showSnake();
  arrowKeys();


}


window.addEventListener('DOMContentLoaded', init);
