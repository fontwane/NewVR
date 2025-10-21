
window.addEventListener("DOMContentLoaded",function() {
    scene = document.querySelector("a-scene"); 
    box = document.querySelector("#car");
    box.roty = 0;
    box.droty = 0;
    loop();
    


    
})

function loop(){
    box.roty += sphere.droty;
    box.setAttribut("rotation",{x:0,y:sphere.roty,z:0});
    box.setAttribute("position", {x:0, y:shpere.roty, z:0});
    window.requestAnimationFrame(loop);


}