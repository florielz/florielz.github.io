var grid = [];
var sz = 30;
var cols;
var raws;
var current;
var last;
var stack = [];
var generated = false;
var wdth = 600;
var hght = 600;

function setup() {
	/*createCanvas(600, 600);*/
	createCanvas(windowWidth - 20, windowHeight - 20);

	cols = wdth / sz - 7;
	raws = hght / sz * 2 - 7;
	for (var j = 0; j < raws; j++) {
		for (var i = 0; i < cols; i++) {
			grid.push(new Cell(i, j));
		}
	}
	current = grid[0];
	last = current;
	current.visited = true;
	current.seen = true;
	translate(width/2 - wdth/2 , height/2 - hght/2);
	for (var i = 0; i < grid.length; i++) {
		grid[i].show();
	}
}

function draw() {
	translate(width/2 - wdth/2 , height/2 - hght/2);

	last.show();
	current.show();
	if (!generated) {
		var next = current.checkNeighbors();
		last = current;
		if (next) {
			stack.push(current);
			next.visited = true;
			current.active = false;
			next.active = true;
			current = next;
		} else {
			var prev = stack.pop();
			if (prev) {
				current.active = false;
				current = prev;
				current.active = true;
				current.visited = true;
			} else {
				generated = true;
			}
		}
	} else {
		last = current;
		noStroke();
		if (current.i != 0 || current.j != 0) {
			fill(255, 0, 0);
			rect(0 + sz / 3, 0 + sz / 3, sz - sz / 1.5 + 1, sz - sz / 1.5 + 1);
		}
		if (current.i != cols - 1 || current.j != raws - 1) {
			fill(0, 255, 0);
			var x = (cols - 1) * (sz + sz / 2);
			var y = (raws - 1) * sz / 2
			rect(x + sz / 3, y + sz / 3, sz - sz / 1.5 + 1, sz - sz / 1.5 + 1);
		}
	}
}

function index(i, j) {
	if (i < 0 || i > cols - 1 || j < 0 || j > raws - 1) {
		return -1;
	} else {
		return i + j * cols;
	}
}

