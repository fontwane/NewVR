class Rocket{
    constructer(x, y, z){
        this. x = x;
        this. y = y;
        this. z = z;
        this.a = 0;
        this.da = 1;
        this.obj = document.creatElemnet("a-entity");

        let top =  document.createElement("a-cone");
        top.setAttribute("color", "red");
        top.setAttribute("position", "0 1.5 0");
        top.setAttribute("height", "2");
        this.obj.append( top );

        let body = document.createElement("a-cylinder");
        
    }
}