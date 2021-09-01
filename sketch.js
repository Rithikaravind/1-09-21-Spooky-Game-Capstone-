var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(200,67)
  ghost.scale = 0.35;
  ghost.addImage(ghostImg);
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  spookySound.play();

}

function draw() {
  background("black");
  if(gameState === "play"){
    if(tower.y > 400){
      tower.y = 300
    }
  if(keyDown("left")){
    ghost.x = ghost.x - 5;
  }

  if(keyDown("right")){
    ghost.x= ghost.x + 5;
  }

  if(keyDown("space")){
    ghost.velocityY = -10;
  }
  
  ghost.velocityY = ghost.velocityY + 0.5;
    spawnDoors();
    drawSprites();
    if(climbersGroup.isTouching (ghost)){
      ghost.velocityY = 0;
      
    }
    if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
      gameState = "end";
    }
  }
  if(gameState === "end"){
    textSize(30)
    fill("blue");
    text("GAME OVER!", 250,250);
  }
}


function spawnDoors(){
  if(frameCount % 240 === 0){
    door = createSprite(25,-50,65,100);
    door.addImage(doorImg);
    door.velocityY = 1
    door.x = Math.round (random(120,400));
    ghost.depth = door.depth;
    ghost.depth += 1;

    climber = createSprite(door.x, 10);
    climber.addImage(climberImg); 
    climber.velocityY = 1;
    climber.debug = true;
    

    invisibleBlock = createSprite(door.x, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.velocityY = 1;
    doorsGroup.add (door);
    climbersGroup.add (climber);
    invisibleBlockGroup.add (invisibleBlock);
    



  

  }
 


}