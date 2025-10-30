let rnd = (l,u) => Math.floor(Math.random()*(u-l) + l);
let scene;
let rockets = [];
window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene"); 
  
 for(let i = 0; i < 3; i++){
    let x = rnd(-20,20);
    let y = rnd(5,20);
    let z = rnd(-20,20);
    rocket = new Rocket(x,y,z);
    rockets.push( rocket );
  }
  
  loop();
})

function loop(){
  for(let rocket of rockets){
    rocket.fly();
  }
  window.requestAnimationFrame( loop );
}
