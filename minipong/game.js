function Game(computer){
	this.ball;
	this.bar1;
	this.bar2;
	this.launch = true;
	this.computer = computer;

	this.ball = new Ball(wdth / 2, hght / 2);

	this.bar1 = new Bar(5, hght/2 - 40);
	this.bar2 = new Bar(wdth - 5 - 20, hght/2 - 40);
	textSize(20);

	textFont("Arial");

	this.update = function() {
		fill(51);
		noStroke();
		rect(0, 0, wdth, hght);
		stroke(255);
		line(wdth/2, 0, wdth/2, hght-1);
		noFill();
		ellipse(wdth/2, hght/2, 100, 100);
		stroke(0);
		fill(255);

		if(this.computer){
			this.bar2.move(this.ball);
		}
		else{
			if(keyIsDown(UP_ARROW)){
				this.bar2.up();
			}
			else if(keyIsDown(DOWN_ARROW)){
				this.bar2.down();
			}
		}

		if(keyIsDown(90)){
			this.bar1.up();
		}
		else if(keyIsDown(83)){
			this.bar1.down();
		}

		this.bar1.update();
		this.bar1.show();
		this.bar2.update();
		this.bar2.show();

		if(!this.launch){
			this.ball.update(this);
			this.bar1.collision(this.ball);
			this.bar2.collision(this.ball);
		}
		else{
			textSize(15);
			text("Press SPACE to launch the ball", wdth/2 - 111, hght/2 + 70);
			textSize(20);
		}

		this.ball.show();
		if(scoreP1 > 9){
			text(scoreP1, wdth/2 - 35, 21);
		}
		else{
			text(scoreP1, wdth/2 - 27, 21);
		}
		text(scoreP2, wdth/2 + 13, 21);
	}
}
