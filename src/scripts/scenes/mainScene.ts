import ExampleObject from '../objects/exampleObject';
import Sheep from '../objects/sheep';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  private sheep: Sheep;
  sheep1: Phaser.GameObjects.Sprite;
  test: Phaser.GameObjects.Image;
  scoretext: Phaser.GameObjects.Text;
  selectedSheep: Phaser.GameObjects.Group;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    this.sheep = new Sheep(this, 0, 0);
    this.selectedSheep = this.add.group();
    //TODO: remove the adding in here
    this.selectedSheep.add(this.sheep);
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
    //set sheep to be added to a group when left clicked
    /*this.input.on('gameobjectdown', function (pointer, gameObject) {
      console.log("Sheep clicked");
      
      //TODO: fix scoping issue with calling "this"
      //this.onObjectClicked(pointer, gameObject);
    });*/
    this.input.on('gameobjectdown',this.onObjectClicked, this);
    //this.scoretext = this.add.text(20,20, "Crickets: ", {fill:"black"});
    
  }

  update() {
  }

  onObjectClicked(pointer, gameObject : Sheep) {
    //TODO: the scoping error is down here now, gotta figure out how to get it to recognize "this" as the scene
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
}