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
    this.sheep = new Sheep(this, 0, 0);
    this.sheep1 = new Sheep(this, 1, 1);
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
    this.timedEvent = this.time.addEvent({ delay: 2000, callback: ()=>{
      // reset sheep
      this.resetToGrid(this.sheep1);
  }, callbackScope: this, loop: true });
    
  }

  update() {
    //TODO: update all sheep positions
    
    //this.resetToGrid(this.sheep1);
    this.scoretext.setText('Event.progress: ' + this.timedEvent.getProgress().toString().substr(0, 4) + '\nEvent.repeatCount: ' + this.timedEvent.repeatCount);
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
 resetToGrid(gameObject : Sheep){
  
    console.log("Sheep reset");
   gameObject.x = gameObject.gridX*105;
   gameObject.y = gameObject.gridY*105;
    
   
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
        console.log("Removed to selected group");
     }
     else{
       //add sheep to group
        console.log("Added to selected group");
        this.selectedSheep.add(gameObject);
        gameObject.isSelected = true;
     }
    }
   console.log(this.selectedSheep.getChildren());
  }
}