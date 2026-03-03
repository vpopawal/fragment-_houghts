let buildings = [
  { name: "Pixel Thread", x: 100, y: 80, w: 160, h: 120, color: "#f7c6c7" },
  { name: "Pixel Pages", x: 500, y: 80, w: 180, h: 120, color: "#c6d8ff" },
  { name: "Bloom & Pixel", x: 120, y: 380, w: 180, h: 120, color: "#c6f7d0" },
  { name: "Pixel Coffee", x: 520, y: 380, w: 160, h: 120, color: "#fbe7c6" },
];

function drawWorld() {
  drawGrass();
  drawPaths();

  for (let b of buildings) {
    drawBuilding(b);
  }
}

function drawGrass() {
  background("#b9fbc0");
  for (let x = 0; x < width; x += 20) {
    for (let y = 0; y < height; y += 20) {
      fill(random(["#b9fbc0", "#a3f7b5", "#caffbf"]));
      rect(x, y, 20, 20);
    }
  }
}

function drawPaths() {
  fill("#e0c097");
  rect(0, 280, width, 40);
  rect(width / 2 - 20, 0, 40, height);
}

function drawBuilding(b) {
  push();

  // Building base
  fill(b.color);
  rect(b.x, b.y, b.w, b.h);

  // Roof
  fill(darkenColor(b.color, 40));
  triangle(b.x - 10, b.y, b.x + b.w + 10, b.y, b.x + b.w / 2, b.y - 40);

  // Door
  fill("#6b4f4f");
  rect(b.x + b.w / 2 - 15, b.y + b.h - 40, 30, 40);

  // Windows
  fill("#ffffffaa");
  rect(b.x + 20, b.y + 30, 30, 30);
  rect(b.x + b.w - 50, b.y + 30, 30, 30);

  // Sign
  fill("#fff");
  rect(b.x + b.w / 2 - 50, b.y - 20, 100, 20);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(12);
  text(b.name, b.x + b.w / 2, b.y - 10);

  pop();
}

function darkenColor(col, amt) {
  let c = color(col);
  return color(red(c) - amt, green(c) - amt, blue(c) - amt);
}

function checkBuildingEntry(player) {
  for (let i = 0; i < buildings.length; i++) {
    let b = buildings[i];

    let doorX = b.x + b.w / 2 - 15;
    let doorY = b.y + b.h - 40;

    if (
      player.x + player.size > doorX &&
      player.x < doorX + 30 &&
      player.y + player.size > doorY &&
      player.y < doorY + 40
    ) {
      fill(0);
      textAlign(CENTER);
      text("Press ENTER", width / 2, height - 20);

      if (keyIsDown(ENTER)) {
        currentLevel = i;
        startStoreLevel();
        gameState = "store";
      }
    }
  }
}
function drawSpeechBubble(x, y, message) {
  push();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(14);

  // Bubble shape
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(x, y - 20, textWidth(message) + 20, 40, 10);

  // Triangle pointer
  triangle(x - 10, y, x + 10, y, x, y + 10);

  // Bubble text
  noStroke();
  fill(0);
  text(message, x, y - 20);
  pop();
}
