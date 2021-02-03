
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage,backgroundImage;
var FoodGroup, ObstacleGroup;
var score = 1;
var ground, invisible;
var survivalTime = 0;
var GameState;
var PLAY, END;
var end;
var gameState=PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  ObstacleImage = loadImage("stone.png");
  backgroundImage = loadImage("jungle.jpg")
}



function setup() {
createCanvas(700,450);

  background = createSprite(0,0,700,450);
  background.addImage(backgroundImage);
  background.scale = 1.5;
  
  monkey = createSprite(70,370,50,50);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(250,405,1000,10)
  ground.x = ground.width/2;
  ground.debug = true;
  
  invisible = createSprite(250,407,1000,10);
  invisible.x = ground.width/2;
  
  bananaGroup = createGroup();
  ObstacleGroup = createGroup();
  
  score = 0;
}


function draw() {
background.velocityX = -3;
  
  if(background.x<0){
    background.x = background.width/2;
  }
  if(ObstacleGroup.isTouching(monkey)){
    monkey.scale = 0.2;
  }
  
  if(ground.x<0){
    ground.x = ground.width/2;
  }
  spawnObstacle();
  spawnBanana();
  
  if(keyDown("space")&& monkey.y>=250){
      monkey.velocityY = -11;
    }
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score=score+2;
  
  switch(score){
    case 10:monkey.scale =0.22;
           break;
    case 20:monkey.scale =0.24;
           break;
    case 30:monkey.scale =0.26;
           break;
    case 40:monkey.scale =0.28;
           break;
  }
  
  monkey.velocityY=monkey.velocityY +0.8
  
  
  
  monkey.collide();
  }
   if(GameState === END){
    ground.velocityX = 0;
    invisible.velocityX=0;
    ObstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    ObstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
  //gravity
  monkey.velocityY = monkey.velocityY +0.9;
  
  monkey.collide(invisible);
  
  drawSprites();
  
  fill("white");
  text("score:"+score, 500,50); 
  
  stroke("black");
  textSize(20);
  fill("black");
  text("score:"+score,400,50); 

 drawSprites(); 
}


function spawnBanana(){
  
  if(frameCount%300 === 0){
    var banana = createSprite(500,10,10,20);
    banana.addImage("banana",bananaImage);
   //  banana.velocityX = -(5+2*score/100);
    banana.y =Math.round(random(120,200));
    banana.scale=0.1;
    bananaGroup.add(banana);
    bananaGroup.setLifetimeEach(100);
    banana.setCollider("rectangle",0,0,400,400);
  }
}

function spawnObstacle(){
  
  if(frameCount%300 === 0){
    var Obstacle = createSprite(500,365,23,32);
    Obstacle.addImage("Obstacle",ObstacleImage);
    //Obstacle.velocityX = -(5+2*score/100);
    Obstacle.scale=0.2;
    ObstacleGroup.add(Obstacle);
    ObstacleGroup.setLifetimeEach(100);
    Obstacle.debug = true;
    Obstacle.setCollider("rectangle",0,0,200,200);
  }
}

