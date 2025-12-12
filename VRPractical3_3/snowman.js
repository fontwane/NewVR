class Snowman {
    constructor(x, y, z){
        this.snowman = document.createElement('a-entity');

        // Body
        let body1 = document.createElement('a-sphere');
        body1.setAttribute('position','0 0.5 -0.5');
        body1.setAttribute('radius','1.25');
        body1.setAttribute('color','white');
        this.snowman.append(body1);

        let body2 = document.createElement('a-sphere');
        body2.setAttribute('position','0 2.25 -0.5');
        body2.setAttribute('radius','1.05');
        body2.setAttribute('color','white');
        this.snowman.append(body2);

        let body3 = document.createElement('a-sphere');
        body3.setAttribute('position','0 3.5 -0.5');
        body3.setAttribute('radius','.85');
        body3.setAttribute('color','white');
        this.snowman.append(body3);

        // Eyes
        let eyeL = document.createElement('a-sphere');
        eyeL.setAttribute('position','-0.25 3.5 0.25');
        eyeL.setAttribute('radius','.15');
        eyeL.setAttribute('color','#9c1414');
        this.snowman.append(eyeL);

        let eyeR = document.createElement('a-sphere');
        eyeR.setAttribute('position','0.25 3.5 0.25');
        eyeR.setAttribute('radius','.15');
        eyeR.setAttribute('color','#9c1414');
        this.snowman.append(eyeR);

        // Nose
        let nose = document.createElement('a-cone');
        nose.setAttribute('position','0 3.25 0.5');
        nose.setAttribute('rotation','90 0 0');
        nose.setAttribute('color','tomato');
        nose.setAttribute('height','0.5');
        nose.setAttribute('radius-bottom','.1');
        nose.setAttribute('radius-top','0.01');
        this.snowman.append(nose);

        // Arms
        let armL = document.createElement('a-cylinder');
        armL.setAttribute('position','-1.25 2.75 -0.25');
        armL.setAttribute('color','#A52A2A');
        armL.setAttribute('rotation','0 0 60');
        armL.setAttribute('height','2');
        armL.setAttribute('radius','0.15');
        this.snowman.append(armL);

        let armR = document.createElement('a-cylinder');
        armR.setAttribute('position','1.25 2.75 -0.25');
        armR.setAttribute('color','#A52A2A');
        armR.setAttribute('rotation','0 0 -60');
        armR.setAttribute('height','2');
        armR.setAttribute('radius','0.15');
        this.snowman.append(armR);

        this.snowman.setAttribute('position',{x:x, y:y, z:z});
        this.snowman.setAttribute('visible', true);
        this.r = 0;
        this.dr = 1;
        this.rotate = false;
        this.alive = true;

        // wandering movement
        this.vx = (Math.random() * 2 - 1) * 0.03;
        this.vz = (Math.random() * 2 - 1) * 0.03;
        this._changeDirTimer = Math.floor(Math.random() * 200) + 80;

        // compute movement bounds from the ground plane if present
        let plane = document.querySelector('a-plane');
        if(plane){
            let ppos = plane.getAttribute('position') || {x:0,y:0,z:0};
            let w = parseFloat(plane.getAttribute('width')) || 150;
            let h = parseFloat(plane.getAttribute('height')) || 150;
            // plane rotated -90 0 0: width -> X axis, height -> Z axis
            this._minX = ppos.x - w/2;
            this._maxX = ppos.x + w/2;
            this._minZ = ppos.z - h/2;
            this._maxZ = ppos.z + h/2;
        } else {
            // fallback bounds
            this._minX = -75; this._maxX = 75;
            this._minZ = -79; this._maxZ = 71;
        }

        scene.appendChild(this.snowman);
    }

    remove(){
        this.alive = false;
        if(this.snowman && this.snowman.parentNode) this.snowman.parentNode.removeChild(this.snowman);
    }

    update(){
        if(!this.alive) return;

        if(this.rotate){
            this.r += this.dr;
            this.snowman.setAttribute('rotation',{x:0,y:this.r,z:0});
        }

        try{
            let pos = this.snowman.getAttribute('position');
            let nx = pos.x + this.vx;
            let nz = pos.z + this.vz;

            // bounce at plane bounds
            if(nx < this._minX){
                nx = this._minX;
                this.vx = Math.abs(this.vx);
            } else if(nx > this._maxX){
                nx = this._maxX;
                this.vx = -Math.abs(this.vx);
            }
            if(nz < this._minZ){
                nz = this._minZ;
                this.vz = Math.abs(this.vz);
            } else if(nz > this._maxZ){
                nz = this._maxZ;
                this.vz = -Math.abs(this.vz);
            }

            this.snowman.setAttribute('position', {x: nx, y: pos.y, z: nz});

            // occasionally change direction
            this._changeDirTimer--;
            if(this._changeDirTimer <= 0){
                this.vx += (Math.random() * 2 - 1) * 0.02;
                this.vz += (Math.random() * 2 - 1) * 0.02;
                let max = 0.06;
                this.vx = Math.max(-max, Math.min(max, this.vx));
                this.vz = Math.max(-max, Math.min(max, this.vz));
                this._changeDirTimer = Math.floor(Math.random() * 200) + 80;
            }
        }catch(e){ /* ignore if node removed */ }
    }

}

