let armAngle = 0;
let legAngle = 0;
let numRows = 4;
let numCols = [5, 3, 5,3];

function setup() {
  createCanvas(800, 600, WEBGL);
  
}
function preload(){
  metal = loadImage("Metal.jpg");
  piso = loadImage('piso.jpg');
  song = loadSound('');
}

function draw() {
  background(204,255,255);
  orbitControl();

  let spacingX = 200;
  let spacingZ = 200;
  
  push();
  translate(0,25,0);
  rotateX(PI/2);
  texture(piso);
  //fill(153,0,153);
  plane(900);
  pop();
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols[row]; col++) {
      let xPosition = (col - (numCols[row] - 1) / 2) * spacingX;
      let zPosition = row * spacingZ - (numRows - 1) * spacingZ / 2;

      push();
      translate(xPosition, 0, zPosition);
      rotateX(sin(frameCount * 0.1) * 0.2);
      //rotateY(sin(frameCount*0.1)*1);
      push();
      translate(0, -140, 0);
      noStroke();
      //fill(192,192,192);
      texture(metal);
      sphere(25);
      stroke(0);
      pop();

      push();
      translate(0, -75, 0);
      texture(metal);
      box(50, 80, 40);
      pop();

      drawArms(armAngle);
      drawLegs(legAngle);

      pop();
    }
  }

  armAngle = sin(frameCount * 0.1) * 20;
  legAngle = sin(frameCount * 0.1) * 50;
}

function drawArms(angle) {
  push();
  translate(-25, -105, 0);
  //translate(0, -30, 0);
  rotateZ(PI/2);
  rotateZ(radians(angle*3));
  translate(0, 30, 0);
  //fill(160);
  texture(metal);
  box(20, 60, 20);
  pop();

  push();
  texture(metal);
  translate(30, -75, 0);
  translate(0, -30, 0);
  rotateZ(-PI/6);
  rotateZ(radians(-angle));
  translate(0, 30, 0);
  //fill(160);
  box(20, 60, 20);
  pop();
}

function drawLegs(angle) {
  push();
  texture(metal);
  translate(-15, 0, 0);
  translate(0, -35, 0);
  rotateX(radians(angle));
  translate(0, 30, 0);
  //fill(160);
  box(20, 60, 20);
  pop();

  push();
  texture(metal);
  translate(15, 0, 0);
  translate(0, -35, 0);
  //rotateX(radians(-angle));
  translate(0, 30, 0);
  //fill(160);
  box(20, 60, 30);
  pop();
}
