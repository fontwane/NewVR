class Cloud{
    constructor(x, y, z){

        this.obj = document.createElement("a-entity");

        let c1 = document.createElement("a-sphere");
        c1.setAttribute("color", "white");
        c1.setAttribute("position", "0 0.3 0");
        c1.setAttribute("radius", "0.6");
        this.obj.append( c1 );

        let c2 = document.createElement("a-sphere");
        c2.setAttribute("color", "white");
        c2.setAttribute("position", "0.6 0.25 0");
        c2.setAttribute("radius", "0.5");
        this.obj.append( c2 );
        
        let c3 = document.createElement("a-sphere");
        c3.setAttribute("color", "white");
        c3.setAttribute("position", "-0.6 0.25 0");
        c3.setAttribute("radius", "0.5");
        this.obj.append( c3 );

        
        this.obj.setAttribute("position", {x:x, y:y, z:z});
        scene.append( this.obj );
    }
}