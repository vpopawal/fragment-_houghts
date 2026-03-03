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
  background("#fff3e6");
  fill("#ff4d4d");
  textAlign(CENTER, CENTER);
  textSize(40);
  text("Try Again!", width / 2, height / 2 - 20);

  textSize(20);
  text(
    "Press SPACE to retry\nyou can only move on until you get it right!",
    width / 2,
    height / 2 + 30,
  );
}
