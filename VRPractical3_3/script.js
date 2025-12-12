let rnd = (l,u) => Math.random() * (u-l) + l
let scene, camera, bullets = [], enemies = [], ammo_boxes = [], ammo_count = 1000, enemy_killed = 0;
let snowmen = [];
let trees = [];
let snowflakes = [];

let hitMessageEl = null;
let ammoTextEl = null;
let timerTextEl = null;
let remainingTime = 180; // seconds (3 minutes)
let gameOver = false;
let scoreTextEl = null;

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");

  hitMessageEl = document.getElementById("hitMessage");
  ammoTextEl = document.getElementById("ammoText");
  timerTextEl = document.getElementById("timerText");
  scoreTextEl = document.getElementById("scoreText");
  // initialize ammo display
  updateAmmoText();
  updateScoreText();
  
  // Register clicks on the A-Frame scene so cursor/VR clicks work
  scene.addEventListener("click", fireBullet);

  for(let i = 0; i < 50; i++){
    let x = rnd(-80,80);
    let z = rnd(-80,80);
    snowmen.push(new Snowman(x, 0, z));
  }
  
  // Spawn trees around the play area using the HTML tree template
  let treeTemplate = document.getElementById('tree');
  if(treeTemplate){
    for(let i=0;i<150;i++){
      let x = rnd(-80,80);
      let z = rnd(-80,80);
      let clone = treeTemplate.cloneNode(true);
      if(clone.hasAttribute && clone.hasAttribute('id')) clone.removeAttribute('id');
      if(clone.hasAttribute && clone.hasAttribute('style')) clone.removeAttribute('style');
      clone.setAttribute('position', {x:x, y:0, z:z});
      scene.appendChild(clone);
      trees.push(clone);
    }
  }

  // Spawn snowflakes for falling effect
  let plane = document.querySelector('a-plane');
  let ppos = plane ? plane.getAttribute('position') : {x:0,z:0};
  let w = plane ? parseFloat(plane.getAttribute('width')) || 150 : 150;
  let h = plane ? parseFloat(plane.getAttribute('height')) || 150 : 150;
  for(let i=0;i<200;i++){
    let x = (Math.random() * w) - w/2 + ppos.x;
    let z = (Math.random() * h) - h/2 + ppos.z;
    let y = Math.random() * 8 + 6;
    snowflakes.push(new Snowflake(x,y,z));
  }

 for(let i = 0;i < 100;i++ ){
    let e = new Snowman("snowman",{x:rnd(-50,50),y:0.5,z:rnd(-50,50)})
    enemies.push(e);
    
    
  }

  // Spawn some ammo boxes around the scene
  if (typeof AmmoBox !== 'undefined'){
    for(let i=0;i<50;i++){
      let x = rnd(-80,80);
      let z = rnd(-80,80);
      let box = new AmmoBox(x, 0.5, z);
      ammo_boxes.push(box);
      // console.log('Spawned ammo box', i, 'at', x, z);
    }
  }

  

  
  setTimeout(loop,100);
  // initialize timer display and start countdown
  updateTimerText();
  setTimeout(countdown,1000);
})

let keysPressed = {};

// Helper: update on-screen ammo text
function updateAmmoText(){
  if(typeof ammoTextEl !== 'undefined' && ammoTextEl){
    ammoTextEl.setAttribute('text','value: Ammo: ' + ammo_count + '; color: black; width: 3');
  }
}

function showMessage(msg){
  // hide text message and show appropriate image if available
  if(typeof hitMessageEl !== 'undefined' && hitMessageEl){
    hitMessageEl.setAttribute('visible', false);
  }
  const winImg = document.getElementById('winImage');
  const loseImg = document.getElementById('loseImage');
  if(msg === 'You Win'){
    if(winImg) winImg.setAttribute('visible', true);
    if(loseImg) loseImg.setAttribute('visible', false);
  } else if(msg === 'You Lose'){
    if(loseImg) loseImg.setAttribute('visible', true);
    if(winImg) winImg.setAttribute('visible', false);
  } else {
    // fallback to text for other messages
    if(typeof hitMessageEl !== 'undefined' && hitMessageEl){
      hitMessageEl.setAttribute('text','value: ' + msg + '; color: red; align: center; width: 2.5');
      hitMessageEl.setAttribute('visible', true);
    }
  }
  gameOver = true;
  // disable further firing
  try{ scene.removeEventListener('click', fireBullet); }catch(e){}
}

