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
  allSheep: Array<Sheep>;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    //this.allSheep = this.add.group();
    //this.allSheep.type = "Sheep";
    this.allSheep = new Array<Sheep>();
    
    for(let i = 0; i<5;i++){
      for(let j = 0; j<7;j++){
        //TODO: randomize color
        let sheepy = new Sheep(this, i, j, "white");
        //sheepy.type = "Sheep";
        console.log("Sheepy is "+sheepy.type);
        console.log("Sheepy has "+sheepy.gridX);
        this.allSheep.push(sheepy);
        
      }
    }
    console.log("Sheep total is "+ this.allSheep.length);
    console.log("First sheep is "+this.allSheep[0].gridX);
    
    //this.sheep = new Sheep(this, 0, 0, "white");
    //this.sheep1 = new Sheep(this, 1, 1, "brown");
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
      //TODO: check overlap
      for(let i = 0; i<this.allSheep.length; i++){
        //console.log("Sheep check section");
        //console.log(this.allSheep[i].getgridX());
        //console.log(this.allSheep[i].getgridY());
        for(let j = 0; j<this.allSheep.length; j++){
          //console.log(i+ "     "+ j);
          //console.log(this.allSheep[i].getgridX() +" "+ this.allSheep[i].getgridY()+"|"+ this.allSheep[j].getgridX())
          //console.log(j);
          console.log("Overlap called");
          let swap = this.allSheep[j].checkSwap(this.allSheep[i].x, this.allSheep[i].y, this.allSheep[i].getgridX(), this.allSheep[i].getgridY());
          //let swap = false;
          if(swap){
            let thisx = this.allSheep[j].getgridX();
            let thisy = this.allSheep[j].getgridY();
            let temx = this.allSheep[i].getgridX();
            let temy = this.allSheep[i].getgridY();
            console.log("From "+thisx+", "+thisy +"->" + temx + ", "+temy);
            this.allSheep[i].setgridX(thisx);
            this.allSheep[i].setgridY(thisy);
            this.allSheep[j].setgridX(temx);
            this.allSheep[j].setgridY(temy);
            console.log("Swapped");
          }
          //this.checkOverlap(this.allSheep[i], this.allSheep[j]);
        }
        
        /*for(let j = 0; j<this.allSheep.length-1; j++){
          this.checkOverlap(this.allSheep[i], this.allSheep[j]);
        }*/
      }
      //this.checkOverlap(this.sheep1, this.sheep);
  }, callbackScope: this, loop: true });
    this.timedEvent = this.time.addEvent({ delay: 2000, callback: ()=>{
      console.log("Reset function called");
      //this.allSheep.reset
      for(let i = 0; i<this.allSheep.length; i++){
        this.allSheep[i].resetToGrid();
      }
      // reset sheep
      //this.allSheep.children.each(this.resetToGrid(sheep), this);
      /*Phaser.Actions.Call(this.allSheep.getChildren(), function(sheep){
        sheep.resetToGrid();
        
      }, this);*/
      //this.physics.collide
      //this.resetToGrid(this.sheep1);
      //this.resetToGrid(this.sheep);
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
    // for(let i = 0; i<this.allSheep.length; i++){
    //   //console.log("Sheep check section");
    //   //console.log(this.allSheep[i].getgridX());
    //   //console.log(this.allSheep[i].getgridY());
    //   for(let j = 0; j<this.allSheep.length; j++){
    //     //console.log(i+ "     "+ j);
    //     //console.log(this.allSheep[i].getgridX() +" "+ this.allSheep[i].getgridY()+"|"+ this.allSheep[j].getgridX())
    //     //console.log(j);
    //     console.log("Overlap called");
    //     let swap = this.allSheep[j].checkSwap(this.allSheep[i].x, this.allSheep[i].y, this.allSheep[i].getgridX(), this.allSheep[i].getgridY());
    //     if(swap){
    //       let thisx = this.allSheep[j].getgridX();
          
    //       let thisy = this.allSheep[j].getgridY();
    //       let temx = this.allSheep[i].getgridX();
    //       let temy = this.allSheep[i].getgridY();
    //       console.log("From "+thisx+", "+thisy +"->" + temx + ", "+temy);
    //       this.allSheep[j].setgridX(temx);
    //       this.allSheep[j].setgridY(temy);
    //       this.allSheep[i].setgridX(thisx);
    //       this.allSheep[i].setgridY(thisy);
    //       console.log("Swapped");
    //     }
    //     //this.checkOverlap(this.allSheep[i], this.allSheep[j]);
    //   }
      
    //   /*for(let j = 0; j<this.allSheep.length-1; j++){
    //     this.checkOverlap(this.allSheep[i], this.allSheep[j]);
    //   }*/
    // }


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
    let tempx = this.sheep.getgridX();
    let tempy = this.sheep.getgridY();
    let temx = this.sheep1.getgridX();
    let temy = this.sheep1.getgridY();
    this.sheep.setgridX(temx);
    this.sheep.setgridY(temy);
    this.sheep1.setgridX(tempx);
    this.sheep1.setgridX(tempy);
    console.log("Checked "+tempx+ ", "+tempy+ " against " + temx+", "+temy);
  }

  return Phaser.Geom.Rectangle.Overlaps(boundsA, boundsB);

}
 resetToGrid(gameObject : Sheep){
  
    console.log("Sheep reset");
   gameObject.x = 20+gameObject.gridX*30;
   gameObject.y = 20+gameObject.gridY*30;
    
   
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