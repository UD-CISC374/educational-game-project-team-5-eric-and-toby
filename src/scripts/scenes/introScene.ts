export default class IntroScene extends Phaser.Scene {
    //private exampleObject: ExampleObject;
    text: Phaser.GameObjects.Text;
    background: Phaser.GameObjects.TileSprite;
    button: Phaser.Physics.Arcade.Sprite;
    button1: Phaser.Physics.Arcade.Sprite;
  
    constructor() {
      super({ key: 'IntroScene' });
    }
  
    preload(){
        
      //this.load.image("background", "assets/spritesheets/lizzybg.png");
      this.load.image("startbutton", "assets/sprites/startbutton.png");
      this.load.image("tutbutton", "assets/sprites/tutbutton.png");
    }
   
    create() {
        console.log("New scene");
      this.text = this.add.text(20,20, "Woolgathering", {fill:"white"});
      //this.background = this.add.tileSprite(0, 0, 400,400, "background");
      this.load.spritesheet("startbutton", "assets/sprites/startbutton.png",{
        frameWidth: 32,
        frameHeight: 16
      });
      this.load.spritesheet("tutbutton", "assets/sprites/tutbutton.png",{
        frameWidth: 32,
        frameHeight: 16
      });
      //this.scene.start("TobyScene");
      this.button = this.physics.add.sprite(400 / 2 - 50, 400 / 2, "startbutton");
      this.button.setInteractive();
      this.button.setImmovable(true);
      this.button.setGravity(0,0);
      
      this.button1 = this.physics.add.sprite(400 / 2 , 400 / 2, "tutbutton");
      this.button1.setInteractive();
      this.button1.setImmovable(true);
      this.button1.setGravity(0,0);

      //this.input.on('gameobjectdown', this.restart, this);
      this.button.on('pointerdown', this.restart, this);
      this.button1.on('pointerdown', this.startTutorial, this);
    
    }
    restart(){
      this.scene.start("MainScene");
    }

    startTutorial(){
        this.scene.start("TutorialScene");
    }
  
    update() {
    }
  }