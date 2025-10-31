let rnd = (l,u) => Math.floor(Math.random()*(u-l) + l);
let scene, rockets = [], ufos = [];

window.addEventListener('DOMContentLoaded', function() {
  scene = document.querySelector('a-scene');

  for (let i = 0; i < 100; i++) {
    const x = rnd(-30, 30);
    const z = rnd(-30, 30);
    const y = Math.random() * 4 - 2;
    const rocket = new Rocket(x, y, z);
    rockets.push(rocket);
  }

  // create UFOs that will fall from the sky
  for (let i = 0; i < 12; i++) {
    const x = rnd(-40, 40);
    const z = rnd(-40, 40);
    const y = Math.random() * 40 + 12; // spawn high
    const u = new UFO(x, y, z);
    ufos.push(u);
  }

  loop();
});

function loop() {
  for (let rocket of rockets){
    if (typeof rocket.launch === 'function') rocket.launch();
    else if (typeof rocket.rise === 'function') rocket.rise();
  }

  // update UFOs: they invade (fall) until they land
  for (let u of ufos) {
    if (typeof u.invade === 'function') u.invade();
  }

  window.requestAnimationFrame(loop);
}