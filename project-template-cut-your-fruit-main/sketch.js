//Estados do jogo
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position, powerSound, kfineSound, gameOverSound;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage, power;

function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  kfineSound = loadSound("knifeSwoosh.mp3");
  gameOverSound = loadSound("gameOver.mp3");
}

function setup() {
  createCanvas(600, 600);
  
  
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  //definir colisor para espada
  knife.setCollider("rectangle",0,0,40,40);

  // Variáveis de pontuação e grupos
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Chamar função de frutas e monstros
    fruits();
    Monster();
    
    // Mova a espada com o mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Aumenta a pontuação se a espada tocar na fruta
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      score = score + 1;
      kfineSound.play();
    }
    else
    {
      // Vá para o estado final se a espada tocar o inimigo
      if(monsterGroup.isTouching(knife)){
        gameState=END;
        gameOverSound.play();
        //adicione o som do gameover (fim de jogo) aqui
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Mude a animação da espada para gameover (fim de jogo) e redefina sua posição
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
      }
    }
  }
  // Não consegui adicionar o poder pq o codego deu errado não sei pq :(
  
  drawSprites();
  //Exibir pontuação
  textSize(25);
  text("Score : "+ score,250,50);
}


function Monster(){
  if(World.frameCount%50===0){
    monster=createSprite(Math.round(random(10,canvas.width - 10)),0,20,20);
    monster.addAnimation("moving", monsterImage);
    //atualize o código abaixo para aumentar a velocidade do monsterGroup (grupo de monstros) em 10
    monster.velocityY = Math.round(random(6,12));
    if(monster.x < canvas.width/2){
      monster.velocityX = Math.round(random(0,8));
    }
    if(monster.x > canvas.width/2){
      monster.velocityX = Math.round(random(0,-8));
    }
    monster.setLifetime=300;
    monsterGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%35===0){
    position = Math.round(random(1,2));
    fruit=createSprite(Math.round(random(10,canvas.width - 10)),0,20,20);
    fruit.velocityY = Math.round(random(6,12));
    if(fruit.x < canvas.width/2){
      fruit.velocityX = Math.round(random(0,8));
    }
    if(fruit.x > canvas.width/2){
      fruit.velocityX = Math.round(random(0,-8));
    }
    
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
        
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}