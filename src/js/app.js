const column = 10;
const width = 10;
let snakeBody = [];
let snakeHead;
let snakeTail;
const directions = ['N','E','S','W'];
const direction = directions[Math.floor(Math.random()*directions.length)];
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
  for (let i = 0; i < snakeBody.length; i++) {
    allCells[snakeBody[i]].classList.add('snakeBody');
  }
}

function init() {

  buildGrid();
  snakeHead = startPoint;
  addToSnakeBody(snakeHead);
  showSnake();


}


window.addEventListener('DOMContentLoaded', init);
