class Snowman{
    constructor(x, y , z){
        this.snowmanTemplate = document.getElementById("snowman");
        this.snowman = this.snowmanTemplate.cloneNode(true);
        // remove template-only attributes from the clone
        if (this.snowman.hasAttribute && this.snowman.hasAttribute('id')) this.snowman.removeAttribute('id');
        if (this.snowman.hasAttribute && this.snowman.hasAttribute('style')) this.snowman.removeAttribute('style');
        this.snowman.setAttribute("position", {x:x, y:y, z:z});
        this.snowman.setAttribute('visible', true);
        // mark clones so we can find/remove them as a group
        this.snowman.classList.add('snowman-clone');
        this.r = 0;
        this.dr = 1;
        this.rotate = false;
        
        scene.appendChild(this.snowman);
    }



    update() {

        if(this.rotate){
        this.r += this.dr;
        this.snowman.setAttribute("rotation", {x: 0, y: this.r, z: 0});
        }
    
  }

}
       
