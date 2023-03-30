import * as THREE from 'three';

class Tile {
    model;

    constructor(x,y,z, model){
        this.model = model.clone();
        this.model.position.set(x,y,z);
    }

}

export class World {
    game;
    scene = new THREE.Scene();
    sizeX = 16;
    sizeY = 1;
    sizeZ = 16;

    tiles = [];

    constructor(game) {
        this.game = game;
        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.z = 3;
        light.position.y = 2;
        this.scene.add(light);
        this.scene.add(this.game.player.object);

        for (let x = 0; x < this.sizeX; x++) {
            for (let y = 0; y < this.sizeY; y++) {
                for (let z = 0; z < this.sizeZ; z++) {
                    const tile = new Tile(x,y,z, this.game.models[2]);
                    this.scene.add(tile.model);
                    this.tiles.push(tile);
                }
            }
        }
    }
}