import * as THREE from 'three';

export class Camera {
    object = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 50);
    pivot = new THREE.Object3D();

    constructor(){
        this.object.position.z = 10;
        this.pivot.add(this.object);
        this.pivot.rotateY(Math.PI / 4);
        this.pivot.rotateX(-Math.PI / 4);
    }

    resize(){
        this.object.left = window.innerWidth / - 2;
        this.object.right = window.innerWidth / 2;
        this.object.top = window.innerHeight / 2;
        this.object.bottom = window.innerHeight / - 2;
        this.object.zoom = 80;
        this.object.updateProjectionMatrix();
    }
}