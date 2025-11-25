class Car{
    constructor(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.r = 0;
            this.dr = 0.1; // movement speed
            this.moving = false;
            this.obj = document.getElementById("car");
            this.obj = this.obj.cloneNode(true);
            this.obj.setAttribute("position", { x: x, y: y, z: z });
            // this.obj = document.createElement("a-box");
            // this.obj.setAttribute("position", { x: x, y: y, z: z });
            // this.obj.setAttribute("height", "0.5");
            // this.obj.setAttribute("width", "2.25");
            // this.obj.setAttribute("color", "#4CC3D9");
            scene.appendChild(this.obj);

            this.obj.addEventListener("click", () => {
                this.moving = true;
            });
        }

        update() {
            if (this.moving) {
                this.x += this.dr;
                this.obj.setAttribute("position", { x: this.r, y: 0, z: 0 });
        }
    }
}