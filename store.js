let words = [];
let arranged = [];
let timer = 20;
let intrusiveSystem;

let sublevelRects = [
  { x1: 130, x2: 280, y1: 230, y2: 400 },
  { x1: 325, x2: 475, y1: 230, y2: 400 },
  { x1: 520, x2: 670, y1: 230, y2: 400 },
];

// ------------------
// START LEVEL
// ------------------
function startStoreLevel() {
  let levelData = levels[currentLevel].subLevels[currentSubLevel];

  let correctSentence = levelData.sentence.split(" ");

  let distractorPool = [
    "maybe",
    "oops",
    "forgot",
    "quickly",
    "sorry",
    "uh",
    "actually",
    "wait",
    "hmm",
    "like",
    "what",
    "okay",
  ];

  let distractors = shuffle(distractorPool).slice(0, levelData.distractors);

  let mixed = shuffle(correctSentence.concat(distractors));

  words = [];
  for (let w of mixed) {
    words.push({
      text: w,
      x: random(100, width - 100),
      y: random(150, height - 150),
      vx: random(-2, 2),
      vy: random(-2, 2),
    });
  }

  arranged = [];
  timer = levelData.timeLimit;

  intrusiveSystem = new IntrusiveSystem(levelData.intrusiveRate);
}

// ------------------
// DRAW STORE SCREEN
// ------------------
function drawStore() {
  if (!levels || !levels[currentLevel]) return;

  let levelData = levels[currentLevel].subLevels[currentSubLevel];

  // Background
  if (levelBackgrounds[currentLevel]) {
    image(levelBackgrounds[currentLevel], 0, 0, width, height);
  } else {
    background("#fff3e6");
  }
  if (arranged.length === levelData.sentence.split(" ").length) {
    if (arranged.join(" ") === levelData.sentence) {
      if (buildingProgress[currentLevel] < 3) {
        buildingProgress[currentLevel]++;
      }
      arranged = [];
      gameState = "world";
    }
  }

  // Speech bubble
  drawSpeechBubble(width / 2, 50, levelData.question);

  // -------------------
  // TIMER LOGIC
  // -------------------
  if (frameCount % 60 === 0 && timer > 0) timer--;

  if (timer <= 0) gameState = "fail";

  // -------------------
  // TIMER CIRCLE
  // -------------------
  let maxTime = levelData.timeLimit;
  let timeRatio = timer / maxTime;

  let centerX = 75;
  let centerY = 60;
  let size = 70;

  noStroke();
  fill("#ff4d4d");
  ellipse(centerX, centerY, size);

  fill(255);
  arc(
    centerX,
    centerY,
    size,
    size,
    -HALF_PI + TWO_PI * timeRatio,
    -HALF_PI + TWO_PI,
    PIE,
  );

  fill(255);
  ellipse(centerX, centerY, size * 0.65);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(28);
  text(timer, centerX, centerY);

  // -------------------
  // WORDS
  // -------------------
  for (let w of words) {
    w.x += w.vx;
    w.y += w.vy;

    if (w.x < 50 || w.x > width - 50) w.vx *= -1;
    if (w.y < 150 || w.y > height - 120) w.vy *= -1;

    // Bubble
    fill("#d0f4ff");
    stroke(0);
    rectMode(CENTER);
    rect(w.x, w.y, 80, 40, 8);

    // Text
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(w.text, w.x, w.y);
  }

  // -------------------
  // ARRANGED SENTENCE
  // -------------------
  fill("#ffffff");
  rect(width / 2, height - 100, width - 40, 60, 10);

  fill(0);
  textAlign(LEFT, CENTER);
  textSize(16);
  text(arranged.join(" "), 60, height - 100);

  // -------------------
  // WIN CONDITION
  // -------------------
  if (arranged.length === levelData.sentence.split(" ").length) {
    if (arranged.join(" ") === levelData.sentence) {
      gameState = "world";
    }
  }

  // -------------------
  // INTRUSIVE SYSTEM
  // -------------------
  if (intrusiveSystem) {
    intrusiveSystem.update();
    intrusiveSystem.display();
  }

  drawExitButton();
}

