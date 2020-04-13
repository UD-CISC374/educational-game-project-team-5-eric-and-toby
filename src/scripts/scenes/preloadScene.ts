export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("brown", "assets/sprites/sheep_brown.png");
    this.load.spritesheet("sheep", "assets/sprites/testsprites.png",{
      frameWidth: 200,
      frameHeight: 200
    });
  }

  create() {
    this.scene.start('MainScene');
  }
}
