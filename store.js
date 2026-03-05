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
  // TIMER LOGIC
  if (frameCount % 60 === 0 && timer > 0) {
    timer--;
  }

  // TIMER DISPLAY (BIG CIRCLE)
  let maxTime = levels[currentLevel].timeLimit;
  let timeRatio = timer / maxTime; // 1 at start → 0 at end

  let centerX = 75; // move position if needed
  let centerY = 60;
  let size = 70; // 🔥 bigger circle

  // Background ring (light grey base)
  noStroke();
  fill(240);
  ellipse(centerX, centerY, size);

  // Red countdown fill (FULL at start)
  fill("#ff4d4d"); // strong red
  arc(
    centerX,
    centerY,
    size,
    size,
    -HALF_PI,
    -HALF_PI + TWO_PI * timeRatio,
    PIE,
  );

  // Inner circle (optional donut style — remove if you want full solid)
  fill(255);
  ellipse(centerX, centerY, size * 0.65);

  // Timer number in center
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(28);
  text(timer, centerX, centerY);

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
  textAlign(CENTER, CENTER);
  textSize(16);

  let offsetY = 100; // proper position

  let bubbleWidth = textWidth(message) + 30;
  let bubbleHeight = 50;

  // Bubble
  fill(255);
  stroke(0);
  rectMode(CENTER);
  rect(x, y + offsetY, bubbleWidth, bubbleHeight, 12);

  // Triangle pointer
  noStroke();
  triangle(
    x - 15,
    y + offsetY + bubbleHeight / 2,
    x + 15,
    y + offsetY + bubbleHeight / 2,
    x,
    y + offsetY + bubbleHeight / 2 + 15,
  );

  // Text
  fill(0);
  text(message, x, y + offsetY);

  pop();
}
