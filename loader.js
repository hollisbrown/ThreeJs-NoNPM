import { GLTFLoader } from 'GLTFLoader';

const gltfLoader = new GLTFLoader();
const files = ['monke', 'cone'];
const scenes = [];
const animations = [];
let filesLoaded = 0;

export class Loader {

    start(onLoadingFinished) {
        filesLoaded = 0;
        for (let i = 0; i < files.length; i++) {
            let url = "/models/" + files[i] + ".glb";
            
            gltfLoader.load(
                url,
                function (file) {
                    filesLoaded += 1;
                    scenes[i] = file.scene;
                    animations[i] = file.animations;

                    if (filesLoaded == files.length) {
                        onLoadingFinished(scenes, animations);
                    }

                    // file.animations; // Array<THREE.AnimationClip>
                    // file.scene; // THREE.Group
                    // file.scenes; // Array<THREE.Group>
                    // file.cameras; // Array<THREE.Camera>
                    // file.asset; // Object
                },
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                function (error) {
                    console.log(error);
                }
            );
        }
    }


}