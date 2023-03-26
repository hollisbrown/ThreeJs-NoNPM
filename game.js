import * as THREE from 'three';
import * as SkeletonUtils from 'SkeletonUtils';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

let mixers = [];

export class Game{
    constructor(){
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        window.addEventListener('resize', this.onResize, false);
    }

    start(scenes, animations) {
        const light = new THREE.PointLight(0xffffff, 1, 100);
        scene.add(light);
        light.position.z = 3;
        light.position.y = 2;
        
        camera.position.y = 10;
        camera.rotateX(-Math.PI / 2);

        this.addMonke(scenes[0], animations[0], -2, 0);
        this.addMonke(scenes[0], animations[0], 2, 1);

        for(let x=0; x<10; x++){
            for(let y=0; y<10; y++){
                this.addTiles(scenes[2], x, y);
            }
        }
    }

    update(deltaTime){
        mixers.forEach(mixer =>{
            mixer.update(deltaTime);
        });

        renderer.render(scene, camera);
    }

    onResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    addMonke(m, c, x, actionId){
        const clips = c;
        const model = SkeletonUtils.clone(m);
        scene.add(model);
        model.position.x = x;

        const mixer = new THREE.AnimationMixer(model);
        mixers.push(mixer);
        const action = mixer.clipAction(clips[actionId]);
        action.play();
    }

    addTiles(m, x, y){
        const model = m.clone();
        scene.add(model);
        model.position.x = x - 5;
        model.position.z = y - 5;
    }
}