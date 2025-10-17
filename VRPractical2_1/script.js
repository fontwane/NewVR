let scene;

function rnd(l, u){
  return Math.floor(Math.random()*(u-l) + l);
}

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene"); //CSS Selector

  for(let i = 0; i < 100; i++){
    let x = rnd(-20,20);
    let z = rnd(-20,20);
    createTree(x,0,z);
  }
  // add some clouds
  createCloud(-8, 8, -10);
  createCloud(0, 9, -5);
  createCloud(8, 7, -12);
  // add many random clouds for a fuller sky
  for (let i = 0; i < 100; i++) {
    let x = rnd(-20, 30);
    // use a small float range for height so clouds sit in the sky
    let y = Math.random() * 4 + 6; // between 6 and 10
    let z = rnd(-20, 20);
    createCloud(x, y, z);
  }
  // add some houses
  createHouse(-8, 6);
  createHouse(6, 8);
  createHouse(12, -4);
   //Task 2: Use the createCloud(...)  to add several clouds to the scene at various positions.

   //Task 4: Use the createHouse(...)  to add several houses to the scene at various positions.
})

/* Task 1: Create a function createCloud that,
      1) Accept an x, y and z position for where to place the cloud "entity"
      2) Create an entity to store all the components that will make up the cloud
      3) Create three sphere, or some other appropriate component that can slightly overlap.         
      4) Adjust the attributes appropriately.  Add each sphere to the cloud entity
      5) Set cloud entities position to those passed in to the function.
      6) Add the cloud entity to the scene
*/

function createCloud(x, y, z){
  // create an entity to hold the cloud parts
  let cloud = document.createElement("a-entity");

  let c1 = document.createElement("a-sphere");
  c1.setAttribute("color", "white");
  c1.setAttribute("position", "0 0.3 0");
  c1.setAttribute("radius", "0.6");
  cloud.append( c1 );

  let c2 = document.createElement("a-sphere");
  c2.setAttribute("color", "white");
  c2.setAttribute("position", "0.6 0.25 0");
  c2.setAttribute("radius", "0.5");
  cloud.append( c2 );
  
  let c3 = document.createElement("a-sphere");
  c3.setAttribute("color", "white");
  c3.setAttribute("position", "-0.6 0.25 0");
  c3.setAttribute("radius", "0.5");
  cloud.append( c3 );

  // position the cloud entity and add it to the scene
  cloud.setAttribute("position", {x:x, y:y, z:z});
  scene.append( cloud );
}
/* Task 3: Create a function createHouse that,
      1) Accept an x and z position for where to place the house "entity"
      2) Create an entity to store all the components that will make up the house
      3) Create box for the base of the house.  Add base to the entity.
      4) Create triangular prism from a cylinder for the roof.  Add the roof to the entity.
      5) Adjust the attributes appropriately.
      5) Set house entities position to those passed in to the function.
      6) Add the house entity to the scene
*/

function createHouse(x, z){
  let house = document.createElement("a-entity");
  
  let base = document.createElement("a-box");
  base.setAttribute("color","yellow");
  base.setAttribute("position","0 0.5 0");
  base.setAttribute("depth","1");
  base.setAttribute("width","1");
  base.setAttribute("height","1");
  house.append( base );

  let roof = document.createElement("a-cylinder");
  roof.setAttribute("color","red");
  // base top is at 1.0 (base center 0.5 + height/2 = 0.5),
  // cylinder height 1.5 -> center should be 1.0 + 1.5/2 = 1.75
  roof.setAttribute("position","0 1.75 0");
  roof.setAttribute("radius","0.75");
  roof.setAttribute("height","1.5");
  roof.setAttribute("segments-radial","3");
  roof.setAttribute("rotation","0 0 0");
  house.append( roof );

  house.setAttribute("position",{x:x, y:0, z:z});
  scene.append( house );

}

function createTree(x, y, z){
  let tree = document.createElement("a-entity");
  
  let pines = document.createElement("a-cone");
  pines.setAttribute("color","green");
  pines.setAttribute("position","0 2 0");
  pines.setAttribute("height","2");
  tree.append( pines );

  let stump = document.createElement("a-cylinder");
  stump.setAttribute("position","0 1 0");
  stump.setAttribute("color","brown");
  stump.setAttribute("radius","0.25");
  tree.append( stump );

  tree.setAttribute("position",{x:x, y:y, z:z});
  scene.append( tree )
}

// Task 3: createHouse implementation
function createHouse(x, z){
  let house = document.createElement('a-entity');

  // base of the house
  let base = document.createElement('a-box');
  base.setAttribute('width', 2);
  base.setAttribute('height', 1.5);
  base.setAttribute('depth', 2);
  base.setAttribute('color', '#d2b48c');
  base.setAttribute('position', '0 0.75 0');
  house.append(base);

  // roof - use a cone for a simple triangular roof
  let roof = document.createElement('a-cone');
  roof.setAttribute('radius-bottom', 1.4);
  roof.setAttribute('height', 1);
  roof.setAttribute('color', '#8B0000');
  // base top Y = 1.5 (base center 0.75 + height/2 = 1.5)
  // cone height 1 -> center = 1.5 + 0.5 = 2.0
  roof.setAttribute('position', '0 2 0');
  house.append(roof);

  // optional door
  let door = document.createElement('a-box');
  door.setAttribute('width', 0.4);
  door.setAttribute('height', 0.8);
  door.setAttribute('depth', 0.05);
  door.setAttribute('color', '#654321');
  door.setAttribute('position', '0 0.4 1.025');
  house.append(door);

  house.setAttribute('position', {x: x, y: 0, z: z});
  scene.append(house);
}



