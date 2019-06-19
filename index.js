var isGameOver;
var player;
var playerImage2;
var enemy;
var enemyImage;
var backgroundImage;
var poImage;


let pokemonSearchButton = document.getElementById("pokeForm");
pokemonSearchButton.addEventListener('submit', pokeSubmit);
let pokemonImage = document.getElementById("myPokemon");


function pokeSubmit(event) {
  event.preventDefault();
  document.getElementById("submitButton").className = "ui-btn";
  // API accepts lowercase only
  var param = document.getElementById("pokeInput").value.toLowerCase();
  var pokeURL = "http://pokeapi.co/api/v2/pokemon/" + param;

  $.ajax({
    type: "GET",
    crossDomain: true,
    url: pokeURL,
    dataType: "json"
  }).done(function (data) {
    console.log(data); // Able to pull pokemon json this line is important
    let poImage = data.sprites.front_default;
    console.log(poImage);
    let playerImage = poImage;
    document.getElementById("myPokemon").attribute('background-image', url(poImage));



    return playerImage;
  });

}
console.log(playerImage);


function preload() {
  let playerImage2 = loadImage(playerImage);
  let enemyImage = loadImage("blackferaligatr.png");
  let backgroundImage = loadImage("https://images.unsplash.com/photo-1526392587392-d1627b6c134a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60");

}

function setup() {
  isGameOver = false;
  createCanvas(600, 600); // creates canvas on screen
  player = createSprite(width / 2, height - (playerImage2.height / 2), 0, 0); // Sets initial position of players pokemon
  player.drawImage(playerImage2); // sets where the player is to the chosen pokemon from the api
  enemy = createSprite(width / 2, 0, 0, 0); // creates an instance of an enemy at the top of screen falling downwards
  enemy.addImage(enemyImage); // sets where that enemy was instanced to a random pokemon
  enemy.rotationSpeed = 4.0; // speed at which the random pokemon is spinning
}



// TODO: Set up function to pull the list of pokemon from the json
// TODO: Set up constant variable to be the list of all pokemon
// TODO: Set up two new variables to be equal to the selected pokemon, and the other to be a random pokemon every time it loops




function draw() {
  if (isGameOver) {
    gameOver(); // runs gameover function
  } else {
    if (enemy.overlap(player)) { // detects if enemy and player collide, if true, you lose and the game ends
      isGameOver = true;
    }
    background(backgroundImage);
    if (keyDown(RIGHT_ARROW) && player.position.x < (width - (playerImage2.width / 2))) {
      player.position.x += 4;
    }
    if (keyDown(LEFT_ARROW) && player.position.x > (playerImage2.width / 2)) {
      player.position.x -= 4;
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




