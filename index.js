const baseURL = 'https://pokeapi.co/api/v2/pokemon/';

var isGameOver;
var player;
var playerImage;
var enemy;
var enemyImage;
var backgroundImage;
let url;

var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

P.getPokemonByName("butterfree")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log('There was an ERROR: ', error);
  });


function preload() {
  playerImage = loadImage("gliscor.png");
  enemyImage = loadImage("blackferaligatr.png");
  backgroundImage = loadImage("https://images.unsplash.com/photo-1526392587392-d1627b6c134a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60");
}

// TODO: Set up function to pull the list of pokemon from the json
// TODO: Set up constant variable to be the list of all pokemon
// TODO: Set up two new variables to be equal to the selected pokemon, and the other to be a random pokemon every time it loops






function setup() {
  isGameOver = false;
  createCanvas(600, 600); // creates canvas on screen
  player = createSprite(width / 2, height - (playerImage.height / 2), 0, 0); // Sets initial position of players pokemon
  player.addImage(playerImage); // sets where the player is to the chosen pokemon from the api
  enemy = createSprite(width / 2, 0, 0, 0); // creates an instance of an enemy at the top of screen falling downwards
  enemy.addImage(enemyImage); // sets where that enemy was instanced to a random pokemon
  enemy.rotationSpeed = 4.0; // speed at which the random pokemon is spinning
}

function draw() {
  if (isGameOver) {
    gameOver(); // runs gameover function
  } else {
    if (enemy.overlap(player)) { // detects if enemy and player collide, if true, you lose and the game ends
      isGameOver = true;
    }
    background(backgroundImage);
    if (keyDown(RIGHT_ARROW) && player.position.x < (width - (playerImage.width / 2))) {
      player.position.x += 2;
    }
    if (keyDown(LEFT_ARROW) && player.position.x > (playerImage.width / 2)) {
      player.position.x -= 2;
    }
    enemy.position.y = enemy.position.y + 8;
    if (enemy.position.y > height) {
      enemy.position.y = 0;
      enemy.position.x = random(5, width - 5);
    }
    drawSprites();
  }
}

// Game Over Function 
function gameOver() {
  background(0); // removes background of canvas
  textAlign(CENTER); // places gameover text in center of screen
  fill("white"); // text color of game over screen is white
  text("Game Over!", width / 2, height / 2); // displays game over in the center of the screen
  text("Click anywhere to try again", width / 2, 3 * height / 4); // Instructions of how to resume playing after losing
}

// Mouse clicked function 
function mouseClicked() {
  isGameOver = false;
  player.position.x = width / 2;
  player.position.y = height - (playerImage.height / 2);
  enemy.position.x = width / 2;
  enemy.position.y = 0;
}