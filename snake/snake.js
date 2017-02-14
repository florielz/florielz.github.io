function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      if (fr < 30)
        fr = fr + 0.5;
      if (pos.gold) {
        this.total++;
        currentSc += 25;
      } else {
        currentSc += 10;
      }
      return true;
    } else {
      return false;
    }
  }

  this.dir = function(x, y) {
      this.xspeed = x;
      this.yspeed = y;
  }

  this.death = function() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.total = 0;
        this.tail = [];
        fr = 15;
        lastSc = currentSc;
        if (lastSc > bestSc) {
          bestSc = lastSc;
        }
        currentSc = 0;
      }
    }
  }

  this.update = function() {
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    if (this.total > this.tail.length+1) {
      this.tail[this.total - 2] = createVector(this.x, this.y);
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    if (this.x >= gameWidth) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = gameWidth;
    } else if (this.y >= hght) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = hght;
    }

    this.x = constrain(this.x, 0, gameWidth - scl);
    this.y = constrain(this.y, 0, hght - scl);
  }

  this.show = function() {
    fill(22,184,78);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    this.drawHead();
  }

  this.drawHead = function(){
    if(this.yspeed > 0){ // vers le bas
      beginShape();
      vertex(this.x          , this.y        );
      vertex(this.x + scl    , this.y        );
      vertex(this.x + scl    , this.y + scl/2);
      vertex(this.x + scl*3/4, this.y + scl  );
      vertex(this.x + scl/4  , this.y + scl  );
      vertex(this.x          , this.y + scl/2);
      endShape(CLOSE);
      line(this.x+scl/4 + 2, this.y+scl/2 - 2, this.x+scl/4 + 2, this.y+scl/2 + 2);
      line(this.x+scl*3/4 - 2, this.y+scl/2 - 2, this.x+scl*3/4 - 2, this.y+scl/2 + 2);
    }
    else if(this.yspeed < 0){ // vers le haut
      beginShape();
      vertex(this.x + scl/4  , this.y        );
      vertex(this.x + scl*3/4, this.y        );
      vertex(this.x + scl    , this.y + scl/2);
      vertex(this.x + scl    , this.y + scl  );
      vertex(this.x          , this.y + scl  );
      vertex(this.x          , this.y + scl/2);
      endShape(CLOSE);
      line(this.x+scl/4 + 2, this.y+scl/2 - 2, this.x+scl/4 + 2, this.y+scl/2 + 2);
      line(this.x+scl*3/4 - 2, this.y+scl/2 - 2, this.x+scl*3/4 - 2, this.y+scl/2 + 2);
    }
    else if(this.xspeed > 0){ // vers la droite
      beginShape();
      vertex(this.x          , this.y          );
      vertex(this.x + scl/2  , this.y          );
      vertex(this.x + scl    , this.y + scl/4  );
      vertex(this.x + scl    , this.y + scl*3/4);
      vertex(this.x + scl/2  , this.y + scl    );
      vertex(this.x          , this.y + scl    );
      endShape(CLOSE);
      line(this.x+scl/2 - 2, this.y+scl/4 + 2, this.x+scl/2 + 2, this.y+scl/4 + 2);
      line(this.x+scl/2 - 2, this.y+scl*3/4 - 2, this.x+scl/2 + 2, this.y+scl*3/4 - 2);
    }
    else if(this.xspeed < 0){ // vers la gauche
      beginShape();
      vertex(this.x          , this.y + scl/4  );
      vertex(this.x + scl/2  , this.y          );
      vertex(this.x + scl    , this.y          );
      vertex(this.x + scl    , this.y + scl    );
      vertex(this.x + scl/2  , this.y + scl    );
      vertex(this.x          , this.y + scl*3/4);
      endShape(CLOSE);
      line(this.x+scl/2 - 2, this.y+scl/4 + 2, this.x+scl/2 + 2, this.y+scl/4 + 2);
      line(this.x+scl/2 - 2, this.y+scl*3/4 - 2, this.x+scl/2 + 2, this.y+scl*3/4 - 2);
    }
    else{
      rect(this.x, this.y, scl, scl);
    }
  }
}