
# GA WDI-32 Project 1 - Battle snakes

https://immense-beach-47348.herokuapp.com/

## Setup instructions

- Clone or download the repo
- Install dependencies with `yarn install`
- Launch the app with `gulp`

>**NB**: You will need to have installed `gulp-cli` globally


### Technical Requirements

* **Render a game in the browser**
* **Design logic for winning** & **visually display which player won**
* **Include separate HTML / CSS / JavaScript files**
* Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
* Use **Javascript or jQuery** for **DOM manipulation**
* **Deploy your game online**, where the rest of the world can access it
* Use **semantic markup** for HTML and CSS (adhere to best practices)

---
For our first project we were asked to create a game using HTML, CSS and JavaScript which uses techniques and code that we learned over the first few weeks of the WDI course.

My initial idea was to build a snakes game.
MVP - snakes game. A snake that moves around a grid and increases size by "eating" fruit.
Additional features if time allowed that I managed:
  - 2 players simultaneously
  - rocks appear at random intervals
  - snake gets faster
  - fruit is animated
  - munch sound plays when eating fruit
  - cheers in random colours

Possible other features that I did not implement:
  - rocks reveal an image. Players could guess for additional points/speed

---
Battle snakes is a 2 player game.

Win condition: A player can win by being the first to reach 50 points by eating the fruit or when the other player crashes.

### Technical challenges:
  - creating a grid - My initial thoughts were to create an array of arrays but a single array of cells is easier to manage. I used a function which creates divs in a row and then created a number of rows depending on the grid size.
  - snake - The next challenge was to create a snake. I used an array to hold the snake cells and show it on screen.
  - snake movement - I used event listeners on keydown and had to figure out formula for the next cell that should join the snake array and then removed the first element from the snake array to maintain it's size. One of the bigger challenges was to work out how the snake should move through walls.
  - perpetuate movement - I used timeInterval to run steps at regular time intervals.
  - eating fruit - Score is incremented and the splicing of snake array is skipped to allow him to grow.
  - rocks - preventing rocks from being placed on snake head, or too close to it, or food. There is a 30% chance a rock will appear when food is eaten.
  - detecting crashes - The player loses when he hits a cell already occupied by a snake or a rock.
  - speed - The snake speeds up as his score increases.
  - adding a second player. This was a late
  - holding key - Holding the key allowed multiple keydown and made the snake run quickly. This was a nice feature but both players could not go fast at the same time. To make it fair I disabled this. I also disabled the key to run send the snake in the opposite direction as it was too easy to crash and lose.
