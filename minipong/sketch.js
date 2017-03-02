var game;
var scoreP1 = 0;
var scoreP2 = 0;
var pause = false;
var menu;

var wdth = 800;
var hght = 600;

function setup() {
	createCanvas(windowWidth - 20, windowHeight - 20);
	menu = new Menu();
	//game = new Game(false);
	noFill();
	strokeWeight(10);
	rect(
		windowWidth/2 - wdth/2 - 10,
		windowHeight/2 - hght/2 - 10,
		wdth,
		hght
	);
	strokeWeight(1);
}

function draw() {
	translate(windowWidth/2 - wdth/2 - 10, windowHeight/2 - hght/2 - 10);
	if(menu){
		menu.update();
	}
	else{
		game.update();
	}
}

function keyPressed() {
	if (keyCode === 32) { //SPACE
		if(!menu){
			if(game.launch){
				game.launch = false;
			}
			else{
				if (pause) {
					loop();
					pause = false;
				} else {
					noLoop();
					pause = true;
				}
			}
		}
  }
}

function mousePressed() {
	if(menu){
		var x = mouseX - (width/2 - wdth/2 - 10);
		var y = mouseY - (height/2 - hght/2 - 10);

		if(
			x > menu.lP.x &&
			x < menu.lP.x + menu.buttonSize.x &&
			y > menu.lP.y &&
			y < menu.lP.y + menu.buttonSize.y
		){
			game = new Game(true);
			menu = undefined;
		}
		else if(
			x > menu.rP.x &&
			x < menu.rP.x + menu.buttonSize.x &&
			y > menu.rP.y &&
			y < menu.rP.y + menu.buttonSize.y
		){
			game = new Game(false);
			menu = undefined;
		}
	}
}
