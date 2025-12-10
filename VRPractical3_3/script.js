let rnd = (l,u) => Math.random() * (u-l) + l
let scene, camera, bullet, enemies = [], ammo_boxes = [], ammo_count = 1000, enemy_killed = 0;
let snowmen = [];
let darts = [];
let hitMessageEl = null;
let ammoTextEl = null;

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");

  
  window.onclick = ()=>{
    dart = new Dart();
  }

  for(let i = 0; i < 20; i++){
    let x = rnd(-20,20);
    let z = rnd(-20,20);
    snowmen.push(new Snowman(x,z));
  }

  // Create dart on click (allow multiple darts) — only if ammo remains
  window.addEventListener('click', () => {
    if (ammo_count <= 0) return;
    let d = new Dart();
    darts.push(d);
    ammo_count = Math.max(0, ammo_count - 1);
    if (ammoTextEl) ammoTextEl.setAttribute('text', { value: 'Ammo: ' + ammo_count, color: 'black', width: 3 });
  });

 
  

  // cache the hit message element
  // hitMessageEl = document.getElementById('hitMessage');
  ammoTextEl = document.getElementById('ammoText');
  // initialize ammo display
  if (ammoTextEl) ammoTextEl.setAttribute('text', { value: 'Ammo: ' + ammo_count, color: 'black', width: 3 });
    
  setTimeout(loop,100);
  setTimeout(countdown,100);
})

function loop(){
  // if(bullet){
  //   bullet.fire();
  // }
  for(let snowman of snowmen){
    if(dart && distance(snowman.obj,dart.obj) < 1){
      snowman.obj.setAttribute("opacity",0);
    }
  }

  if(dart){
    dart.fly(); 
  }
  //  for (Snowman of snowmen) {
  //     Snowman.update();
  //   }

  // Update snowmen
  for(let i = 0; i < snowmen.length; i++){
    snowmen[i].update();
  }

  // Update darts and check collisions (iterate backwards when removing)
  for (let i = darts.length - 1; i >= 0; i--) {
    let d = darts[i];
    if (d) d.fly();

    // check collision against snowmen
    for (let j = snowmen.length - 1; j >= 0; j--) {
      let s = snowmen[j];
      // use DOM elements for distance calculation
      if (d && s && d.obj && s.snowman) {
      let dist = distance(s.snowman, d.obj);
      if (dist < 1.5) {
          // remove ALL cloned snowmen on hit
          // let clones = document.querySelectorAll('.snowman-clone');
          // let removed = 0;
          clones.forEach(c => {
            if (c.parentNode) { c.parentNode.removeChild(c); removed++; }
          });
          // clear snowmen array
          snowmen.length = 0;
          // remove dart
          if (d.obj.parentNode) d.obj.parentNode.removeChild(d.obj);
          darts.splice(i, 1);
          // update stats: count all removed as kills
          enemy_killed += removed;
          let scoreText = document.getElementById('scoreText');
          if (scoreText) scoreText.setAttribute('text', { value: 'Score: ' + enemy_killed, color: 'black', width: 4 });
          // show temporary hit message with counts
          // if (hitMessageEl) showHitMessage(`All snowmen removed! +${removed} Score: ${enemy_killed} Ammo: ${ammo_count}`);
          // break; // dart gone, break out to next dart
        }
      }
    }
  }

  // Check single bullet collisions (if a bullet exists)
  // if (bullet && bullet.obj) {
  //   for (let j = snowmen.length - 1; j >= 0; j--) {
  //     let s = snowmen[j];
  //     if (s && s.snowman) {
  //       let dist = distance(s.snowman, bullet.obj);
  //       if (dist < 1.0) {
  //         // remove ALL cloned snowmen on bullet hit
          
  //         snowmen.length = 0;
  //         if (bullet.obj.parentNode) bullet.obj.parentNode.removeChild(bullet.obj);
  //         bullet = null;
  //         // update stats
  //         enemy_killed += removed;
  //         let scoreText = document.getElementById('scoreText');
  //         if (scoreText) scoreText.setAttribute('text', { value: 'Score: ' + enemy_killed, color: 'black', width: 4 });
          
  //       }
  //     }
  //   }
  // }

  window.requestAnimationFrame(loop);
}



function countdown(){

  setTimeout(countdown,1000);
}

function distance(obj1,obj2){
  let x1 = obj1.object3D.position.x;
  let y1 = obj1.object3D.position.y;
  let z1 = obj1.object3D.position.z;
  let x2 = obj2.object3D.position.x;
  let y2 = obj2.object3D.position.y;
  let z2 = obj2.object3D.position.z;

  let d = Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2) + Math.pow(z1-z2,2));
  return d;
}