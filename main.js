import { Loader } from 'loader';
import { Game } from 'game';

console.log("hello");

let loader = new Loader(onLoadingFinished);
let game;

let startTime = 0;
let currentTime = 0;
let lastTime = 0;
let deltaTime = 0;


function onLoadingFinished(scenes, animations) {
    startTime = Date.now();
    game = new Game(scenes, animations);
    requestAnimationFrame(loop);
}

function loop() {
    lastTime = currentTime;
    currentTime = Date.now();
    deltaTime = (currentTime - lastTime) * 0.001;
    game.update(deltaTime);
    requestAnimationFrame(loop);
}


