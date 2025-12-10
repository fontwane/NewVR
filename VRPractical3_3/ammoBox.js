class ammoBox() {
    constructor(x, y, z) {
        this.ammoBox = document.createElement("a-box");
        this.ammoBox.setAttribute("position", { x: x, y: y, z: z });
        this.ammoBox.setAttribute("color", "yellow");
        this.ammoBox.setAttribute("depth", 1);  // Box depth
        this.ammoBox.setAttribute("height", 1); // Box height
        this.ammoBox.setAttribute("width", 1);  
        scene.appendChild(this.ammoBox);
    } // Box geometry
}