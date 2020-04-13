export default class Sheep extends Phaser.GameObjects.Sprite {

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'sheep');
        scene.add.existing(this);
    }
}
