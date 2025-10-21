let scene, a = 0, z = -30;
window.addEventListener("DOMContentLoaded",function() {
    scene = document.querySelector("a-scene"); 
    box = document.querySelector("#car");
    sphere = document.querySelector("#pokeball");
    rocket = document.querySelector("#rocket");
    dude = document.querySelector("#dude");
  
    loop();
    


    
})

function loop(){
    a += 0.1;
    z -= 0.1;
    box.setAttribute("rotation", {x:0, y:90, z:0});
    box.setAttribute("position", {x:z, y:0, z:0});
    
    sphere.setAttribute("rotation", {x:a, y:0, z:0});

    rocket.setAttribute("position", {x:3, y:a, z:-4});

    dude.setAttribute("position", {x:-3, y:0, z:z});

    
    window.requestAnimationFrame(loop);


}