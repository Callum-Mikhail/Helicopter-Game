// FUNCTIONS

// Draw Start Screen
function drawStart() {
  drawMainComponents();

  // Start Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("CLICK TO START", 350, 285);

  ctx.font = "25px Consolas";
  ctx.fillText("CLICK AND HOLD LEFT MOUSE BUTTON TO GO UP", 100, 450);
  ctx.fillText("RELEASE TO GO DOWN", 415, 480);
}

// Draw Game Elements
function runGame() {
  // LOGIC
  moveHeli();
  moveWalls();
  checkCollisions();

  //DRAW
  drawGame();
}

function moveHeli() {
  //ACCELERATE UPWARD IF MOUSE PRESSED
  if (mouseIsPressed) {
    heli.speed += -1;
  }

  // APPLY GRAVITY (ACCEL)
  heli.speed += heli.accel;

  // CONSTRAIN SPEED (min/max)
  if (heli.speed > 11) {
    heli.speed = 11;
  } else if (heli.speed < -11) {
    heli.speed = -11;
  }

  // MOVE HELI BY ITS SPEED
  heli.y += heli.speed;
}

function moveWalls() {
  // Wall1
  wall1.x += -10;
  if (wall1.x + wall1.w < 0) {
    wall1.x = wall3.x + 500;
  }

  // Wall2
  wall2.x += -10;
  if (wall2.x + wall2.w < 0) {
    wall2.x = wall1.x + 500;
  }

  // Wall3
  wall3.x += -10;
  if (wall3.x + wall3.w < 0) {
    wall3.x = wall2.x + 500;
  }
}

function checkCollisions() {
  // Collision With Top and Bottom
  if (heli.y < 50 || heli.y + heli.h > 550) {
    gameOver();
  }

  // Collision with Walls
  // Wall1
  if (
    heli.x + heli.w > wall1.x &&
    heli.x < wall1.x + wall1.w &&
    heli.y + heli.h > wall1.y &&
    heli.y < wall1.y + wall1.h
  ) {
    gameOver();
  }
  // Wall2
  if (
    heli.x + heli.w > wall2.x &&
    heli.x < wall2.x + wall2.w &&
    heli.y + heli.h > wall2.y &&
    heli.y < wall2.y + wall2.h
  ) {
    gameOver();
  }
  // Wall3
  if (
    heli.x + heli.w > wall3.x &&
    heli.x < wall3.x + wall3.w &&
    heli.y + heli.h > wall3.y &&
    heli.y < wall3.y + wall3.h
  ) {
    gameOver();
  }
}
function gameOver() {
  state = "gameover";
  explosion.play();

  setTimeout(reset, 2000);
}

// Draw Game Elements
function drawGame() {
  drawMainComponents();
  drawWalls();
}

// Draw Game Over Screen
function drawGameOver() {
  drawMainComponents();

  // Draw Walls
  drawWalls();

  // Circle around Helicopter
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(heli.x + heli.w / 2, heli.y + heli.h / 2, 60, 0, 2 * Math.PI);
  ctx.stroke();

  // Game Over Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("GAME OVER", 350, 285);
}

// helper functions
function reset() {
  state = "start";
  mouseIsPressed = false;
  heli = {
    x: 200,
    y: 250,
    w: 80,
    h: 40,
    speed: 0,
    accel: 0.4,
  };
  wall1 = {
    x: cnv.width,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
  };
  wall2 = {
    x: cnv.width + 500,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
  };
  wall3 = {
    x: cnv.width + 1000,
    y: Math.random() * 300 + 100,
    w: 50,
    h: 100,
  };
}

function drawWalls() {
  ctx.fillStyle = "green";
  ctx.fillRect(wall1.x, wall1.y, wall1.w, wall1.h);
  ctx.fillRect(wall2.x, wall2.y, wall2.w, wall2.h);
  ctx.fillRect(wall3.x, wall3.y, wall3.w, wall3.h);
}

function drawMainComponents() {
  // Background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Green Bars
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, cnv.width, 50);
  ctx.fillRect(0, cnv.height - 50, cnv.width, 50);

  // Green Bar Text
  ctx.font = "30px Consolas";
  ctx.fillStyle = "black";
  ctx.fillText("HELICOPTER GAME", 25, 35);
  // ctx.fillText("DISTANCE: 0", 25, cnv.height - 15);
  // ctx.fillText("BEST: 0", cnv.width - 250, cnv.height - 15);

  // Helicopter
  ctx.drawImage(heliImg, heli.x, heli.y);
}
