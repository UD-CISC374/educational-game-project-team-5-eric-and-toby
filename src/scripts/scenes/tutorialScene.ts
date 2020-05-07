export default class TutorialScene extends Phaser.Scene {
    //private exampleObject: ExampleObject;
    text: Phaser.GameObjects.Text;
    background: Phaser.GameObjects.TileSprite;
    button: Phaser.Physics.Arcade.Sprite;
    button1: Phaser.Physics.Arcade.Sprite;
    startbutton: Phaser.Physics.Arcade.Sprite;
    counter: number;
    tuts: Phaser.Physics.Arcade.Sprite;
  
    constructor() {
      super({ key: 'TutorialScene' });
    }
  
    preload(){
        
      //this.load.image("background", "assets/spritesheets/lizzybg.png");
      this.load.image("startbutton", "assets/sprites/startbutton.png");
      this.load.image("fbutton", "assets/sprites/forwardbutton.png");
      this.load.image("bbutton", "assets/sprites/backbutton.png");
      this.load.image("tut0", "assets/sprites/tut0.png");
      this.load.image("tut1", "assets/sprites/tut1.png");
      this.load.image("tut2", "assets/sprites/tut2.png");
      this.load.image("tut3", "assets/sprites/tut3.png");
    }
   
    create() {
        this.counter = 0;
        console.log("New scene");
      this.text = this.add.text(20,20, "Tutorial", {fill:"white"});
      //this.background = this.add.tileSprite(0, 0, 400,400, "background");
      this.load.spritesheet("startbutton", "assets/sprites/startbutton.png",{
        frameWidth: 32,
        frameHeight: 16
      });
      this.load.spritesheet("bbutton", "assets/sprites/backbutton.png",{
        frameWidth: 32,
        frameHeight: 16
      });
      this.load.spritesheet("fbutton", "assets/sprites/forwardbutton.png",{
        frameWidth: 32,
        frameHeight: 16
      });
      this.load.spritesheet("tutsprite", "assets/sprites/tutsprite.png",{
        frameWidth: 300,
        frameHeight: 200
      });

       this.anims.create({
        key: "tut0",
        frames: this.anims.generateFrameNumbers("tutsprite", {
          start: 0,
          end: 0
        }),
        frameRate: 20,
        repeat: -1
      });
      this.anims.create({
        key: "tut1",
        frames: this.anims.generateFrameNumbers("tutsprite", {
          start: 1,
          end: 1
        }),
        frameRate: 20,
        repeat: -1
      });
      this.anims.create({
        key: "tut2",
        frames: this.anims.generateFrameNumbers("tutsprite", {
          start: 2,
          end: 2
        }),
        frameRate: 20,
        repeat: -1
      });
      this.anims.create({
        key: "tut3",
        frames: this.anims.generateFrameNumbers("tutsprite", {
          start: 3,
          end: 3
        }),
        frameRate: 20,
        repeat: -1
      }); 
      
      //this.scene.start("TobyScene");
      this.startbutton = this.physics.add.sprite(400 / 2 - 50, 350, "startbutton");
      this.startbutton.setInteractive();
      this.startbutton.setImmovable(true);
      this.startbutton.setGravity(0,0);
      this.button = this.physics.add.sprite(400 / 2 , 300, "fbutton");
      this.button.setInteractive();
      this.button.setImmovable(true);
      this.button.setGravity(0,0);
      
      this.button1 = this.physics.add.sprite(400 / 2- 50 , 300, "bbutton");
      this.button1.setInteractive();
      this.button1.setImmovable(true);
      this.button1.setGravity(0,0);

     // this.tuts = this.physics.add.sprite(250,50,"tutsprite");
      //this.tuts.play("tut0");

      //this.input.on('gameobjectdown', this.restart, this);
      this.button.on('pointerdown', this.forward, this);
      this.button1.on('pointerdown', this.back, this);
      this.startbutton.on('pointerdown', this.reload, this);

      this.tuts = this.physics.add.sprite(200, 100, "tut0");
    
    }
    back(){
      //this.scene.start("MainScene");
      if(this.counter>0){
          this.counter--;
      }
    }

    forward(){
        //this.scene.start("TutorialScene");
        if(this.counter<4){
            this.counter++;
        }
    }
    reload(){
        this.scene.start("MainScene");
      }
  
    update() {
        //Set tutorial image to match counter
        this.text.setText(this.counter.toString());
        if(this.counter==0){
            //this.tuts.setFrame(0);
            this.tuts.setTexture("tut0");
        }
        if(this.counter==1){
            //this.tuts.setFrame(1);
            this.tuts.setTexture("tut1");
        }
        if(this.counter==2){
            this.tuts.setTexture("tut2");
        }
        if(this.counter==3){
            this.tuts.setTexture("tut3");
        }

    }
  }