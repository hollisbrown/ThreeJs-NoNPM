import { GLTFLoader } from 'GLTFLoader';

export class Loader {
    gltfLoader = new GLTFLoader();
    files = ['monke', 'cone', 'tile'];
    scenes = [];
    animations = [];
    filesLoaded;

    constructor(onLoadingFinished){
        this.filesLoaded = 0;
        for (let i = 0; i < this.files.length; i++) {
            let url = "./models/" + this.files[i] + ".glb";

            this.gltfLoader.load(
                url,
                (file) => {
                    this.filesLoaded += 1;
                    this.scenes[i] = file.scene;
                    this.animations[i] = file.animations;

                    if (this.filesLoaded == this.files.length) {
                        onLoadingFinished(this.scenes, this.animations);
                    }

                    // file.animations; // Array<THREE.AnimationClip>
                    // file.scene; // THREE.Group
                    // file.scenes; // Array<THREE.Group>
                    // file.cameras; // Array<THREE.Camera>
                    // file.asset; // Object
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }
}