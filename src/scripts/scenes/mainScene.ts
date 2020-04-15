import ExampleObject from '../objects/exampleObject';
import Sheep from '../objects/sheep';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  test: Phaser.GameObjects.Image;
  scoretext: Phaser.GameObjects.Text;
  selectedSheep: Phaser.GameObjects.Group;
  totalSheep: Phaser.GameObjects.Group;
  sheep: Sheep;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    enum sheepColors {
      Blue = 1,
      Red,
      Brown
    }
    this.selectedSheep = this.add.group();
    this.totalSheep = this.add.group();
    for (let i = 0;  i < 10; i++ ) {
      let x = Phaser.Math.Between(0,300);
      let y = Phaser.Math.Between(0,300);
      let color = sheepColors[Phaser.Math.Between(1,3)];
      let sheep = new Sheep(this, x, y, color)
      this.totalSheep.add(sheep);
    }
    this.input.mouse.disableContextMenu();
    Phaser.Actions.GridAlign(this.totalSheep.getChildren(), {
        width: 4,
        height: 3,
        cellWidth: 100,
        cellHeight: 100,
        x: 100,
        y: 100
    });
    
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
    
  }

  update() {
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