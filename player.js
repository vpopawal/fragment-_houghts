class Player {
  constructor() {
    this.x = 100;
    this.y = 300;
    this.size = 32;
    this.speed = 3;
    this.type = "boy";

    this.nearBuilding = null; // ✅ ADD THIS
  }

  setCharacter(type) {
    this.type = type;
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) this.x -= this.speed;
    if (keyIsDown(RIGHT_ARROW)) this.x += this.speed;
    if (keyIsDown(UP_ARROW)) this.y -= this.speed;
    if (keyIsDown(DOWN_ARROW)) this.y += this.speed;

    this.x = constrain(this.x, 0, width - this.size);
    this.y = constrain(this.y, 0, height - this.size);
  }

  display() {
    push();
    translate(this.x, this.y);
    noStroke();

    fill("#ffd8b1");
    rect(8, 0, 16, 14);

    if (this.type === "boy") fill("#4a90e2");
    if (this.type === "girl") fill("#ff77b4");
    if (this.type === "unisex") fill("#a066ff");
    rect(6, -2, 20, 8);
    rect(4, 4, 6, 6);
    rect(22, 4, 6, 6);

    fill(0);
    rect(12, 6, 2, 2);
    rect(18, 6, 2, 2);

    if (this.type === "boy") fill("#7ec8e3");
    if (this.type === "girl") fill("#ffb6d9");
    if (this.type === "unisex") fill("#cdb4db");
    rect(6, 14, 20, 14);

    fill("#444");
    rect(8, 28, 6, 6);
    rect(18, 28, 6, 6);

    pop();
  }
}
