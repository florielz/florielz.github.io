function Bar(x, y) {
	this.left = (x < wdth/2);
	this.pos = createVector(x, y);
	this.length = 80;
	this.width = 20;
	this.velocity = 10;
	this.reactTime = 2;//floor(random(3,8));

	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.setVelocity = function(ySpeed) {
		this.velocity = ySpeed;
	}

	this.down = function(){
		if(this.pos.y < hght - this.length - this.velocity){
			this.pos.y += this.velocity;
		}
		else{
			this.pos.y = hght - this.length - 1;
		}
	}

	this.up = function(){
		if(this.pos.y > 0 + this.velocity){
			this.pos.y -= this.velocity;
		}
		else{
			this.pos.y = 1;
		}
	}

	this.setReactTime = function(){
		this.reactTime = 2;//floor(random(3,12));
	}

	this.move = function(ball){
		if(ball.pos.x > wdth - wdth/this.reactTime && ball.vel.x > 0){
			if(ball.pos.y > this.pos.y + this.length/4){
				this.down();
			}
			else if(ball.pos.y < this.pos.y + this.length/4){
				this.up();
			}
		}
	}

	this.collision = function(ball){
		if(this.left){
			if(ball.pos.x - ball.width/2 <= this.pos.x + this.width){
				if(ball.pos.y >= this.pos.y && ball.pos.y <= this.pos.y + this.length){
					var angle =  ((ball.pos.y - this.pos.y)/this.length) * PI - PI/2;
					if(angle == PI/2){
						angle = 3*PI/4;
					}
					else if(angle == -PI/2){
						angle = -3*PI/4;
					}
					else if(angle > PI/4){
						angle = PI/4;
					}
					else if(angle < -PI/4){
						angle = -PI/4;
					}
					ball.vel.x = cos(angle) * ball.velocity;
					ball.vel.y = sin(angle) * ball.velocity;
					ball.pos.x = this.pos.x + this.width + ball.width/2 + 1;
					ball.cpt++;
					ball.changePower();
				}
			}
		}
		else{
			if(ball.pos.x + ball.width/2 >= this.pos.x){
				if(ball.pos.y >= this.pos.y && ball.pos.y <= this.pos.y + this.length){
					var angle =  ((ball.pos.y - this.pos.y)/this.length) * PI - PI/2;
					if(angle == PI/2){
						angle = PI/4;
					}
					else if(angle == -PI/2){
						angle = -PI/4;
					}
					else if(angle > PI/4){
						angle = 3*PI/4;
					}
					else if(angle < -PI/4){
						angle = -3*PI/4;
					}
					else{
						angle = random(3*PI/4, 5*PI/4);
					}
					ball.vel.x = cos(angle) * ball.velocity;
					ball.vel.y = sin(angle) * ball.velocity;
					ball.pos.x = this.pos.x - ball.width/2 - 1;
					this.setReactTime();
					ball.cpt++;
					ball.changePower();
				}
			}
		}
	}

	this.update = function() {

	}

	this.show = function() {
		rect(this.pos.x, this.pos.y, this.width, this.length, 100);
	}
}
