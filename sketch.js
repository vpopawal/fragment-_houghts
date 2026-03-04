let player;
let levelBackgrounds = [];
let worldimg;
let startimg;
let characterimg;
let tryagainimg;
let playerImages = [];
let showInstructions = true;

function setup() {
  createCanvas(800, 600);
  player = new Player();
  textFont("Patrick Hand");
}

function preload() {
  // Load level-specific backgrounds
  for (let lvl of levels) {
    levelBackgrounds.push(loadImage(lvl.bgImg));
  }
  worldimg = loadImage("assets/worldBackground.png");
  startimg = loadImage("assets/introImage.png");
  characterimg = loadImage("assets/characterBackground.png");
  tryagainimg = loadImage("assets/tryagainScreen.png");

  playerImages[0] = loadImage("assets/player1.png");
  playerImages[1] = loadImage("assets/player2.png");
  playerImages[2] = loadImage("assets/player3.png");
}

function draw() {
  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "characterSelect") {
    drawCharacterSelect();
  } else if (gameState === "world") {
    drawWorld();
    player.move();
    player.display();
    checkBuildingEntry(player);
    fill(0);
    textSize(16);
    textAlign(LEFT, TOP);
    text(`X: ${Math.floor(player.x)}  Y: ${Math.floor(player.y)}`, 10, 10);
    checkBuildingEntry(player);

    // Show Press ENTER if near building
    if (player.nearBuilding) {
      fill(0);
      textAlign(CENTER);
      textSize(18);
      text("Press ENTER", width / 2, height - 40);
    }

    if (showInstructions) {
      drawInstructionsPopup();
    }
  } else if (gameState === "store") {
    drawStore();
  } else if (gameState === "fail") {
    drawFailScreen();
  }
}

function keyPressed() {
  // Start game
  if (gameState === "start" && key === " ") {
    gameState = "characterSelect";
  }

  // Character selection
  else if (gameState === "characterSelect") {
    if (key === "1") {
      selectedCharacter = "boy";
      player.setCharacter("boy");
      gameState = "world";
    }
    if (key === "2") {
      selectedCharacter = "girl";
      player.setCharacter("girl");
      gameState = "world";
    }
    if (key === "3") {
      selectedCharacter = "unisex";
      player.setCharacter("unisex");
      gameState = "world";
    }
  }

  // Enter to go into building
  else if (gameState === "world") {
    if (keyCode === ENTER && player.nearBuilding) {
      currentLevel = buildings.indexOf(player.nearBuilding);
      startStoreLevel();
      gameState = "store";
    }
  }

  // Fail screen retry
  else if (gameState === "fail") {
    if (key === " ") {
      startStoreLevel();
      gameState = "store";
    } else if (keyCode === ENTER) {
      gameState = "world";
    }
  }
}
