let rnd = (l,u) => Math.random()*(u-l)+l;
let scene;
window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  //Challenge 2: Create 200 Balls at random locations and watch them fall or push them off the end
  for(let i = 0; i < 200; i++){
    let x = rnd(-10, 10);
    let y = rnd(-10, 10);
    let z = rnd(-10, 10);
    let b = new Ball(x,y,z);
  }

  
})