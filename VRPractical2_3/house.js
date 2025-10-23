class House{
    constructor(x, y, z){
        this.obj = document.createElement('a-entity');

        let base = document.createElement("a-box");
        base.setAttribute("color","yellow");
        base.setAttribute("position","0 0.5 0");
        base.setAttribute("depth","1");
        base.setAttribute("width","1");
        base.setAttribute("height","1");
        this.obj.append( base );

        let roof = document.createElement("a-cylinder");
        roof.setAttribute("color","red");
        // base top is at 1.0 (base center 0.5 + height/2 = 0.5),
        // cylinder height 1.5 -> center should be 1.0 + 1.5/2 = 1.75
        roof.setAttribute("position","0 1.75 0");
        roof.setAttribute("radius","0.75");
        roof.setAttribute("height","1.5");
        roof.setAttribute("segments-radial","3");
        roof.setAttribute("rotation","0 0 0");
        this.obj.append( roof );

        this.obj.setAttribute("position",{x:x, y:0, z:z});
        scene.append( this.obj );

    }

}