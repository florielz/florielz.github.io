function Ball(x, y) {
	this.pos = createVector(x, y);
	this.velocity = 10;
	this.vel = createVector(this.velocity * pow(-1,floor(random(2))), 0);
	this.acc = createVector(0, 0);
	this.width = 20;
	this.length = 20;
	this.speed;
	this.cpt = 0;

	this.power = 0;
	this.nbPowers = 2 * 10;

	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.setVelocity = function(xSpeed, ySpeed) {
		this.vel.x = xSpeed;
		this.vel.y = ySpeed;
	}

	this.changePower = function(){
		this.speed = 0;
		if(this.cpt > 14){
			this.power = 2;
		}
		else{
			var tirage = floor(random(0, this.nbPowers + 1));
			if(tirage < 10){
				this.power = 0;
			}
			else if(tirage < 17){
				this.power = 2;
			}
			else{
				this.power = 1;
			}
		}
	}

	this.update = function(game) {
		this.vel.add(this.acc);
		if(this.power == 2){
			if(this.vel.x < 0){
				this.pos.x = this.pos.x - this.speed;
			}
			else{
				this.pos.x = this.pos.x + this.speed;
			}
			if(this.vel.y < 0){
				this.pos.y = this.pos.y - this.speed;
			}
			else{
				this.pos.y = this.pos.y + this.speed;
			}
			this.speed += 0.075;
		}
		this.pos.add(this.vel);
		this.acc.mult(0);
		if (this.pos.x  + this.width/2 > wdth){
			this.pos = createVector(wdth/2, hght/2);
			this.vel = createVector(this.velocity, 0);
			scoreP1++;
			this.cpt = 0;
			this.power = 0;
			game.launch = true;
		}
		else if(this.pos.x - this.width/2 < 0) {
			this.pos = createVector(wdth/2, hght/2);
			this.vel = createVector(-this.velocity, 0);
			scoreP2++;
			this.cpt = 0;
			this.power = 0;
			game.launch = true;
		}
		else if (this.pos.y + this.length/2 > hght || this.pos.y - this.length/2 < 0) {
			this.pos.sub(this.vel);
			if (this.power == 1) {
				this.vel.y = 0;
			} else {
				this.vel.y = -this.vel.y;
			}
			this.pos.add(this.vel);
		}
	}

	this.show = function() {
		switch(this.power){
			case 1: fill(2, 149, 7); break;
			case 2: fill(149, 7, 2); break;
			case 3: fill(7, 2, 149); break;
			default: fill(255);
		}
		ellipse(this.pos.x, this.pos.y, this.width, this.length);
		fill(255);
	}
}
