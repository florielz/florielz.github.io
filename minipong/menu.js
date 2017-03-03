function Menu() {
	this.lP = createVector(100, 210);
	this.rP = createVector(500, 210);
	this.buttonSize = createVector(200, 150);

	this.update = function(game) {
		fill(51);
		noStroke();
		rect(0, 0, wdth, hght);
		stroke(0);
		fill(255);

		textSize(100);
		textFont("Times New Roman");
		text("Mini Pong", wdth/2 - 200, 120);
		textSize(20);

		var x = mouseX - (width/2 - wdth/2 - 10);
		var y = mouseY - (height/2 - hght/2 - 10);

		strokeWeight(4)

		if(
			x > this.lP.x &&
			x < this.lP.x + this.buttonSize.x &&
			y > this.lP.y &&
			y < this.lP.y + this.buttonSize.y
		){
			fill(0,66,220);
		}
		else{
			fill(255);
		}
		rect(this.lP.x, this.lP.y, this.buttonSize.x, this.buttonSize.y, 100);

		if(
			x > this.rP.x &&
			x < this.rP.x + this.buttonSize.x &&
			y > this.rP.y &&
			y < this.rP.y + this.buttonSize.y
		){
			fill(0,66,220);
		}
		else{
			fill(255);
		}
		rect(this.rP.x, this.rP.y, this.buttonSize.x, this.buttonSize.y, 100);

		strokeWeight(1);
		fill(0);
		text("Player vs Computer", this.lP.x + 20, this.lP.y + 80);
		text("Player vs Player", this.rP.x + 34, this.rP.y + 80);

		fill(255);
		textSize(30);
		text("Controls", wdth/2 - 50, 400);
		textSize(23);
		text("Left Player", wdth/2 - 215, 500);
		text("Right Player", wdth/2 + 110, 500);
		textSize(20);

		text("z", wdth/2 - 59, 470);
		text("s", wdth/2 - 59, 530);

		rect(wdth/2 + 53, 455, 3, 20);
		triangle(wdth/2 + 48, 462, wdth/2 + 62, 462, wdth/2 + 55, 455);

		rect(wdth/2 + 53, 515, 3, 20);
		triangle(wdth/2 + 48, 528, wdth/2 + 62, 528, wdth/2 + 55, 535);

		var touchSize = 50;
		noFill();
		rect(wdth/2 - 30 - touchSize, 440, touchSize, touchSize, 10);
		rect(wdth/2 - 30 - touchSize, 500, touchSize, touchSize, 10);

		rect(wdth/2 + 30, 440, touchSize, touchSize, 10);
		rect(wdth/2 + 30, 500, touchSize, touchSize, 10);
	}
}
