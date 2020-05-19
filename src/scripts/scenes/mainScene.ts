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
  timerText: Phaser.GameObjects.Text;
  gameTimer: Phaser.Time.TimerEvent;
  initialTime: number;
  scoreText: Phaser.GameObjects.Text;
  currentMultiplier: integer;
  score: integer;
  correctStreak: Phaser.GameObjects.Text;
  totalSheep: Phaser.GameObjects.Group;


  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    enum sheepColors {
      white = 1,
      brown
    }
    for(let i = 0; i<5;i++){
      for(let j = 0; j<7;j++){
        //TODO: randomize color
        //this.add.image(30*i, 30*j, "grass");
        this.add.image(30*i+20, 30*j+20, "grass");
        
        
      }
    }
    this.allSheep = new Array<Sheep>();
    this.selectedBrown = 0;
    this.selectedWhite = 0;
    for(let i = 0; i<5;i++){
      for(let j = 0; j<7;j++){
        //TODO: randomize color
        //this.add.image(30*i+20, 30*j+20, "grass");
        let color = sheepColors[Phaser.Math.Between(1,2)];
        let sheepy = new Sheep(this, i, j, color);
        this.sheepChooseSprite(sheepy);
        console.log("Sheepy is "+sheepy.type);
        console.log("Sheepy has "+sheepy.gridX);
        this.allSheep.push(sheepy);
        
      }
    }
    console.log("Sheep total is "+ this.allSheep.length);
    console.log("First sheep is "+this.allSheep[0].gridX);
    
    this.selectedSheep = this.add.group();
    this.totalSheep = this.add.group();
    for (let i = 0;  i < 10; i++ ) {
      let x = Phaser.Math.Between(0,300);
      let y = Phaser.Math.Between(0,300);
      let color = sheepColors[Phaser.Math.Between(1,3)];
      let sheep = new Sheep(this, x, y, color)
      this.totalSheep.add(sheep);
    }
  //   this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
  //     gameObject.x = dragX;
  //     gameObject.y = dragY;
  // });
    // the last this here passes in the correct scope
    this.input.on('gameobjectdown',this.onObjectClicked, this);
    this.fractionText = this.add.text(200,20, "Fraction:", {fill:"white"});
    this.numeratorText = this.add.text(200,35, "1", {fill:"white"});
    this.lineText = this.add.text(200,45, "--", {fill:"white"});
    this.denominatorText = this.add.text(200,55, "1", {fill:"white"});
    this.scoreText = this.add.text(200, 65, "Score: 0", {fill:"white"});
    this.correctStreak = this.add.text(200, 75, "Correct Streak: 0", {fill:"white"})
    this.explanationText = this.add.text(50, 220, 
      "INSTRUCTIONS: Left-click to select\n and deselect sheep\n"+
      "Right click to\n heard selected sheep when they are \n in the correct fraction\n"+
      "Correct fractions will add time \n to the timer, incorrect ones will \n remove time from the timer, \n so be accurate and fast!\n"+
      "New fraction generated and\n sheep regenerated after removal\n"
      , {fill:"white"});
    this.generateFraction(sheepColors[Phaser.Math.Between(1, 2)]);
    this.initialTime = 60;
    this.timerText = this.add.text(200, 0, "Time Remaining: " + this.formatTime(this.initialTime), {fill:"white"});
    this.currentMultiplier = 0;
    this.score = 0;
    this.gameTimer = this.time.addEvent({delay: 1000, callback: this.onTimerOut, callbackScope: this, loop: true});
    this.timedEvent = this.time.addEvent({ delay: 1000, callback: ()=>{
      // reset sheep
      for(let i = 0; i<this.allSheep.length; i++){
        for(let j = 0; j<this.allSheep.length; j++){
          console.log("Overlap called");
          let swap = this.allSheep[j].checkSwap(this.allSheep[i].x, this.allSheep[i].y, this.allSheep[i].getgridX(), this.allSheep[i].getgridY());
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
         
        }
        
      
      }
    
  }, callbackScope: this, loop: true });
    this.timedEvent = this.time.addEvent({ delay: 2000, callback: ()=>{
      console.log("Reset function called");
      for(let i = 0; i<this.allSheep.length; i++){
        this.allSheep[i].resetToGrid();
        this.sheepChooseSprite(this.allSheep[i]);
      }
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
  }
  

  update() {

  }
    


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
        this.initialTime += 20;
        this.currentMultiplier = this.currentMultiplier + 1;
        this.score = this.score + (200 * this.currentMultiplier);
        this.scoreText.setText('Score: ' + this.score.toString());
        this.correctStreak.setText('Correct Streak: '+ this.currentMultiplier.toString());
        this.selectedBrown = 0;
        this.selectedWhite = 0;
      }
      else{
        this.currentMultiplier = 1;
        this.correctStreak.setText('Correct Streak: '+ this.currentMultiplier.toString());
        this.initialTime -= 5;
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
       else {
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
    let otherColorCounter = 0;
    for(let i = 0; i<5;i++){
      for(let j = 0; j<7;j++){
        if (this.allSheep[i].currentColor === selectedColor) {
          colorCounter++;
        }
        else{
          otherColorCounter++;
        }
      }
    }
    colorCounter = colorCounter/3;
    otherColorCounter = otherColorCounter/3;
    this.numeratorText.setText(Phaser.Math.Between(1,colorCounter).toString() +" "+ selectedColor+" sheep");
    this.numeratorText.setColor(selectedColor);
    this.denominatorText.setText(Phaser.Math.Between(colorCounter, colorCounter+otherColorCounter)+ " total sheep");
  }
  formatTime(currentTime: number) {
    let minute = Math.floor(currentTime/60);
    let seconds = currentTime%60;
    return `${minute}:${seconds}`;

  }
  onTimerOut () {
    this.initialTime -= 1;
    this.timerText.setText('Countdown: ' + this.formatTime(this.initialTime));
    if (this.initialTime <= 0) {
      this.scene.start('EndScene', {score: this.score});
    }
    
  }
}