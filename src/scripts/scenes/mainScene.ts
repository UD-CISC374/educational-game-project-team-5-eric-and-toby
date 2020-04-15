import ExampleObject from '../objects/exampleObject';
import Sheep from '../objects/sheep';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  private sheep: Sheep;
  sheep1: Sheep;
  test: Phaser.GameObjects.Image;
  scoretext: Phaser.GameObjects.Text;
  selectedSheep: Phaser.GameObjects.Group;
  timedEvent: Phaser.Time.TimerEvent;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.sheep = new Sheep(this, 0, 0, "white");
    this.sheep1 = new Sheep(this, 1, 1, "brown");
    this.selectedSheep = this.add.group();
    this.input.mouse.disableContextMenu();
    if(this.selectedSheep.children.contains(this.sheep)) {
      console.log("Sheep in group");
    }

    //this.test = this.add.image(10,10,"brown");
    //this.sheep1 = this.add.sprite(0, 0, "sheep");
    //this.sheep1.setInteractive();
    //this.selectedSheep.add(this.test);
    //this.input.setDraggable(this.sheep1);
    //TODO: make sheep objects match with sprites
    //TODO: make list of all selected sheep
    //this.sheep1.input.draggable;
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

      gameObject.x = dragX;
      gameObject.y = dragY;


  });
    // the last this here passes in the correct scope
    this.input.on('gameobjectdown',this.onObjectClicked, this);
    this.scoretext = this.add.text(20,20, "Crickets: ", {fill:"black"});
    this.timedEvent = this.time.addEvent({ delay: 1000, callback: ()=>{
      // reset sheep
      this.checkOverlap(this.sheep1, this.sheep);
  }, callbackScope: this, loop: true });
    this.timedEvent = this.time.addEvent({ delay: 1000, callback: ()=>{
      // reset sheep
      this.resetToGrid(this.sheep1);
      this.resetToGrid(this.sheep);
  }, callbackScope: this, loop: true });
 
    
  this.anims.create({
    key: "brown-unselect",
    frames: this.anims.generateFrameNumbers("sheep", {
      start: 0,
      end: 0
    }),
    frameRate: 20,
    repeat: -1
  });
  this.anims.create({
    key: "white-unselect",
    frames: this.anims.generateFrameNumbers("sheep", {
      start: 2,
      end: 2
    }),
    frameRate: 20,
    repeat: -1
  });
  this.anims.create({
    key: "brown-select",
    frames: this.anims.generateFrameNumbers("sheep", {
      start: 1,
      end: 1
    }),
    frameRate: 20,
    repeat: -1
  });
  this.anims.create({
    key: "white-select",
    frames: this.anims.generateFrameNumbers("sheep", {
      start: 3,
      end: 3
    }),
    frameRate: 20,
    repeat: -1
  });

  //this.sheep.play("white-unselect");
  }

  update() {



    //TODO: swap sheep
    /*if (this.checkOverlap(this.sheep, this.sheep1))
    {
        this.scoretext.text = 'Drag the sprites. Overlapping: true';
       
    }
    else
    {
        this.scoretext.text = 'Drag the sprites. Overlapping: false';
    }*/
    //this.resetToGrid(this.sheep1);
    //this.scoretext.setText('Event.progress: ' + this.timedEvent.getProgress().toString().substr(0, 4) + '\nEvent.repeatCount: ' + this.timedEvent.repeatCount);
  }
  /*
  onObjectClicked:upon left clicking a sheep, add it 
  to the group of selected sheep
  upon right click, check and see if the fraction is
  met, and remove the sheep
  Params: 
  pointer (the mouse pointer)
  gameObject : Sheep (the game object selected, has to be a sheep)
  
  */
 checkOverlap(spriteA : Sheep, spriteB : Sheep) {

  let boundsA = spriteA.getBounds();
  let boundsB = spriteB.getBounds();
  if(Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB)){
    let tempx = this.sheep.gridX;
    let tempy = this.sheep.gridY;
    let temx = this.sheep1.gridX;
    let temy = this.sheep1.gridY;
    this.sheep.gridX = temx;
    this.sheep.gridY = temy;
    this.sheep1.gridX = tempx;
    this.sheep1.gridY = tempy;
  }

  return Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB);

}
 resetToGrid(gameObject : Sheep){
  
    console.log("Sheep reset");
   gameObject.x = gameObject.gridX*105;
   gameObject.y = gameObject.gridY*105;
    
   
 }

 sheepChooseSprite(gameObject : Sheep){
   let color : string = gameObject.currentColor;
   if(color==="brown"&&gameObject.isSelected){
    gameObject.play("brown-select");
   }
   else if(color==="brown"&&!gameObject.isSelected){
    gameObject.play("brown-unselect");
   }
   else if(color==="white"&&gameObject.isSelected){
    gameObject.play("white-select");
  }
  else if(color==="white"&&!gameObject.isSelected){
    gameObject.play("white-unselect");
  }
 }

  onObjectClicked(pointer, gameObject : Sheep) {
    if (pointer.rightButtonDown()) {
      this.selectedSheep.clear(true);
    }
    else {
      if(this.selectedSheep.children.contains(gameObject)) {
        // sheep is already in the group
        this.selectedSheep.remove(gameObject);
        gameObject.isSelected = false;
        this.sheepChooseSprite(gameObject);
        console.log("Removed to selected group");
     }
     else{
       //add sheep to group
        console.log("Added to selected group");
        this.selectedSheep.add(gameObject);
        gameObject.isSelected = true;
        this.sheepChooseSprite(gameObject);
     }
    }
   console.log(this.selectedSheep.getChildren());
  }
}