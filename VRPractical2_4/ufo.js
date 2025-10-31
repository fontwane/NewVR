
class UFO {
  constructor(x = 0, y = 20, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.speed = Math.random() * 0.12 + 0.02;
    this.landed = false;

    this.el = document.createElement('a-entity');

    // hull - flattened cylinder
    const hull = document.createElement('a-cylinder');
    hull.setAttribute('radius', 1.6);
    hull.setAttribute('height', 0.35);
    hull.setAttribute('color', '#6677FF');
    hull.setAttribute('position', '0 0 0');
    this.el.appendChild(hull);


    const dome = document.createElement('a-sphere');
    dome.setAttribute('radius', 0.8);
    dome.setAttribute('color', '#88CCFF');
    dome.setAttribute('position', '0 0.35 0');
    this.el.appendChild(dome);

 
    const ring = document.createElement('a-ring');
    ring.setAttribute('radius-inner', 1.05);
    ring.setAttribute('radius-outer', 1.6);
    ring.setAttribute('rotation', '-90 0 0');
    ring.setAttribute('material', 'color: #ffff88; opacity: 0.28; shader: flat');
    ring.setAttribute('position', '0 -0.1 0');
    this.el.appendChild(ring);

    
    this.el.setAttribute('position', { x: this.x, y: this.y, z: this.z });
    const sceneEl = document.querySelector('a-scene');
    if (sceneEl) sceneEl.appendChild(this.el);
    else window.addEventListener('DOMContentLoaded', () => document.querySelector('a-scene').appendChild(this.el));
  }


  invade() {
    if (this.landed) return;

    this.y -= this.speed;

    
    const groundY = 0.5;
    if (this.y <= groundY) {
      this.y = groundY;
      this.landed = true;


      this.el.setAttribute('rotation', { x: 0, y: Math.random() * 360, z: 0 });
      const hull = this.el.querySelector('a-cylinder');
      if (hull) hull.setAttribute('color', '#4444AA');
    }

    this.el.setAttribute('position', { x: this.x, y: this.y, z: this.z });
  }
}


window.UFO = UFO;
 