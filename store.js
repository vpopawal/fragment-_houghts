let words = [];
let arranged = [];
let timer;
let intrusiveSystem;

function startStoreLevel() {
  let sentence = levels[currentLevel].sentence.split(" ");

  words = shuffle([...sentence], true);
  arranged = [];

  timer = levels[currentLevel].timeLimit;

  intrusiveSystem = new IntrusiveSystem(levels[currentLevel].intrusiveRate);
}

function drawStore() {
  drawStoreBackground();
  // TIMER COUNTDOWN
  if (frameCount % 60 === 0 && timer > 0) {
    timer--;
  }

  if (timer <= 0) {
    gameState = "fail";
  }

  // CHECK WIN
  if (words.length === 0 && timer > 0) {
    gameState = "world";
    currentLevel++;

    if (currentLevel >= levels.length) {
      gameState = "success";
    }
  }

  drawCafeBackground();

  fill(0);
  textSize(16);
  text("Time: " + timer, 20, 20);

  for (let i = 0; i < words.length; i++) {
    fill("#d0f4ff");
    rect(50 + i * 90, 200, 80, 40, 5);
    fill(0);
    textAlign(CENTER, CENTER);
    text(words[i], 90 + i * 90, 220);
  }

  for (let i = 0; i < arranged.length; i++) {
    fill("#baffc9");
    rect(50 + i * 90, 300, 80, 40, 5);
    fill(0);
    text(arranged[i], 90 + i * 90, 320);
  }

  intrusiveSystem.update();
  intrusiveSystem.display();
}

function drawCafeBackground() {
  // Wall
  background("#ffe8d6");

  // Floor
  fill("#e0c097");
  rect(0, height - 150, width, 150);

  // Counter
  fill("#8d6e63");
  rect(0, height - 220, width, 70);

  // Menu Board
  fill("#3e2723");
  rect(width / 2 - 150, 40, 300, 120);

  fill("#ffffff");
  textAlign(CENTER);
  textSize(14);
  text("MENU", width / 2, 70);
  text("Latte", width / 2, 95);
  text("Cappuccino", width / 2, 115);
  text("Tea", width / 2, 135);

  // Coffee Cup on Counter
  drawCoffeeCup(width / 2, height - 250);

  // Ceiling Lights
  drawLights();
}

function drawCoffeeCup(x, y) {
  push();
  translate(x, y);

  // Cup body
  fill("#ffffff");
  rect(-15, -20, 30, 30, 5);

  // Handle
  noFill();
  stroke("#ffffff");
  strokeWeight(4);
  arc(18, -5, 20, 20, -PI / 2, PI / 2);

  // Coffee
  noStroke();
  fill("#6f4e37");
  rect(-12, -18, 24, 8);

  pop();
}

function drawLights() {
  for (let i = 100; i < width; i += 200) {
    fill("#fff8dc");
    ellipse(i, 20, 30, 30);

    // light glow
    fill(255, 255, 200, 100);
    ellipse(i, 20, 60, 60);
  }
}

function mousePressed() {
  if (gameState === "store") {
    for (let i = 0; i < words.length; i++) {
      if (
        mouseX > 50 + i * 90 &&
        mouseX < 130 + i * 90 &&
        mouseY > 200 &&
        mouseY < 240
      ) {
        arranged.push(words[i]);
        words.splice(i, 1);
        break;
      }
    }

    intrusiveSystem.handleClick(mouseX, mouseY);
  }
}

ui.js;
function drawStartScreen() {
  background("#fff3e6"); // warm creamy tone

  textAlign(CENTER);

  // shadow
  fill(0, 40);
  textSize(60);
  text("Pixel Land Explorer", width / 2 + 3, 203);

  // main title
  fill("#5a3e2b");
  textSize(60);
  text("Pixel Land Explorer", width / 2, 200);

  // subtitle
  fill("#7a5c4b");
  textSize(24);
  text("Press SPACE to Start", width / 2, 320);
}

function drawCharacterSelect() {
  background("#e6f7ff");

  textAlign(CENTER);
  textSize(32);
  fill(0);
  text("Choose Your Character", width / 2, 100);

  textSize(16);
  text("Press 1, 2, or 3", width / 2, 140);

  // Draw character options
  drawCharacterOption(width / 4 - 20, 250, "boy", "1");
  drawCharacterOption(width / 2 - 20, 250, "girl", "2");
  drawCharacterOption((3 * width) / 4 - 20, 250, "unisex", "3");
}

function drawCharacterOption(x, y, type, keyLabel) {
  push();
  translate(x, y);
  scale(2);
  noStroke();

  // Highlight if selected
  if (selectedCharacter === type) {
    fill("#fff3b0");
    rect(-10, -10, 60, 70, 10);
  }

  // HEAD
  fill("#ffd8b1");
  rect(8, 0, 16, 14);

  // HAIR
  if (type === "boy") fill("#4a90e2");
  if (type === "girl") fill("#ff77b4");
  if (type === "unisex") fill("#a066ff");

  rect(6, -2, 20, 8);
  rect(4, 4, 6, 6);
  rect(22, 4, 6, 6);

  // EYES
  fill(0);
  rect(12, 6, 2, 2);
  rect(18, 6, 2, 2);

  // BODY
  if (type === "boy") fill("#7ec8e3");
  if (type === "girl") fill("#ffb6d9");
  if (type === "unisex") fill("#cdb4db");

  rect(6, 14, 20, 14);

  // Label
  fill(0);
  textSize(10);
  textAlign(CENTER);
  text(keyLabel, 16, 45);

  pop();
}

function drawFailScreen() {
  background("#ffd6d6");
  textAlign(CENTER);
  textSize(32);
  fill(0);
  text("Time's Up!", width / 2, height / 2 - 20);
  textSize(18);
  text("Press SPACE to Try Again", width / 2, height / 2 + 20);
}

function drawSuccessScreen() {
  background("#d6ffd9");
  textAlign(CENTER);
  textSize(32);
  fill(0);
  text("All Stores Completed!", width / 2, height / 2 - 20);
  textSize(18);
  text("Press SPACE to Return", width / 2, height / 2 + 20);
}
