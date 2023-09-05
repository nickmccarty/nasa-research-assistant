let stars = [];

function setup() {
  let canvas = createCanvas(windowWidth, 60);
  canvas.position(-6, document.querySelector('.navbar').offsetTop);
  frameRate(30);

  for (let i = 0; i < 1; i++) {
    stars.push(createStar());
  }
}

function draw() {
  clear();

  for (let star of stars) {
    star.update();
    star.display();
  }
}

function createStar() {
  let x = random(width);
  let y = random(height);
  let size = random(1, 3);
  let speedX = random(-3, -1);
  let speedY = random(0.2, 0.5);
  return new Star(x, y, size, speedX, speedY);
}

class Star {
  constructor(x, y, size, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.y > height) {
      this.reset();
    }
  }

  reset() {
    this.x = width;
    this.y = random(height);
    this.speedX = random(-3, -1);
    this.speedY = random(0.2, 0.5);
  }

  display() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
}
