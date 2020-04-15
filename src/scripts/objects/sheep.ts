export default class Sheep extends Phaser.GameObjects.Sprite {
    isSelected : boolean;
    gridX : integer;
    gridY : integer;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, 105*x, 105*y, 'sheep');
        scene.add.existing(this);
        this.setInteractive();
        scene.input.setDraggable(this);
        this.isSelected = false;
        this.gridX = x;
        this.gridY = y;
        //TODO: make sheep generate a sprite?
        //TODO: give sheep a location in the matrix of sheep
        //TODO: give sheep a color
        //TODO: give sheep an "isSelected" boolean variable
    }
}