// Helper: update on-screen score text
function updateScoreText(){
  if(typeof scoreTextEl !== 'undefined' && scoreTextEl){
    scoreTextEl.setAttribute('text','value: Score: ' + enemy_killed + '; color: black; width: 4');
  }
}

// Helper: centralize firing logic so every fire path decrements ammo
function fireBullet(){
  if(gameOver) return;
  if(ammo_count > 0){
    let b = new Bullet();
    bullets.push(b);
    ammo_count--;
    updateAmmoText();
  }
}

// Helper: update timer display (mm:ss)
function updateTimerText(){
  if(typeof timerTextEl !== 'undefined' && timerTextEl){
    let mm = String(Math.floor(remainingTime/60)).padStart(2,'0');
    let ss = String(remainingTime % 60).padStart(2,'0');
    timerTextEl.setAttribute('text','value: ' + mm + ':' + ss + '; color: black; width: 3');
  }
}

window.addEventListener("keydown",function(e){
  keysPressed[e.key] = true;
  
  //User can only fire with they press the spacebar and have sufficient ammo
  if(e.key == " "){
    fireBullet();
  }
  if(e.key == "r"){
    ammo_count = 10;
  }
})

window.addEventListener("keyup",function(e){
  keysPressed[e.key] = false;
})

function loop(){
  if(gameOver){
    // still render one last frame but don't process game logic
    window.requestAnimationFrame(loop);
    return;
  }

  // Update snowmen
  for(let i = 0; i < snowmen.length; i++){
    snowmen[i].update();
  }

  // Update snowflakes (fall)
  for(let i=0;i<snowflakes.length;i++){
    try{ snowflakes[i].fall(); }catch(e){}
  }

  // Check for player collecting ammo boxes
  for(let i = 0; i < ammo_boxes.length; i++){
    try{
      if(distance(camera, ammo_boxes[i].obj) < 2){
        // collect
        ammo_count += 10;
        updateAmmoText();
        console.log('Collected ammo box at', ammo_boxes[i].obj.getAttribute('position'));
        ammo_boxes[i].remove();
        ammo_boxes.splice(i,1);
        i--;
      }
    }catch(e){ /* ignore removed nodes */ }
  }

  bullets.forEach((b,i)=>{

    b.fire();
    let bulletHit = false;
    
    // Check collision with snowmen
    for(let j = 0; j < snowmen.length; j++){
      if(snowmen[j].alive && distance(b.obj, snowmen[j].snowman) < 3){
        snowmen[j].remove();
        enemy_killed++;
        updateScoreText();
        bulletHit = true;
        break;
      }
    }
    
    if(bulletHit || (distance(b.obj,camera)>200)){
      bullets.splice(i,1)
      b.obj.parentNode.removeChild(b.obj);
    }
  })

  // Check win: no alive snowmen left
  let aliveCount = 0;
  for(let i=0;i<snowmen.length;i++) if(snowmen[i].alive) aliveCount++;
  if(aliveCount === 0){
    showMessage('You Win');
  }

  
  window.requestAnimationFrame(loop);
}



function countdown(){
  if(typeof remainingTime === 'undefined') return;
  if(remainingTime > 0){
    remainingTime--;
    updateTimerText();
    setTimeout(countdown,1000);
  } else {
    remainingTime = 0;
    updateTimerText();
    // time's up - check win/lose
    let aliveCount = 0;
    for(let i=0;i<snowmen.length;i++) if(snowmen[i].alive) aliveCount++;
    if(aliveCount === 0){
      showMessage('You Win');
    } else {
      showMessage('You Lose');
    }
  }
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