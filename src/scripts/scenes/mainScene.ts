import ExampleObject from '../objects/exampleObject';
import Sheep from '../objects/sheep';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  private sheep: Sheep;
  sheep1: Sheep;
  test: Phaser.GameObjects.Image;
  fractionText: Phaser.GameObjects.Text;
  numeratorText: Phaser.GameObjects.Text;
  denominatorText: Phaser.GameObjects.Text;
  selectedSheep: Phaser.GameObjects.Group;
  timedEvent: Phaser.Time.TimerEvent;
  allSheep: Array<Sheep>;
  someSheep: Array<Sheep>;
  numerator: Number;
  denominator: Number;
  lineText: Phaser.GameObjects.Text;
  selectedBrown: integer;
  selectedWhite: integer;
  explanationText: Phaser.GameObjects.Text;


  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    enum sheepColors {
      white = 1,
      brown
    }
    //this.allSheep = this.add.group();
    //this.allSheep.type = "Sheep";
    this.allSheep = new Array<Sheep>();
    //this.someSheep = new Array<Sheep>();
    this.selectedBrown = 0;
    this.selectedWhite = 0;
    for(let i = 0; i<5;i++){
      for(let j = 0; j<7;j++){
        //TODO: randomize color
        let color = sheepColors[Phaser.Math.Between(1,2)];
        let sheepy = new Sheep(this, i, j, color);
        this.sheepChooseSprite(sheepy);
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
    this.fractionText = this.add.text(200,20, "Fraction:", {fill:"black"});
    this.numeratorText = this.add.text(200,35, "1", {fill:"white"});
    this.lineText = this.add.text(200,45, "--", {fill:"black"});
    this.denominatorText = this.add.text(200,55, "1", {fill:"black"});
    this.explanationText = this.add.text(50, 220, 
      "INSTRUCTIONS: Left-click to select\n and deselect squares\n"+
      "Left-click and drag to move square\n to different position in grid\n"+
      "Right click to\n remove selected squares\n"+
      "Removal of selection only works\n if selection matches fraction \n"+
      "New fraction generated and\n squares regenerated after removal\n"
      , {fill:"black"});
    this.generateFraction(sheepColors[Phaser.Math.Between(1, 2)]);
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
        this.sheepChooseSprite(this.allSheep[i]);
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
 checkOverlap(this: MainScene, spriteA : Sheep, spriteB : Sheep) {

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
    enum sheepColors {
      white = 1,
      brown
    }
    if (pointer.rightButtonDown()) {
      //check to see if group matches fraction
      //reshuffle selectedSheep
      if((this.selectedWhite==parseInt(this.numeratorText.text)||
      this.selectedBrown==parseInt(this.numeratorText.text))&&
      this.selectedSheep.getChildren().length==parseInt(this.denominatorText.text)){
        for (let i = 0; i < this.selectedSheep.getChildren().length; i++) {
          let sheepz :Sheep;
          let sheepy = this.selectedSheep.getChildren()[i];
          sheepy.update();
          
          //beam.update();
        }
  
        this.generateFraction(sheepColors[Phaser.Math.Between(1,2)]);
        this.selectedSheep.clear();
        this.selectedBrown = 0;
        this.selectedWhite = 0;
      }
    }
    else {
      if(this.selectedSheep.children.contains(gameObject)) {
        // sheep is already in the group
        if(gameObject.currentColor === "brown"){
          this.selectedBrown--;
        }
        else if(gameObject.currentColor === "white"){
          this.selectedWhite--;
        }
        this.selectedSheep.remove(gameObject);
        gameObject.isSelected = false;
        this.sheepChooseSprite(gameObject);
        console.log("Removed to selected group");
     }
     else{
       //add sheep to group
       if(gameObject.currentColor === "brown"){
        this.selectedBrown++;
      }
      else if(gameObject.currentColor === "white"){
        this.selectedWhite++;
      }
        console.log("Added to selected group");
        this.selectedSheep.add(gameObject);
        gameObject.isSelected = true;
        this.sheepChooseSprite(gameObject);
     }
    }
   console.log(this.selectedSheep.getChildren());
  }
  generateFraction(selectedColor: string) {
    let colorCounter = 0;
    for(let i = 0; i<5;i++){
      for(let j = 0; j<7;j++){
        if (this.allSheep[i].currentColor === selectedColor) {
          colorCounter++;
        }
      }
    }
    this.numeratorText.setText(Phaser.Math.Between(1,colorCounter).toString() +" "+ selectedColor+" sheep");
    this.numeratorText.setColor(selectedColor);
    this.denominatorText.setText(Phaser.Math.Between(colorCounter, this.allSheep.length).toString()+ " total sheep");
  }
}