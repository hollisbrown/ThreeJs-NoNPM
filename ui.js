import * as THREE from 'three';

export class Ui{
    game;
    camera;
    canvas;
    ctx;

    buttons = [];
    positionWorld = new THREE.Vector3();
    positionScreen = new THREE.Vector2();
    positionPointer = new THREE.Vector2();
    raycaster = new THREE.Raycaster();

    isHovered = false;

    constructor(game){
        window.addEventListener('resize', this.resize.bind(this));

        this.game = game;
        this.camera = game.camera.object;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.position = "absolute";

        for (let i=0; i<49; i++){
            let button = document.createElement("button");
            button.style = "position:absolute; width:40px; height:40px; border-radius:20px; opacity:0.5;";
            this.buttons[i] = button;
            document.body.appendChild(button);
            // button.addEventListener("pointerover", this.onPointerOver.bind(this));
            // button.addEventListener("pointerout", this.onPointerOut.bind(this));

        }
    }

    // onPointerOver(evt){
    //     this.isHovered = true;
    // }

    // onPointerOut(evt) {
    //     this.isHovered = false;
    // }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    update(deltaTime){

        for(let i=0; i<this.buttons.length; i++){
            let x = Math.floor(i/7) + Math.floor(this.game.player.position.x) - 3;
            let z = i % 7 + Math.floor(this.game.player.position.z) - 3;
            let posWorld = new THREE.Vector3(x, 0, z);
            let posScreen = this.getScreenPosition(posWorld);
            let screenX = posScreen.x - 20;
            let screenY = posScreen.y - 20;
            this.buttons[i].style.left = screenX + "px";
            this.buttons[i].style.top = screenY + "px";
        }

    }

    getScreenPosition(pos) {
        this.positionWorld.copy(pos);
        this.positionWorld.project(this.camera);
        this.positionScreen.x = ((this.positionWorld.x + 1) / 2) * window.innerWidth;
        this.positionScreen.y = window.innerHeight - (((this.positionWorld.y + 1) / 2) * window.innerHeight);
        return this.positionScreen;
    }

    // getWorldPosition(x,y) {
    //     this.positionPointer.x = x;
    //     this.positionPointer.y = y;
    //     this.raycaster.setFromCamera(this.positionPointer, this.camera);
    //     const intersects = this.raycaster.intersectObjects(this.game.colliders, true);

    //     if (intersects.length > 0) {
    //         return intersects[0].object.userData.id;
    //     }
    //     return -1;
    // }
}