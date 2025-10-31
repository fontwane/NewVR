
class Rocket {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.speed = Math.random() * 0.06 + 0.02;

    this.el = document.createElement('a-entity');


    let body = document.createElement('a-cylinder');
    body.setAttribute('radius', 0.3);
    body.setAttribute('height', 1.8);
    body.setAttribute('color', 'gray');
    body.setAttribute('position', `0 ${0.9} 0`);
    this.el.appendChild(body);

   
    let nose = document.createElement('a-cone');
    nose.setAttribute('radius-bottom', 0.6);
    nose.setAttribute('height', 0.8);
    nose.setAttribute('color', 'red');
    nose.setAttribute('position', `0 ${1.8} 0`);
    this.el.appendChild(nose);

 
    let tail = document.createElement('a-cone');
    tail.setAttribute('radius-bottom', 0.35);
    tail.setAttribute('height', 0.8);
    tail.setAttribute('color', 'orange');
    tail.setAttribute('rotation', '-180 0 0');
    tail.setAttribute('position', `0 ${-0.4} 0`);
    this.el.appendChild(tail);

  
    for (let i = 0; i < 3; i++) {
      const fin = document.createElement('a-box');
      fin.setAttribute('width', 0.05);
      fin.setAttribute('height', 0.4);
      fin.setAttribute('depth', 0.5);
      fin.setAttribute('color', 'orange');
      let angle = (i / 3) * 360;
      fin.setAttribute('position', { x: Math.cos((angle*Math.PI)/180) * 0.5, y: 0, z: Math.sin((angle*Math.PI)/180) * 0.5 });
      fin.setAttribute('rotation', { x: 15, y: angle, z: 0 });
      this.el.appendChild(fin);
    }

 
    let flame = document.createElement('a-cone');
    flame.setAttribute('radius-bottom', 0.4);
    flame.setAttribute('height', 0.9);
    flame.setAttribute('color', '#FF8C00');
    flame.setAttribute('opacity', 0.8);
    flame.setAttribute('rotation', '-180 0 0');
    flame.setAttribute('position', `0 ${-1.0} 0`);
    this.el.appendChild(flame);

   
    this.el.setAttribute('position', { x: this.x, y: this.y, z: this.z });
    let sceneEl = document.querySelector('a-scene');
    if (sceneEl) sceneEl.appendChild(this.el);
    else window.addEventListener('DOMContentLoaded', () => document.querySelector('a-scene').appendChild(this.el));
  }


  launch(){
    this.y += this.speed;
    this.el.setAttribute('position', { x: this.x, y: this.y, z: this.z });


   
  }
}