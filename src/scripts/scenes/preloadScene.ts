export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image("brown", "assets/sprites/sheep_brown.png");
    this.load.spritesheet("sheep", "assets/sprites/testsprites.png",{
      frameWidth: 25,
      frameHeight: 25
    });
  }

  create() {
    this.scene.start('MainScene');
  }
}
