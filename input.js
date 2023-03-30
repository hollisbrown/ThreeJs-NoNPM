export class Input{

    isPointerDown = false;
    pointerX = 0;
    pointerY = 0;
    offsetX = 0;
    offsetY = 0;

    constructor(){
        //if you don't .bind(this), the callback function will run in a global context "this" will be "window", not the instance of "Input".
        window.addEventListener("pointerdown", this.onPointerDown.bind(this));
        window.addEventListener("pointermove", this.onPointerMove.bind(this));
        window.addEventListener("pointerup", this.onPointerUp.bind(this));
    }

    onPointerDown(evt){
        this.setPointer(evt.clientX, evt.clientY);
    }

    onPointerMove(evt){
        if(this.isPointerDown){
            this.setPointer(evt.clientX, evt.clientY);
        }
    }

    onPointerUp(evt) {
        this.resetPointer();
    }

    setPointer(x, y) {
        this.isPointerDown = true;
        this.pointerX = x;
        this.pointerY = y;
        this.offsetX = ((x - window.innerWidth / 2) / window.innerWidth) * 2;
        this.offsetY = ((y - window.innerHeight / 2) / window.innerHeight) * 2;
    }
    resetPointer() {
        this.isPointerDown = false;
        this.offsetX = 0;
        this.offsetY = 0;
    }

}