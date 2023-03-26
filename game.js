import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

export class Game{
    constructor(loader){
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        this.loader = loader;
    }

    start(scenes, animations) {
        const light = new THREE.PointLight(0xffffff, 1, 100);
        scene.add(light);
        light.position.z = 3;
        light.position.y = 2;
        camera.position.z = 5;

        const geometry = new THREE.BoxGeometry(1, 1, .2);
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        
        scenes.forEach(elem => {
            scene.add(elem);
            elem.position.x
        });
    }

    update(deltaTime){
        renderer.render(scene, camera);
        //console.log(deltaTime);
    }
}