

let config = {
    type : Phaser.CANVAS,
    width  : 800,
    height : 600,
    backgroundColor : 0xffcc00,
    
    scene : {
        preload : preload,
        create : create,
        update : update,
        
    }
};

let game = new Phaser.Game(config);

function preload(){
    console.log(this);
    this.load.image('background',"Assets/back.jpg");
    this.load.image('wheel',"Assets/spinwheel.png");
    this.load.image('arrow',"Assets/aro.png");
    this.load.image('stand',"Assets/stand.png");
}
function create(){
    let W = game.config.width;
    let H = game.config.height;
    
    
    let background = this.add.sprite(0,0,'background');
    background.setPosition(W/2,H/2);
    background.setScale(1);
    let stand = this.add.sprite(0,0,'stand');
    stand.setPosition(W/2,7*(H/8));
    stand.setScale(.75);
    this.wheel = this.add.sprite(0,0,'wheel');
    this.wheel.setPosition(W/2,H/2);
    this.wheel.setScale(.35);
    let arrow = this.add.sprite(0,0,'arrow');
    arrow.setPosition(W/2,2*(H/11));
    arrow.setScale(.20);
    
    
    this.input.on("pointerdown",spinwheel,this);
    
    font_style = {
        font : "bold 30px Roboto",
        color : "red",
        align : "center",
    }
    this.game_text = this.add.text(10,10,"Welcome to Spin & Win",font_style);
}
function update(){
   // this.wheel.angle +=1;
   
//    this.wheel.alpha +=1;
}
function spinwheel(){
    console.log("keju boi heavy");
    this.game_text.setText("You clicked the mouse");
    
    let rounds = Phaser.Math.Between(2,5);
    let degree = Phaser.Math.Between(0,8);
    let total = rounds*360 + degree*45+22;
    
    
    tween = this.tweens.add({
        targets : this.wheel,
        angle : total,
        ease : "Cubic.easeOut",
        duration : 3000,
        callbackScope:this,
        onComplete : function(){
            this.game_text.setText("You Won");
        }
    });
}