// ------------------
// MOUSE PRESS
// ------------------
function mousePressed() {
  // Close instructions first
  if (gameState === "world" && showInstructions) {
    let xLeft = width / 2 + 210;
    let xRight = xLeft + 30;
    let yTop = height / 2 - 140;
    let yBottom = yTop + 30;

    if (
      mouseX > xLeft &&
      mouseX < xRight &&
      mouseY > yTop &&
      mouseY < yBottom
    ) {
      showInstructions = false;
      return;
    }
  }

  // STORE EXIT BUTTON
  if (gameState === "store") {
    let btnSize = 50;
    let x = width - btnSize - 40;
    let y = 20;

    if (
      mouseX > x &&
      mouseX < x + btnSize &&
      mouseY > y &&
      mouseY < y + btnSize
    ) {
      gameState = "levelSelect"; // goes back to level screen
      return;
    }
  }

  if (gameState === "store") {
    let clickedWord = null;

    for (let i = words.length - 1; i >= 0; i--) {
      let w = words[i];
      if (
        mouseX > w.x - 45 &&
        mouseX < w.x + 45 &&
        mouseY > w.y - 20 &&
        mouseY < w.y + 20
      ) {
        clickedWord = w.text;
        break;
      }
    }

    if (clickedWord !== null) {
      let levelData = levels[currentLevel].subLevels[currentSubLevel];
      let expectedWord = levelData.sentence.split(" ")[arranged.length];

      if (clickedWord === expectedWord) {
        arranged.push(clickedWord);
        words = words.filter((w) => w.text !== clickedWord);
      } else {
        gameState = "fail";
      }
    }

    if (intrusiveSystem) intrusiveSystem.handleClick(mouseX, mouseY);
  }

  if (gameState === "levelSelect") {
    for (let i = 0; i < sublevelRects.length; i++) {
      let rect = sublevelRects[i];

      if (
        mouseX > rect.x1 &&
        mouseX < rect.x2 &&
        mouseY > rect.y1 &&
        mouseY < rect.y2
      ) {
        if (i <= buildingProgress[currentLevel]) {
          currentSubLevel = i;
          startStoreLevel();
          gameState = "store";
        }

        return;
      }
    }

    // Back button
    if (mouseX > 58 && mouseX < 182 && mouseY > 530 && mouseY < 575) {
      gameState = "world";
    }
  }
  // -------------------------
  // FAIL SCREEN BUTTON
  // -------------------------
  if (gameState === "fail") {
    let btnW = 220;
    let btnH = 60;
    let btnX = width / 2;
    let btnY = height - 120;

    if (
      mouseX > btnX - btnW / 2 &&
      mouseX < btnX + btnW / 2 &&
      mouseY > btnY - btnH / 2 &&
      mouseY < btnY + btnH / 2
    ) {
      gameState = "world";
      return;
    }
  }
}

// ------------------
// SPEECH BUBBLE
// ------------------
function drawSpeechBubble(x, y, message) {
  push();

  textAlign(CENTER, CENTER);
  textSize(16);

  let bubbleWidth = textWidth(message) + 40;
  let bubbleHeight = 60;
  let bubbleY = y + 80;

  // Bubble
  fill(255);
  stroke(0);
  rectMode(CENTER);
  rect(x, bubbleY, bubbleWidth, bubbleHeight, 15);

  // Pointer
  noStroke();
  triangle(
    x - 15,
    bubbleY + bubbleHeight / 2,
    x + 15,
    bubbleY + bubbleHeight / 2,
    x,
    bubbleY + bubbleHeight / 2 + 15,
  );

  // Text
  fill(0);
  text(message, x, bubbleY);

  pop();
}
function drawExitButton() {
  push();

  rectMode(CORNER);

  let btnSize = 50;

  // POSITION OF BUTTON (change these to move it)
  let x = width - btnSize - 40;
  let y = 20;

  // red square
  fill("#ff4d4d");
  stroke(0);
  strokeWeight(2);
  rect(x, y, btnSize, btnSize, 8);

  // white X
  stroke(255); // THIS WAS MISSING
  strokeWeight(4);

  let padding = 12;

  line(x + padding, y + padding, x + btnSize - padding, y + btnSize - padding);

  line(x + btnSize - padding, y + padding, x + padding, y + btnSize - padding);

  pop();
}
