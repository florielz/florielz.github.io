var s;
var scl = 20;
var fr = 15;
var bestSc = 0;
var beMessage = "Best score";
var lastSc = 0;
var laMessage = "Last score";
var currentSc = 0;
var cuMessage = "Current score";
var gameWidth = 500;
var wdth = gameWidth + 200;
var hght = gameWidth;
var pause = false;

var food;

function setup() {
  /*createCanvas(gameWidth + 200, gameWidth);*/
  createCanvas(windowWidth - 20, windowHeight - 20);
  s = new Snake();
  pickLocation();
}

function pickLocation() {
  var cols = floor(gameWidth / scl);
  var rows = floor(hght / scl);
  var col = floor(random(cols));
  var row = floor(random(rows));
  var retry;
  // If the food spawn on the snake
  do {
    retry = false;
    if (col === s.x / scl && row === s.y / scl) {
      retry = true;
      col = floor(random(cols));
      row = floor(random(rows));
    } else {
      for (var i = 0; i < s.tail.length; i++) {
        if (col === s.tail[i].x / scl && row === s.tail[i].y / scl) {
          retry = true;
          col = floor(random(cols));
          row = floor(random(rows));
          break;
        }
      }
    }
  } while (retry)

  food = createVector(col, row);
  food.mult(scl);
  food.gold = (floor(random(5)) == 0);
}

function draw() {
  background(255);
  translate(width / 2 - wdth / 2, 3 * height / 7 - hght / 2);
  fill(51);
  rect(0, 0, wdth + 1, hght + 1);
  stroke(255);
  for (var i = 0; i < 5; i++) {
    line(gameWidth + 1 + i, 0, gameWidth + 1 + i, hght);
  }
  stroke(0);

  frameRate(fr);

  if (s.eat(food)) {
    pickLocation();
  }
  s.death();
  if (s.xspeed != 0 || s.yspeed != 0) {
    s.update();
  }

  if (food.gold) {
    fill(255, 200, 0);
  } else {
    fill(255, 0, 100);
  }
  rect(food.x, food.y, scl, scl);

  s.show();


  textSize(25);
  fill(255, 0, 100);
  text(beMessage, gameWidth + 35, 30);
  text(bestSc, gameWidth + 80, 60);
  text(laMessage, gameWidth + 35, 100);
  text(lastSc, gameWidth + 80, 130);
  text(cuMessage, gameWidth + 18, 170);
  text(currentSc, gameWidth + 80, 200);
  var cmdTitle = "Commands";
  text(cmdTitle, gameWidth + 34, 300);
  textSize(18);
  var cmdMessage = "MOVE  : ARROWS\nPAUSE : SPACE";
  text(cmdMessage, gameWidth + 22, 350);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    if (s.yspeed != 1)
      s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    if (s.yspeed != -1)
      s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    if (s.xspeed != -1)
      s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    if (s.xspeed != 1)
      s.dir(-1, 0);
  } else if (keyCode === 32) { //SPACE
    if (pause) {
      loop();
      pause = false;
    } else {
      noLoop();
      pause = true;
    }
  }
}