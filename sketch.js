var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var gameoverimg,restartimg,gameover,restart;

var cloudsGroup, cloudImage;
var platformsGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var PLAY=1;
var END=0;
var gamestate= PLAY;

var sound,soundDie,soundJump;


function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameoverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
  
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  

  trex = createSprite(550,550,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.setCollider("circle",0,0,30);
  trex.addImage("collided",trex_collided);
  
  ground = createSprite(0,600,1600,20);
 ground.x = ground.width/2;
 
  
 /*invisibleGround = createSprite(200,560,400,10);
 invisibleGround.visible = false;*/
  
  cloudsGroup = new Group();
  platformsGroup = new Group();
  
  
  
  score = 0;
  
  gameover=createSprite(300,100,10,10);
  gameover.addImage(gameoverimg);
  gameover.scale=0.4;
  
  restart=createSprite(300,120,10,10);
  restart.addImage(restartimg);
  restart.scale=0.4;
  
  restart.visible=false;
  gameover.visible=false;
  
  sound=loadSound("checkPoint.mp3");
  soundDie=loadSound("die.mp3");
  soundJump=loadSound("jump.mp3");
}

function draw(){
  background(180);
  
  fill("blue");
  textSize(20);
  text(mouseX, 200, 200);

  if(gamestate===PLAY){
    if(keyDown("space")&&trex.y>=159){
    trex.velocityY = -13;
    soundJump.play();
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
   score = score + Math.round(getFrameRate()/60);
  text("Score: "+ score, 500,trex.y-450);
  
   if(score>0 && score%100===0){
     sound.play();
   }
    
  /*if (ground.x < 0){
    //ground.x = ground.width/2;
  }*/
  
    
  
  spawnClouds();
  spawnPlatforms();
  
   /* if(trex.isTouching(platformsGroup)){
     soundDie.play();
     gamestate=END;
    }*/
  }
  
   /* if(gamestate===END){
    restart.visible=true;
    gameover.visible=true;
    //platformsGroup.setVelocityXEach(0);
    //platformsGroup.setLifetimeEach(-1);
    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    trex.velocityY=0;
    trex.changeImage("collided",trex_collided);
    ground.velocityX=0;
  }*/
  
  if(mousePressedOver(restart)){
  reset();
  }
  
  trex.collide(ground);
  trex.collide(platformsGroup);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 70 === 0) {
    var cloud = createSprite(Math.round(random(40,100)),10,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityY = 3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnPlatforms() {
  if(frameCount%60===0){
    var platforms = createSprite(random(400, 900),0, 200,15);
    platforms.velocityY = 3;
    platforms.lifetime = 200;
    platforms.y+=20;
    platformsGroup.add(platforms);
  }
    //generate random obstacles
    /*var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }*/
    
    //assign scale and lifetime to the obstacle           
    //obstacle.scale = 0.5;
     
    //add each obstacle to the group
    
  
}

function reset(){
  gamestate=PLAY;
  
  ground.velocityX=-4;
  
  gameover.visible=false;
  restart.visible=false;
  
  platformsGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  trex.y=170;
  
  score=0;
  
}