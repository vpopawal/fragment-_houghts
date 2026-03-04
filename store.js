let words = [];
let arranged = [];
let timer = 20;
let intrusiveSystem;

function startStoreLevel() {
  let correctSentence = levels[currentLevel].sentence.split(" ");

  // Add confusing words
  let distractors = [
    "maybe",
    "oops",
    "forgot",
    "quickly",
    "sorry",
    "uh",
    "actually",
    "wait",
  ];

  // Mix correct words + distractors
  let mixed = correctSentence.concat(shuffle(distractors).slice(0, 4));

  words = [];

  // Create floating word objects
  for (let w of shuffle(mixed)) {
    words.push({
      text: w,
      x: random(100, width - 100),
      y: random(150, height - 150),
      vx: random(-2, 2),
      vy: random(-2, 2),
    });
  }

  arranged = [];
  timer = 20;

  intrusiveSystem = new IntrusiveSystem(levels[currentLevel].intrusiveRate);
}

function drawStore() {
  if (levelBackgrounds[currentLevel]) {
    image(levelBackgrounds[currentLevel], 0, 0, width, height);
  } else {
    background("#fff3e6"); // fallback color
  }

  // Show the question at the top
  drawSpeechBubble(width / 2, 50, levels[currentLevel].question);

  // TIMER
  fill(0);
  textSize(20);
  textAlign(LEFT);
  text("Time: " + timer, 20, 30);

  if (frameCount % 60 === 0 && timer > 0) {
    timer--;
  }

  // UPDATE & DRAW FLOATING WORDS
  for (let w of words) {
    w.x += w.vx;
    w.y += w.vy;

    if (w.x < 50 || w.x > width - 50) w.vx *= -1;
    if (w.y < 100 || w.y > height - 100) w.vy *= -1;

    fill("#d0f4ff");
    rect(w.x - 40, w.y - 20, 80, 40, 8);

    fill(0);
    textAlign(CENTER, CENTER);
    textSize(14);
    text(w.text, w.x, w.y);
  }

  // DRAW ARRANGED SENTENCE AREA
  fill("#baffc9");
  rect(50, height - 100, width - 100, 60, 10);

  fill(0);
  textAlign(LEFT, CENTER);
  textSize(16);

  let sentenceString = arranged.join(" ");
  text(sentenceString, 60, height - 70);

  // CHECK WIN CONDITION
  if (arranged.join(" ") === levels[currentLevel].sentence) {
    gameState = "world"; // return to world when complete
  }

  // If time runs out
  if (timer <= 0) {
    gameState = "fail"; // go to your fail screen
  }

  intrusiveSystem.update();
  intrusiveSystem.display();
}

function mousePressed() {
  // ⭐ CLOSE INSTRUCTIONS POPUP (ADD THIS FIRST)
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
      return; // IMPORTANT: stop here so nothing else runs
    }
  }

  if (gameState === "store") {
    let clickedWord = null;

    // Detect clicked word
    for (let i = words.length - 1; i >= 0; i--) {
      let w = words[i];
      if (
        mouseX > w.x - 40 &&
        mouseX < w.x + 40 &&
        mouseY > w.y - 20 &&
        mouseY < w.y + 20
      ) {
        clickedWord = w.text;
        break;
      }
    }

    if (clickedWord !== null) {
      let expectedWord =
        levels[currentLevel].sentence.split(" ")[arranged.length];

      if (clickedWord === expectedWord) {
        // Correct word, add to arranged
        arranged.push(clickedWord);
        words = words.filter((w) => w.text !== clickedWord);
      } else {
        // Wrong word clicked, go to fail screen
        gameState = "fail";
      }
    }

    if (intrusiveSystem) {
      intrusiveSystem.handleClick(mouseX, mouseY);
    }
  }
}

function drawSpeechBubble(x, y, message) {
  push();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(16);

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
