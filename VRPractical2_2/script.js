
window.addEventListener("DOMContentLoaded",function() {
    scene = document.querySelector("a-scene"); 
    sphere = document.querySelector("#car");
    sphere.roty = 0;
    shpere.droty = 0;
    loop();
    
})

function loop(){
    shere.roty += sphere.droty;
    shpere.setAttribut("rotation",{x:0,y:sphere.roty,z:0});
    Sphere.setAttribute("position", {x:0, y:shpere.roty, z:0});
    window.requestAnimationFrame(loop);


}