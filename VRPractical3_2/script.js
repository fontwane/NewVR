let scene, car;
let snowmen = [];
let snowflakes=[];

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene")

  for(let i = 0; i < 20; i++){
    snowmen.push(new Snowman(rnd(-20, 20), 0, rnd(-20, 20)));
  }

    // Get the car element and add click to move it
    // let carEl = document.getElementById("car");
    // if (carEl) {
    //   carEl.addEventListener("click", () => {
    //     // Get current position
    //     let pos = carEl.getAttribute("position");
    //     // Move along x axis
    //     pos.x += 2;
    //     carEl.setAttribute("position", pos);
    //   });
    // }

  for(let i = 0; i < 100; i++){
    let x = rnd(-30,30);
    let z = rnd(-30,30);
    let snowflake = new Snowflake(x,z);
    snowflakes.push(snowflake);
  }
     
  loop();
})


function loop(){

  for(let i = 0; i < snowmen.length; i++){
    snowmen[i].update();
  }

  for (let flake of snowflakes) {
    flake.fall();
  }

  window.requestAnimationFrame(loop);
}



function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}