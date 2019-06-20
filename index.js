function setup() {
  noCanvas();
}

function draw() {
  background(220);
}

function mousePressed() {
  loadJSON("https://pokeapi.co/api/v2/pokemon/", gotEmAll);
}

function gotEmAll(data) {
  let randPokemon = random(data.results);
  loadJSON(randPokemon.url, gotOne);
}

function gotOne(data) {
  let img = createImg(data.sprites.front_default, data.name);
  img.style("height", (data.height * 10) + "px");
}