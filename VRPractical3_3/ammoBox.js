class AmmoBox {
    constructor(x, y, z) {
        this.obj = document.createElement("a-sphere");
        // Use string position to avoid attribute serialization issues
        this.obj.setAttribute("position", `${x} ${y} ${z}`);
        this.obj.setAttribute("color", "white");
        this.obj.setAttribute("depth", 1);
        this.obj.setAttribute("height", 1);
        this.obj.setAttribute("width", 1);
        this.obj.setAttribute("class", "ammo-box");
        // subtle rotation animation to make boxes more visible
        this.obj.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 4000; easing: linear");
        let scene = document.querySelector("a-scene");
        if (scene) scene.appendChild(this.obj);
        // console.log('AmmoBox spawned at', x, y, z);
    }

    remove() {
        if (this.obj && this.obj.parentNode) this.obj.parentNode.removeChild(this.obj);
    }
}

// Expose globally for simple script inclusion
window.AmmoBox = AmmoBox;