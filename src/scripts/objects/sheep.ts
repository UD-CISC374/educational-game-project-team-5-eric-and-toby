export default class Sheep extends Phaser.GameObjects.Sprite {
    isSelected : boolean;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'sheep');
        scene.add.existing(this);
        this.setInteractive();
        scene.input.setDraggable(this);
        this.isSelected = false;
        //TODO: make sheep generate a sprite?
        //TODO: give sheep a location in the matrix of sheep
        //TODO: give sheep a color
        //TODO: give sheep an "isSelected" boolean variable
    }
}
