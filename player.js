import * as THREE from 'three';
import { Input } from 'input';

export class Player{
    object = new THREE.Object3D();
    input;

    position = new THREE.Vector3(0,0,0);
    offset = new THREE.Vector3();
    offsetInput = new THREE.Vector2();
    angleInput = new THREE.Euler(0, Math.PI / 4, 0, 'XYZ');
    isMoving = false;
    speed = 5;

    constructor(game){
        this.input = game.input;
        const geometry = new THREE.BoxGeometry(.5, 1, .5);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.y = 0.5
        this.object.add(cube);
        this.object.add(game.camera.pivot);
    }

    update(deltaTime){
        if (Math.abs(this.input.offsetX) > 0.05 || Math.abs(this.input.offsetY) > 0.05) {
            this.isMoving = true;
            this.offsetInput.x = this.input.offsetX;
            this.offsetInput.y = this.input.offsetY;
            this.offsetInput.normalize();

            this.offset.x = this.offsetInput.x * deltaTime * this.speed;
            this.offset.z = this.offsetInput.y * deltaTime * this.speed;
            this.offset.applyEuler(this.angleInput);

            this.position.add(this.offset);
            this.object.position.copy(this.position);
        } else {
            this.isMoving = false;
        }
    }
}