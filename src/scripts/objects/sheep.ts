export default class Sheep extends Phaser.GameObjects.Sprite {
    isSelected : boolean;
    gridX : integer;
    gridY : integer;
    currentColor : string;

    constructor(scene: Phaser.Scene, x: number, y: number, color : string) {
        super(scene, 30*x+20, 30*y+20, 'sheep');
        scene.add.existing(this);
        this.setInteractive();
        scene.input.setDraggable(this);
        this.isSelected = false;
        this.gridX = x;
        this.gridY = y;
        this.currentColor = color;
        //TODO: make sheep generate a sprite?
        //TODO: give sheep a location in the matrix of sheep
        //TODO: give sheep a color
        //TODO: give sheep an "isSelected" boolean variable
    }
    resetToGrid(){
  
        console.log("Sheep reset");
       this.x = 20+this.gridX*30;
       this.y = 20+this.gridY*30;
        
       
     }
     checkSwap(otherx:integer, othery:integer, othergridx: integer, othergridy:integer){

        if(this.x<27+otherx&& this.x>otherx-27&&this.y>othery-27&&this.y<othery+27){
            if(othergridx!=this.gridX||othergridy!= this.gridY){
                console.log("Overlap!")
                return true;
            }
            
            return false;
            
        }
        return false;
     }
     getgridX(){
        //console.log(this.x);
         return this.gridX;
     }
     getgridY(){
        return this.gridY;
    }
    setgridX(newx : integer){
        this.gridX = newx;
    }
    setgridY(newy : integer){
        this.gridY = newy;
    }
    update(){
        enum sheepColors {
            white = 1,
            brown
          }
        console.log("Resetting sheep");
        this.currentColor = sheepColors[Phaser.Math.Between(1,2)];
        this.isSelected = false;
        if(this.currentColor==="brown"){
            this.play("brown-unselect");
           }
           else {
            this.play("white-unselect");
           }

    }
}
