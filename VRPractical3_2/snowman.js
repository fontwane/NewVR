class Snowman {
  constructor(x, y, z) {
    this.snowmanPrefab = document.getElementById("snowman");
    this.snowman = this.snowmanPrefab.cloneNode(true);
    this.snowman.setAttribute("position", {x: x, y: y, z: z});
    this.r = 0;
    this.dr = 1;
    this.rotate = false;
    scene.appendChild(this.snowman);
    // console.log("snowman created, rotate: ", this.rotate);

    this.snowman.addEventListener("click", () => {
      this.rotate = true;
    //   console.log("clicked, rotate: ", this.rotate);
    })
  }

  update() {

    if(this.rotate === true){
      this.r += this.dr;
      this.snowman.setAttribute("rotation", {x: 0, y: this.r, z: 0});
    //   console.log("rotating, rotate: ", this.rotate);
    } else {
      this.r = 0;
      this.snowman.setAttribute("rotation", {x: 0, y: this.r, z: 0});
    //   console.log("not rotating, rotate: ", this.rotate);
    }
  }

}