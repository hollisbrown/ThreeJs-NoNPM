import { Loader } from 'loader';
import { Game } from 'game';

let startTime = 0;
let currentTime = 0;
let lastTime = 0;
let deltaTime = 0;

const loader = new Loader();
const game = new Game(loader);
loader.start(onLoadingFinished);

function onLoadingFinished(scenes, animations) {
    startTime = Date.now();
    game.start(scenes,animations);
    requestAnimationFrame(loop);
}

function loop() {
    lastTime = currentTime;
    currentTime = Date.now();
    deltaTime = (currentTime - lastTime) * 0.001;
    game.update(deltaTime);
    requestAnimationFrame(loop);
}