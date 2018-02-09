const column = 20;
const width = 20;
const snakeBody = [];
let snakeHead;
let snakeTail;
// const directions = ['N','E','S','W'];
// let direction = directions[Math.floor(Math.random()*directions.length)];
let direction;
const startPoint = Math.floor(Math.random() * column * width);

function addToSnakeBody(item){
  return snakeBody.push(item);
}

//Build grid
function buildGrid(){
  let cellNumber = 0;
  const gridElement = document.createElement('div');
  document.body.appendChild(gridElement);
  gridElement.classList.add('grid');

  for (let i = 0; i < column; i++) {
    const rowElement = document.createElement('div');
    gridElement.appendChild(rowElement);
    rowElement.classList.add('row');

    for (let j = 0; j < width; j++) {
      const cellElement = document.createElement('div');
      rowElement.appendChild(cellElement);
      cellElement.classList.add('cell');
      cellElement.classList.add(cellNumber);
      cellElement.innerHTML = cellNumber; //for debugging
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
        goWest();
        console.log('left');
        break;
      case 38:
        direction = 'N';
        goNorth();
        console.log('up');
        break;
      case 39:
        direction = 'E';
        goEast();
        console.log('right');
        break;
      case 40:
        direction = 'S';
        goSouth();
        console.log('down');
        break;
      default:
        console.log('invalid button');
    }
  });
}

function goNorth(){
  addToSnakeBody(snakeHead -= width);
  if (snakeBody.length > 5){
    snakeBody.splice(0,1);
  }
  showSnake();
}
function goSouth(){
  addToSnakeBody(snakeHead += width);
  if (snakeBody.length > 5){
    snakeBody.splice(0,1);
  }
  showSnake();
}
function goEast(){
  addToSnakeBody(snakeHead += 1);
  if (snakeBody.length > 5){
    snakeBody.splice(0,1);
  }
  showSnake();
}
function goWest(){
  addToSnakeBody(snakeHead -= 1);
  if (snakeBody.length > 5){
    snakeBody.splice(0,1);
  }
  showSnake();
}


function init() {

  buildGrid();
  snakeHead = startPoint;
  addToSnakeBody(snakeHead);
  showSnake();
  arrowKeys();


}


window.addEventListener('DOMContentLoaded', init);
