let player;

function setup() {
  createCanvas(800, 600);
  player = new Player();
  textFont("Patrick Hand"); // 👈 ADD THIS
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
  } else if (gameState === "store") {
    drawStore();
  } else if (gameState === "fail") {
    drawFailScreen();
  } else if (gameState === "success") {
    drawSuccessScreen();
  }
}

function keyPressed() {
  if (gameState === "world" && (key === "Enter" || keyCode === 13)) {
    if (player.nearBuilding != null) {
      currentLevel = player.nearBuilding;
      startStoreLevel();
      gameState = "store";
    }
  }

  // Start screen
  if (gameState === "start" && key === " ") {
    gameState = "characterSelect";
  }

  // Character select
  else if (gameState === "characterSelect") {
    if (key === "1") {
      selectedCharacter = "boy";
      player.setCharacter("boy");
      gameState = "world";
    } else if (key === "2") {
      selectedCharacter = "girl";
      player.setCharacter("girl");
      gameState = "world";
    } else if (key === "3") {
      selectedCharacter = "unisex";
      player.setCharacter("unisex");
      gameState = "world";
    }
  }

  // Fail screen
  else if (gameState === "fail" && key === " ") {
    startStoreLevel();
    gameState = "store";
  }

  // Success screen
  else if (gameState === "success" && key === " ") {
    gameState = "world";
  }
}
