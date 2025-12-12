class Snowflake{
  constructor(x,y,z){
    this.obj = document.createElement("a-sphere");
    this.obj.setAttribute("radius", 0.06);
    this.obj.setAttribute("color", "white");
    this.obj.setAttribute("position", {x:x, y:y, z:z});
    // vertical speed
    this.dy = (Math.random() * 0.03) + 0.01;
    // small horizontal drift
    this.vx = (Math.random() * 2 - 1) * 0.01;
    this.vz = (Math.random() * 2 - 1) * 0.01;
    scene.appendChild(this.obj);
  }

  //Challenge 6: Create a function fall() which decreases y by dy and updates the Snowflake object to that y position
  fall(){
    // move down and drift
    this.obj.object3D.position.x += this.vx;
    this.obj.object3D.position.z += this.vz;
    this.obj.object3D.position.y -= this.dy;

    // If below ground plane (y <= plane.y), reset above
    let plane = document.querySelector('a-plane');
    let groundY = plane ? (plane.getAttribute('position')?.y || 0) : 0;
    if(this.obj.object3D.position.y <= groundY){
      let ppos = plane ? plane.getAttribute('position') : {x:0,z:0};
      let w = plane ? parseFloat(plane.getAttribute('width')) || 150 : 150;
      let h = plane ? parseFloat(plane.getAttribute('height')) || 150 : 150;
      this.obj.object3D.position.x = (Math.random() * w) - w/2 + ppos.x;
      this.obj.object3D.position.z = (Math.random() * h) - h/2 + ppos.z;
      this.obj.object3D.position.y = Math.random() * 8 + 6;
      this.dy = (Math.random() * 0.03) + 0.01;
      this.vx = (Math.random() * 2 - 1) * 0.01;
      this.vz = (Math.random() * 2 - 1) * 0.01;
    }
  }
}