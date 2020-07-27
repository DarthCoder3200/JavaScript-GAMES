let config = {
    type : Phaser.AUTO,
    scale:{
        mode : Phaser.Scale.FIT,
        width  : 800,
        height : 600,
        
    },
    physics:{
        default : 'arcade',
        arcade :{
            gravity :{
                y : 1500,
            },
            debug : true,
        },
    },
    backgroundColor : 0xffcc00,
    scene:{
        preload : preload,
        create : create,
        update : update,
    }
};

let game = new Phaser.Game(config);

function preload(){
    this.load.image('ground',"Assets/ground.png");
    this.load.image('sky',"Assets/sky.png");
    this.load.image('apple',"Assets/apple.png");
    this.load.spritesheet("dude","Assets/dude.png",
                          {frameWidth:32,frameHeight:42});
    this.load.image('rays',"Assets/rays.png");
}
function create(){
    W = game.config.width;
    H = game.config.height;
    let ground = this.add.tileSprite(0,H-166,W,166,'ground');
    ground.setOrigin(0,0);
    let sky = this.add.tileSprite(0,0,W,H,'sky');
    sky.setOrigin(0,0);
    sky.depth = -1;
    this.player =  this.physics.add.sprite(128,128,"dude",4);
    this.physics.add.existing(ground,true);
    ground.body.allowGravity = false;
  //  ground.body.immovable = true;
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(ground,this.player);
    
    this.rays = this.add.sprite(W/2,H-166,'rays');
    this.rays.alpha = .2;
    this.rays.depth = -1;
    let fruits = this.physics.add.group({
        key:'apple',
        repeat:8,
       // setScale :{x:1,y:1},
        setXY :{x:20,y:0,stepX:100},
    });
    this.player.setBounce(.5);
    fruits.children.iterate(function(f){
        f.setBounce(Phaser.Math.FloatBetween(.3,.7));
        
    });
    this.physics.add.collider(ground,fruits);
    let platforms = this.physics.add.staticGroup();
    platforms.create(600,325,'ground').setScale(1.91,.5).refreshBody();
    this.physics.add.collider(platforms,fruits);
    platforms.add(ground);
    this.physics.add.collider(platforms,this.player);
    
    this.cursors = this.input.keyboard.createCursorKeys();
    //this.physics.add.collider(this.player,fruits);
    //this.physics.add.collider(fruits,fruits);
   
    this.anims.create({
        key : 'left',
        frames : this.anims.generateFrameNumbers('dude',{start:0,end:3}),
        frameRate :21,
        repeat:-1,
    });
    this.anims.create({
        key : 'right',
        frames : this.anims.generateFrameNumbers('dude',{start:5,end:8}),
        frameRate :21,
        repeat:-1,
    });
    this.anims.create({
        key : 'center',
        frames : this.anims.generateFrameNumbers('dude',{start:4,end:4}),
        frameRate :21,
        repeat:-1,
    });
    
    this.physics.add.overlap(this.player,fruits,eatFruits,null,this);
    
    this.cameras.main.setBounds(0,0,W,H);
    this.physics.world.setBounds(0,0,W,H);
    this.cameras.main.startFollow(this.player,true,true);
    this.cameras.main.setZoom(1.5);
}
function update(){
    this.rays.angle +=.1;
    if(this.cursors.left.isDown){
        this.player.anims.play('left',true);
        this.player.setVelocityX(-150);
       // this.player.anims.play('left');
    }
    else if (this.cursors.right.isDown){
        this.player.anims.play('right',true);
        this.player.setVelocity(150);
    }
    else {
        this.player.anims.play('center',true);
        this.player.setVelocityX(0);
    }
    if(this.cursors.up.isDown && this.player.body.touching.down){
        this.player.setVelocityY(-700);
    }
}
function eatFruits(player,fruit){
    fruit.disableBody(true,true);
}