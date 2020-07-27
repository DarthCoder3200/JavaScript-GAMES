function load(){
    enemy_image = new Image;
    enemy_image.src = "Assets/modi1.png";
    gem_image = new Image;
    gem_image.src = "Assets/gem.png"
    player_image = new Image;
    player_image.src = "Assets/play.png";
}
function isCollision(rect1,rect2){
    if(Math.abs(rect1.x - rect2.x) < rect1.w && Math.abs(rect1.y - rect2.y)<rect1.h) return true;
    return false;
}
function init(){
    gameover = false;
     canvas = document.getElementById("mycanvas");
    console.log(canvas);
     W = 700;
     H = 400;
    canvas.height = H;
    canvas.width = W;
    pen = canvas.getContext('2d');
    e1 = {
        x : 150,
        y : 200,
        w : 60,
        h : 60,
        speed : 20,
    };
    e2 = {
        x : 320,
        y : 50,
        w : 60,
        h : 60,
        speed : 25,
    };
    e3 = {
        x : 490,
        y : 300,
        w : 60,
        h : 60,
        speed : 40,
    };
    enemy = [e1,e2,e3];
    gem ={
        x : W-100,
        y : H/2,
        w : 60,
        h : 60,
    };
    player ={
        x : 50,
        y : H/2,
        w : 60,
        h : 60,
        speed : 20,
        moving : false,
        health : 400,
    };
    canvas.addEventListener('mousedown',function(){
        player.moving = true;
    });
    canvas.addEventListener('mouseup',function(){
        player.moving = false;
    });
    
}
function draw(){
    pen.clearRect(0,0,W,H);
    pen.fillStyle = "yellow";
    pen.fillText("Score ", 10,10,70,20);
    pen.fillText(player.health,40,10,20,20);
    pen.drawImage(player_image,player.x,player.y,player.w,player.h);
    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
    for(var i=0;i<enemy.length;i++){
        pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
    }
}
function update(){
    if(player.moving == true){
        player.x += player.speed; 
    }
    for(var i=0;i<enemy.length;i++){
        if(isCollision(player,enemy[i])){
            player.health -= 50;
        }
    }
    if(player.health < 0){
        alert("You Lose");
        gameover = true;
    } 
    if(isCollision(player,gem)){
        
        alert("You Won heavily 62/70");
        gameover = true;
    }
    for(var i=0;i<enemy.length;i++){
        enemy[i].y += enemy[i].speed;
        if(enemy[i].y>H-enemy[i].h || enemy[i].y<0){
            enemy[i].speed *= -1;
        }
    }
}
function gameloop(){
    if(gameover == true) {
        clearInterval(f);
    }
    draw();
    update();
}
load();
init();
var f = setInterval(gameloop, 100);