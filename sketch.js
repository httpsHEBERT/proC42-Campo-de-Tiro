// _/﹋\_
// (҂`_´) - I NEED BUBBLES
// <;︻╦╤─ ҉ - - - - - - -

var gun, c1, c2, c3, c4, c5, c6, bluebubble,redbubble, bullet, backBoard, reset;
var gunImg, chargeImg, bubbleImg, bulletImg, blastImg, backBoardImg, resetImg;
var gameState = 1, score = 0, ammunition = 6; life = 3;
var theme, shot, recharge, bubble, fail, lose, click;
var redBubbleGroup, redBubbleGroup, bulletGroup;
var ball, ballImg, heart, heratImg;
var control = "up", tipe = true;

function preload(){
  blueBubbleImg = loadImage("Images/blueBubble.png");
  redBubbleImg = loadImage("Images/redBubble.png");
  blueBlastImg = loadImage("Images/blueBlast.png");
  redBlastImg = loadImage("Images/redBlast.png");
  backBoardImg = loadImage("Images/board.jpg");
  bulletImg = loadImage("Images/bullet.png");
  chargeImg = loadImage("Images/charge.png");
  resetImg = loadImage("Images/reset.png");
  heratImg = loadImage("Images/heart.png");
  bg = loadImage("Images/background.jpg");
  ballImg = loadImage("Images/ball.png");
  gunImg = loadImage("Images/gun.png");

  recharge = loadSound("./Music/recharge.mp3");
  bubble = loadSound("./Music/bubble.mp3");
  theme = loadSound("./Music/theme.mp3");
  click = loadSound("./Music/click.mp3");
  shot = loadSound("./Music/shot.mp3");
  fail = loadSound("./Music/fail.mp3");
  lose = loadSound("./Music/lose.mp3");
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  backBoard = createSprite(112, height/2, 100, height);
  backBoard.addImage(backBoardImg);
  backBoard.scale = 1.5;
  
  gun = createSprite(113, height/2, 50, 50);
  gun.addImage(gunImg);
  gun.scale = 0.2;
  gun.depth = 2;

  c1 = createSprite(width-30, height-height+50);
  c1.addImage(chargeImg);
  c1.scale = 0.3;
  c1.depth = 2;

  c2 = createSprite(width-50, height-height+50);
  c2.addImage(chargeImg);
  c2.scale = 0.3;
  c2.depth = 2;

  c3 = createSprite(width-70, height-height+50);
  c3.addImage(chargeImg);
  c3.scale = 0.3;
  c3.depth = 2;

  c4 = createSprite(width-90, height-height+50);
  c4.addImage(chargeImg);
  c4.scale = 0.3;
  c4.depth = 2;

  c5 = createSprite(width-110, height-height+50);
  c5.addImage(chargeImg);
  c5.scale = 0.3;
  c5.depth = 2;

  c6 = createSprite(width-130, height-height+50);
  c6.addImage(chargeImg);
  c6.scale = 0.3;
  c6.depth = 2;

  ball = createSprite(width-width+106, height-height+60);
  ball.addImage(ballImg);
  
  heart = createSprite(width-width+106, height-70);
  heart.addImage(heratImg);
  heart.scale = 0.3;

  reset = createSprite(width/2+100, height/2);
  reset.addImage(resetImg);
  reset.visible = false;
  reset.scale = 0.3;
  reset.setCollider("circle", 0, 0, 240);

  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();
  bulletGroup = createGroup();

  theme.setVolume(0.1);
  theme.loop();
}

function draw(){
  background(bg);

  if(gameState === 1){
    gun.y = mouseY;  

    if(frameCount % 80 === 0){
      drawBlueBubble();
    }

    if (frameCount % 100 === 0) {
      drawRedBubble();
    }
    
    shootBullet();
    collisions();
    charges();
  }
  
  if(gameState === 2){
    handleGameover();
  }
  
  if(gameState === 3){
    resetGame();
  }

  drawSprites();
  feedbacks();
}

function drawBlueBubble(){
  bluebubble = createSprite(width, random(height-height+50, height-50), 40, 40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 0.1;
  bluebubble.velocityX = -18;
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);
}

function drawRedBubble(){
  redbubble = createSprite(width, random(height-height+50, height-50), 50, 50);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.1;
  redbubble.velocityX = -15;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);
}

