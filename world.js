let buildings = [
  { name: "Threads", doorX: 193, doorY: 148 },
  { name: "Pages", doorX: 622, doorY: 171 },
  { name: "Flower", doorX: 235, doorY: 508 },
  { name: "Cafe", doorX: 628, doorY: 519 },
];

// Draw the world background
function drawWorld() {
  image(worldimg, 0, 0, width, height);
}

// Check if player is at a building door
function checkBuildingEntry(player) {
  player.nearBuilding = null;
  const doorWidth = 60;
  const doorHeight = 80;

  for (let b of buildings) {
    if (
      player.x + player.size > b.doorX - 15 &&
      player.x < b.doorX - 15 + doorWidth &&
      player.y + player.size > b.doorY - 20 &&
      player.y < b.doorY - 20 + doorHeight
    ) {
      player.nearBuilding = b;
      break; // only nearest building
    }
  }
}
// Check if player is at a building door
function checkBuildingEntry(player) {
  player.nearBuilding = null;
  const doorWidth = 60;
  const doorHeight = 80;

  for (let b of buildings) {
    let doorX = b.doorX;
    let doorY = b.doorY;

    if (
      player.x + player.size > doorX - 15 &&
      player.x < doorX - 15 + doorWidth &&
      player.y + player.size > doorY - 20 &&
      player.y < doorY - 20 + doorHeight
    ) {
      player.nearBuilding = b;
      break;
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
