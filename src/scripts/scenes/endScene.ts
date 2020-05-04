export default class EndScene extends Phaser.Scene {
    //private exampleObject: ExampleObject;
    text: Phaser.GameObjects.Text;
    background: Phaser.GameObjects.TileSprite;
    button: Phaser.Physics.Arcade.Sprite;
  
    constructor() {
      super({ key: 'EndScene' });
    }
  
    preload(){
        
      //this.load.image("background", "assets/spritesheets/lizzybg.png");
      this.load.image("button", "assets/sprites/button.png");
    }
   
    create() {
        console.log("New scene");
      this.text = this.add.text(20,20, "Game over. Play again?", {fill:"white"});
      //this.background = this.add.tileSprite(0, 0, 400,400, "background");
      this.load.spritesheet("button", "assets/sprites/button.png",{
        frameWidth: 32,
        frameHeight: 16
      });
      //this.scene.start("TobyScene");
      this.button = this.physics.add.sprite(400 / 2 - 50, 400 / 2, "button");
      this.button.setInteractive();
      this.button.setImmovable(true);
      this.button.setGravity(0,0);
      
      this.input.on('gameobjectdown', this.restart, this);
    
    }
    restart(){
      this.scene.start("IntroScene");
    }
  
    update() {
    }
  }