function shootBullet(){ 
  if(ammunition > 0){
    if(mouseDown("leftButton") && control === "up"){
      bullet = createSprite(gun.x+100, width/2, 50,20);
      bullet.addImage(bulletImg);
      bulletGroup.add(bullet);
      bullet.velocityX = 7;
      bullet.y = gun.y-34;    
      bullet.scale = 0.12;
      bullet.depth = 1;
      ammunition -= 1;
      shot.play();
    }
  }

  if(ammunition === 0){
    fill(0);
    noStroke();
    textSize(25);
    text("Aperte 'ESPAÇO' para recarregar!", width-width+250, height-height+30);

    if(keyDown("SPACE")){
      recharge.play();
      ammunition = 6;
    }
  }

  if(mouseDown("leftButton")){
    if(control === "up"){
      tipe = false;
    }
    control = "down";
  }else{
    control = "up";
  }   
}

function collisions(){
  if (redBubbleGroup.collide(backBoard)){
    redBubbleGroup.destroyEach();
    fail.play();
    life -= 1;
  }

  if (blueBubbleGroup.collide(backBoard)){
    blueBubbleGroup.destroyEach();
    fail.play();
    life -= 1;
  }

  if(life === 0){
    gameState = 2;
    lose.play();
  }

  if(blueBubbleGroup.collide(bulletGroup)){
    handleBlueBubbleCollision(blueBubbleGroup);
    bubble.play();
  }

  if(redBubbleGroup.collide(bulletGroup)){
    handleRedBubbleCollision(redBubbleGroup);
    bubble.play();
  }
}

function charges(){
  if(ammunition > 5){
    c6.visible = true;
  }else{
    c6.visible = false;
  }

  if(ammunition > 4){
    c5.visible = true;
  }else{
    c5.visible = false;
  }

  if(ammunition > 3){
    c4.visible = true;
  }else{
    c4.visible = false;
  }

  if(ammunition > 2){
    c3.visible = true;
  }else{
    c3.visible = false;
  }

  if(ammunition > 1){
    c2.visible = true;
  }else{
    c2.visible = false;
  }

  if(ammunition > 0){
    c1.visible = true;
  }else{
    c1.visible = false;
  }
}

function handleBlueBubbleCollision(bubbleGroup){
  if (life > 0) {
    score += 1;
  }

  blast = createSprite(bullet.x+60, bullet.y, 50, 50);
  blast.addImage(blueBlastImg);    
  blast.scale = 0.3;
  blast.life = 5;

  bulletGroup.destroyEach();
  bubbleGroup.destroyEach();
}

function handleRedBubbleCollision(bubbleGroup){
  if (life > 0) {
    score += 1;
  }

  blast = createSprite(bullet.x+60, bullet.y, 50, 50);
  blast.addImage(redBlastImg);    
  blast.scale = 0.35;
  blast.life = 5;

  bulletGroup.destroyEach();
  bubbleGroup.destroyEach();
}

function feedbacks(){  
  stroke(0);
  strokeWeight(5);
  textFont("Geórgian");

  textSize(70);
  fill("lightGreen");
  if(score < 10){
    text(score, ball.x-18, ball.y+23);
    ball.scale = 0.2;
  }else if(score > 9 && score < 100){
    text(score, ball.x-35, ball.y+22);
    ball.y = height-height+70;
    ball.scale = 0.25;
  }else{
    text(score, ball.x-50, ball.y+22);
    ball.y = height-height+80;
    ball.scale = 0.34;
  }
  
  textSize(50);
  fill("white");
  text(life, heart.x-12.5, heart.y+15);

  if(tipe){
    fill(0);
    noStroke();
    textSize(25);
    text("Use o botão esquerdo do mouse para atirar.", width-width+250, height-20); 
  }
}

function handleGameover(){
  
  bulletGroup.destroyEach();
  redBubbleGroup.destroyEach();
  blueBubbleGroup.destroyEach();

  tipe = false;

  swal({
    title: `Fim de Jogo :(`,
    text: "Sua pontuação é: " + score,
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "BOA SORTE NA PRÓXIMA"
  });

  gameState = 3;
}

function resetGame(){

  control = "down";
  reset.visible = true;

  fill(0);
  textSize(20);

  if(mouseIsOver(reset)){
    reset.scale = 0.32;
    text("JOGAR NOVAMENTE", reset.x-99, reset.y+110);
  }else{
    reset.scale = 0.3;
  }

  if(mousePressedOver(reset)){
    reset.visible = false;
    life = 3, score = 0;
    ammunition = 6;
    gameState = 1;
    click.play();
    tipe = true;
  }
}