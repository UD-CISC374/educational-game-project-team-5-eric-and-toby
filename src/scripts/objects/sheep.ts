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
}