function Cell(i, j) {
	this.i = i;
	this.j = j;
	this.walls = [true, true, true, true, true, true];
	this.visited = false;
	this.seen = false;

	this.getTopLeft = function() {
		if (j % 2 == 0)
			return grid[index(i - 1, j - 1)];
		else
			return grid[index(i, j - 1)];
	}
	this.getTop = function() {
		if (j % 2 == 0)
			return grid[index(i, j - 2)];
		else
			return grid[index(i, j - 2)];
	}
	this.getTopRight = function() {
		if (j % 2 == 0)
			return grid[index(i, j - 1)];
		else
			return grid[index(i + 1, j - 1)];
	}
	this.getBotRight = function() {
		if (j % 2 == 0)
			return grid[index(i, j + 1)];
		else
			return grid[index(i + 1, j + 1)];
	}
	this.getBot = function() {
		if (j % 2 == 0)
			return grid[index(i, j + 2)];
		else
			return grid[index(i, j + 2)];
	}
	this.getBotLeft = function() {
		if (j % 2 == 0)
			return grid[index(i - 1, j + 1)];
		else
			return grid[index(i, j + 1)];
	}

	this.checkNeighbors = function() {
		var neighbors = [];
		var topLeft = this.getTopLeft();
		var top = this.getTop();
		var topRight = this.getTopRight();
		var botRight = this.getBotRight();
		var bot = this.getBot();
		var botLeft = this.getBotLeft();

		if (topLeft && !topLeft.visited) {
			neighbors.push(topLeft);
		}
		if (top && !top.visited) {
			neighbors.push(top);
		}
		if (topRight && !topRight.visited) {
			neighbors.push(topRight);
		}
		if (botRight && !botRight.visited) {
			neighbors.push(botRight);
		}
		if (bot && !bot.visited) {
			neighbors.push(bot);
		}
		if (botLeft && !botLeft.visited) {
			neighbors.push(botLeft);
		}
		var n = neighbors[floor(random(neighbors.length))];
		if (n) {
			if (n === topLeft) {
				this.walls[0] = false;
				n.walls[3] = false;
			} else if (n === top) {
				this.walls[1] = false;
				n.walls[4] = false;
			} else if (n === topRight) {
				this.walls[2] = false;
				n.walls[5] = false;
			} else if (n === botRight) {
				this.walls[3] = false;
				n.walls[0] = false;
			} else if (n === bot) {
				this.walls[4] = false;
				n.walls[1] = false;
			} else if (n === botLeft) {
				this.walls[5] = false;
				n.walls[2] = false;
			}
			return n;
		} else {
			return undefined;
		}
	}

	this.show = function() {
		var x;
		var y;
		if (j % 2 == 0) {
			x = this.i * (sz + sz / 2);
			y = this.j * sz / 2
		} else {
			x = this.i * (sz + sz / 2) + 3 * sz / 4;
			y = this.j * sz / 2;
		}

		noStroke();
		noFill();
		if (this.visited) {
			fill(0, 90, 142);
		}
		if (generated && this.seen) {
			fill(0, 120, 189);
		}
		// triangle(x + sz / 2, y + sz / 2, x + sz / 4, y, x, y + sz / 2); // top left
		// triangle(x + sz / 2, y + sz / 2, x + 3 * sz / 4, y, x + sz / 4, y); // top
		// triangle(x + sz / 2, y + sz / 2, x + sz, y + sz / 2, x + 3 * sz / 4, y); // top right
		// triangle(x + sz / 2, y + sz / 2, x + 3 * sz / 4, y + sz, x + sz, y + sz / 2); // bot right
		// triangle(x + sz / 2, y + sz / 2, x + sz / 4, y + sz, x + 3 * sz / 4, y + sz); // bot
		// triangle(x + sz / 2, y + sz / 2, x, y + sz / 2, x + sz / 4, y + sz); // bot left

		beginShape();
		vertex(x + sz / 4, y);
		vertex(x + 3 * sz / 4, y);
		vertex(x + sz, y + sz / 2);
		vertex(x + 3 * sz / 4, y + sz);
		vertex(x + sz / 4, y + sz);
		vertex(x, y + sz / 2);
		endShape(CLOSE);

		if (this.active) {
			stroke(255);
			fill(0, 255, 255);
			rect(x + sz / 3, y + sz / 3, sz - sz / 1.5, sz - sz / 1.5);
		}

		stroke(255);
		strokeWeight(2);
		if (this.walls[0]) {
			line(x + sz / 4, y, x, y + sz / 2); // top left
		}
		if (this.walls[1]) {
			line(x + sz / 4, y, x + 3 * sz / 4, y); // top
		}
		if (this.walls[2]) {
			line(x + 3 * sz / 4, y, x + sz, y + sz / 2); // top right
		}
		if (this.walls[3]) {
			line(x + 3 * sz / 4, y + sz, x + sz, y + sz / 2); // bot right
		}
		if (this.walls[4]) {
			line(x + sz / 4, y + sz, x + 3 * sz / 4, y + sz); // bot
		}
		if (this.walls[5]) {
			line(x, y + sz / 2, x + sz / 4, y + sz); // bot left
		}
		strokeWeight(1);
	}
}

function keyPressed() {
	if (generated) {
		if (keyCode === 103) {
			if (!current.walls[0]) {
				current.active = false;
				current = current.getTopLeft();
				current.active = true;
				current.seen = true;
			}
		} else if (keyCode === 104) {
			if (!current.walls[1]) {
				current.active = false;
				current = current.getTop();
				current.active = true;
				current.seen = true;
			}
		} else if (keyCode === 105) {
			if (!current.walls[2]) {
				current.active = false;
				current = current.getTopRight();
				current.active = true;
				current.seen = true;
			}
		} else if (keyCode === 102) {
			if (!current.walls[3]) {
				current.active = false;
				current = current.getBotRight();
				current.active = true;
				current.seen = true;
			}
		} else if (keyCode === 101) {
			if (!current.walls[4]) {
				current.active = false;
				current = current.getBot();
				current.active = true;
				current.seen = true;
			}
		} else if (keyCode === 100) {
			if (!current.walls[5]) {
				current.active = false;
				current = current.getBotLeft();
				current.active = true;
				current.seen = true;
			}
		}
	}
}
