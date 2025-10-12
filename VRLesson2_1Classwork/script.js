window.addEventListener("DOMContentLoaded",function() {
  //Challenge 1: Create a variable scene for the <a-scene> component in the HTML
  let scene = document.querySelector("a-scene");

  //Challenge 2: Create a variable for <a-dodecahedron> and create it.
  let dodecahedron = this.document.createElement("a-dodecahedron");
  
  //Challenge 3: Change the <a-dodecahedron>'s position, radius and color
  dodecahedron.setAttribute("position", {x: 0, y: 1.5, z: -3});
  dodecahedron.setAttribute("radius", 0.5);
  dodecahedron.setAttribute("color", "purple");

  //Challenge 4: Add the <a-dodecahedron> to the scene
  scene.append(dodecahedron);

  /* Challenge Bonus
  1) Use a for loop to create a lot of <a-dodecahedron> 
  2) Change each <a-dodecahedron>'s position to a random x, y, and z location
  3) Change each <a-dodecahedron>'s to a random color.  Hint: Use rgb( ) and string interpolation 
  */

  for (let i = 0; i< 20; i++){
    let dodecahedron = this.document.createElement("a-dodecahedron");
    dodecahedron.setAttribute("position", {x: (Math.random()*10)-5, y: (Math.random()*5), z: (Math.random()*-10)});
    dodecahedron.setAttribute("radius", 0.3);
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    dodecahedron.setAttribute("color", `rgb(${r},${g},${b})`);
    scene.append(dodecahedron);
  }
  
})