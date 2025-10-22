let scene, a = 0, z = -30;
window.addEventListener("DOMContentLoaded",function() {
    scene = document.querySelector("a-scene"); 
    box = document.querySelector("#car");
    sphere = document.querySelector("#pokeball");
    rocket = document.querySelector("#rocket");
    dude = document.querySelector("#dude");
    sun = this.document.querySelector("#sun");
    sun.fade = 1;
    sun.opacity = 0;
  
    loop();
    


    
})

function loop(){
    a -= 0.1;
    z += 1;
    // c += 1;
    box.setAttribute("rotation", {x:0, y:90, z:0});
    box.setAttribute("position", {x:a, y:0, z:-8});
    
    sphere.setAttribute("rotation", {x:z, y:0, z:0});

    rocket.setAttribute("position", {x:3, y:a, z:-4});

    dude.setAttribute("scale", {x: 2, y: 2, z: 2 });
    dude.setAttribute("position", {x:-2, y:1.5, z:-10}); 

    
    sun.opacity+=sun.fade/100;
    sun.opacity < 1 && sun.setAttribute("opacity", sun.opacity);

    window.requestAnimationFrame(loop);


}       



