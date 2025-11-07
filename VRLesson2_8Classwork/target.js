class Target{
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.a = 0; 
        this.da = 0.01;

        this.obj = document.createElement("a-box");
        this.obj.setAttribute("position", {x: this.x, y: this.y, z: 0});
        this.obj.setAttribute("width", radius);
        this.obj.setAttribute("height", radius);
        this.obj.setAttribute("depth", radius);
        this.obj.setAttribute("color", color);
    }

    rotate(){
    this.a += this.da;
    this.obj.object3D.rotation.x = this.a;
  }
}