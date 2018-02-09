
const column = 10;
const width = 10;
let snakeBody = [];
let snakeHead;
let snakeTail;
const directions = ['N','E','S','W'];
const direction = directions[Math.floor(Math.random()*directions.length)];
let startPoint = Math.floor(Math.random() * column * width);



function addToSnakeBody(item){
  return snakeBody.push(item);
}

function init() {
      // console.log(startPoint);
  snakeHead = startPoint;
  addToSnakeBody(snakeHead);
      // console.log(snakeBody);
      console.log(direction);

}
window.addEventListener('DOMContentLoaded', init);
