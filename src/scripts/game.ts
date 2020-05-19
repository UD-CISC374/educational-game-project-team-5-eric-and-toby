import 'phaser';
import MainScene from './scenes/mainScene';
import PreloadScene from './scenes/preloadScene';
import EndScene from './scenes/endScene';
import IntroScene from './scenes/introScene';
import TutorialScene from './scenes/tutorialScene';
import GameConfig = Phaser.Types.Core.GameConfig;

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;


const config: GameConfig = {
    backgroundColor: '#4A274F',
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    scene: [PreloadScene, MainScene, EndScene, IntroScene, TutorialScene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
    render: {
        pixelArt: true
     }
};

window.addEventListener('load', () => {
    window['game'] = new Phaser.Game(config);
});

//
