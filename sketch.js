
var mario;
var obst1g;
var marioimg;
var ground;
var rand;
var i;
var g;
var s;
var bg;
var brick = [];
var brickg,coing,bimg;
var coin = [];
var Score = 0;
var GameState = "play";
var enemyg;
var gameOverimg;
var end1;
var playsound;
var ghostimg;
function preload(){
  end1 = loadImage("images/end1.png")
  bg = loadImage("images/bg.jpg")
  marioimg = loadAnimation("images/img1.png","images/img2.png","images/img3.png","images/img4.png","images/img5.png")
bimg = loadImage("images/brick1.png")
gameOverimg = loadImage("images/game.jpg");
i = loadAnimation("images/obs1.png","images/obs2.png")
j = loadAnimation("images/obs3.png","images/obs4.png")

coinimg = loadAnimation("Mario coin1.png","Mario coin2.png","Mario coin3.png",
"Mario coin4.png","Mario coin5.png","Mario coin6.png")
jumpsound = loadSound("jump.mp3");
coinsound = loadSound("coinjump.mp3");
endsound = loadSound("end.mp3");
ghostimg = loadAnimation("mario ghost1.png","mario ghost2.png",
"mario ghost3.png","mario ghost4.png")
}
function setup() {
  
  createCanvas(windowWidth, windowHeight);
  background = createSprite(width/2,height/2,width,height);
  background.scale = 0.55;
  background.addImage(bg);
  mario = createSprite(40 ,height/2,10,10);
  mario.scale = 2;
 
  mario.addAnimation("mario_img",marioimg)
  ground = createSprite(width/2,height-8,width,30)
  ground.visible = false;
  edges = createEdgeSprites();
  brickg = new Group();
  coing = new Group();
  enemyg = new Group();
  obst1g = new Group();
}
 
function draw() {
  randh = Math.round(random(200,height-200));
  randw = Math.round(random(0,width));
 if(GameState === "play"){
mario.bounceOff(edges)
 background.velocityX = -3;
 if(background.x < width/2 ){
  background.x = background.width/2
}
  rand = random(-35,-10)
  if(keyDown("left")){
    mario.x = mario.x-5;
  }
  if(keyDown("right")){
    mario.x = mario.x+5;
  }
   if(keyDown("space") ){
    mario.velocityY = rand;
   //jumpsound.play();
    }
 mario.velocityY = mario.velocityY + 0.8 ;
 
  mario.collide(ground);
  for(var i = 0;i<brick.length;i++) {
    if(brick[i].isTouching(mario)){
      coinsound.play();
brick[i].destroy();
coin[i].visible = true;
coin[i].velocityY =-13;
Score = Score + 1; 
  }
}
    for(var i = 0; i < enemyg.length;i++){
      if(enemyg[i].isTouching(mario)){
       endsound.play();
        GameState = "end";
      }
    }  
  Enemy();
  Ghost();

  if(frameCount % 50 === 0){
  bricks(); 
}


if(GameState === "end"){
  background = createSprite(width/2,height/2,width,height);
  background.addImage(gameOverimg);
  background.scale = 3;
  background.velocityX = 0;
  enemyg.destroyEach();
}

drawSprites();
fill(0);
stroke("white");
strokeWeight(7);
textSize(30);
text("Score:"+Score,width/2+500,35);


}
}





function Enemy(){
  if(frameCount % 220 === 0){
  var obst = createSprite(width,height-70);
  obst.velocityX = -3;
  obst.scale = 3;

  var rand =  Math.round(random(1,3));
  switch(rand){
    case 1: obst.addAnimation("obstacle",i)
    break;
    case 2: obst.addAnimation("obstacle",j)
  default:break
  }

 
    
  console.log(obst.x);
  enemyg.add(obst);
}
}

function Ghost(){
  if(frameCount % 100 === 0){
  var obst1 = createSprite(Math.round(random(0,width)),
  Math.round(random(0,height-200)));
  obst1.velocityX = -3;
  obst1g.add(obst1);
  obst1.addAnimation("ghost",ghostimg)
  obst1.scale = 2;
  }
}
function bricks (){
brick.push(createSprite(randw,randh,120,10));
coin.push(createSprite(randw,randh - 50,30,30));
  for(var i = 0;i<brick.length;i++) {
  brick[i].velocityX = -3;
  coin[i].velocityX = -3;
  coin[i].visible = false;
  brick[i].addImage(bimg)
  coin[i].addAnimation("coinimage",coinimg);
}
  }

