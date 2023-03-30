import * as THREE from 'three';
import * as SkeletonUtils from 'SkeletonUtils';
import { Input } from 'input';
import { Ui } from 'ui';
import { Player } from 'player';
import { Camera } from 'camera';
import { World } from 'world'

export class Game {
    renderer = new THREE.WebGLRenderer();
    camera = new Camera();
    input = new Input();
    ui = new Ui(this);
    player = new Player(this);
    world;
    models = [];
    animations = [];

    constructor(scenes, animations) {
        this.models = scenes;
        this.animations = animations;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.world = new World(this);

        window.addEventListener('resize', this.resize.bind(this));
        this.resize();
    }

    update(deltaTime) {
        //this.ui.update(deltaTime);
        this.player.update(deltaTime);
        this.renderer.render(this.world.scene, this.camera.object);
    }

    resize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.resize();
    }


    // addMonke(m, c, x, actionId) {
    //     const clips = c;
    //     const model = SkeletonUtils.clone(m);
    //     model.position.y = 1;
    //     this.scene.add(model);
    //     model.position.x = x;

    //     const mixer = new THREE.AnimationMixer(model);
    //     this.mixers.push(mixer);
    //     const action = mixer.clipAction(clips[actionId]);
    //     action.play();
    // }
}