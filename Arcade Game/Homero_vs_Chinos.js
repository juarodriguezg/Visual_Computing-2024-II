let player;
let platforms = [];
let walls = [];
let chinese = [];
let gravity = 0.5;
let jumpStrength = -10;

function preload() {
  playerSprite = loadImage('Homer.png');
  enemySprite = loadImage('chines.png');
  backg= loadImage('Background.png');
  bullet = loadImage('bullet.png');
}

function setup() {
  createCanvas(1000, 600);

  // Inicializar al jugador
  player = {
    x: 250,
    y: 200,
    width: 50,
    height: 70,
    velocityY: 0,
    onGround: false,
    direction: 1
  };

  bullet = {
    
  }
  
  // Crear plataformas
  platforms.push({ x: 0, y: 580, width: width, height: 25 });
  platforms.push({x : 200, y: 480, width: width - 400, height: 25 });

  // Crear muros
  walls.push({ x: 0, y: 0, width: 25, height: 600 }); // Muro izquierdo
  walls.push({ x: width-25, y: 0, width: 25, height: 600 }); // Muro derecho
  
  // Crear enemigos
  chinese.push({ x: 400, y: height - 100, width: 75, height: 75, speed: 2, direction: 1 });
  chinese.push({ x: 600, y: height -100, width: 75, height: 75, speed: 2, direction: -1 });
}


function draw() {
  background(backg);

  // Dibujar plataformas
  fill(100);
  for (let platform of platforms) {
    rect(platform.x, platform.y, platform.width, platform.height);
  }

  // Dibujar muros  
  for (let wall of walls) {
    rect(wall.x, wall.y, wall.width, wall.height);
  }

  // Dibujar y mover enemigos
  for (let enemy of chinese) {
    enemy.x += enemy.speed * enemy.direction;

    // Cambiar dirección al tocar un muro
    if (enemy.x <= 25 || enemy.x + enemy.width >= width - 25) {
      enemy.direction *= -1;
    }

    // Dibujar enemigo con reflejo
    push();
    if (enemy.direction === 1) {
      image(enemySprite, enemy.x, enemy.y, enemy.width, enemy.height);
    } else {
      translate(enemy.x + enemy.width, enemy.y);
      scale(-1, 1);
      image(enemySprite, 0, 0, enemy.width, enemy.height);
    }
    pop();

    // Verificar colisión con el jugador
    if (
      player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y
    ) {
      console.log("¡Colisión con enemigo!");
      player.x = 400;
      player.y = 200;
      player.velocityY = 0;
    }
  }

  // Aplicar gravedad
  player.velocityY += gravity;

  // Movimiento vertical del jugador
  player.y += player.velocityY;

  // Verificar colisiones con plataformas
  player.onGround = false;
  for (let platform of platforms) {
    if (
      player.x + player.width > platform.x &&
      player.x < platform.x + platform.width &&
      player.y + player.height >= platform.y &&
      player.y + player.height <= platform.y + platform.height
    ) {
      player.velocityY = 0;
      player.y = platform.y - player.height;
      player.onGround = true;
    }
  }

  // Verificar colisiones con muros
  for (let wall of walls) {
    if (
      player.x + player.width > wall.x &&
      player.x < wall.x + wall.width &&
      player.y + player.height > wall.y &&
      player.y < wall.y + wall.height
    ) {
      if (player.x < wall.x) {
        player.x = wall.x - player.width;
      } else if (player.x + player.width > wall.x + wall.width) {
        player.x = wall.x + wall.width;
      }
    }
  }

  // Movimiento horizontal
  if (keyIsDown(LEFT_ARROW)) {
    player.x -= 5;
    player.direction = -1; // Mirar a la izquierda
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.x += 5;
    player.direction = 1; // Mirar a la derecha
  }

  // Salto
  if (keyIsDown(UP_ARROW) && player.onGround) {
    player.velocityY = jumpStrength;
  }

  // Dibujar al jugador con reflejo
  push();
  if (player.direction === 1) {
    image(playerSprite, player.x, player.y, player.width, player.height);
  } else {
    translate(player.x + player.width, player.y);
    scale(-1, 1);
    image(playerSprite, 0, 0, player.width, player.height);
  }
  pop();
  //image(playerSprite, player.x, player.y, player.width, player.height);
}
