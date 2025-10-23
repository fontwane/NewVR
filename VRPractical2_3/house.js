class House{
    constructor(x, y, z){
        this.obj = document.createElement('a-entity');

        let base = document.createElement('a-box');
        base.setAttribute('width', 2);
        base.setAttribute('height', 1.5);
        base.setAttribute('depth', 2);
        base.setAttribute('color', '#d2b48c');
        base.setAttribute('position', '0 0.75 0');
        this.obj.append(base);


        let roof = document.createElement('a-cone');
        roof.setAttribute('radius-bottom', 1.4);
        roof.setAttribute('height', 1);
        roof.setAttribute('color', '#8B0000');
        
        roof.setAttribute('position', '0 2 0');
        this.obj.append(roof);


        let door = document.createElement('a-box');
        door.setAttribute('width', 0.4);
        door.setAttribute('height', 0.8);
        door.setAttribute('depth', 0.05);
        door.setAttribute('color', '#654321');
        door.setAttribute('position', '0 0.4 1.025');
        this.obj.append(door);

        this.obj.setAttribute('position', {x: x, y: 0, z: z});
        scene.append(this.obj);

    }

}