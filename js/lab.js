
document.getElementById("inicioSection").addEventListener("click", function(){
  showInicio();
});

document.getElementById("labSection").addEventListener("click", function(){
  showLab();
});

document.getElementById("exploreSection").addEventListener("click", function(){
  showExplore();
});



function showExplore(){
  console.log('EXPLORE');
  const inicio = document.getElementById('inicio');
  inicio.style.display = 'none';
  const canvas = document.getElementById('canvas');
  canvas.style.display = 'block';

  const app = new PIXI.Application({
    view: canvas,
    width: window.innerWidth,
    height: window.innerHeight
  });

  document.body.appendChild(app.view);

  // Get the texture for rope.
  const starTexture = PIXI.Texture.from('../img/flavs.jpg');

  const starAmount = 1000;
  let cameraZ = 0;
  const fov = 20;
  const baseSpeed = 0.025;
  let speed = 0;
  let warpSpeed = 0;
  const starStretch = 5;
  const starBaseSize = 0.05;


  // Create the stars
  const stars = [];
  for (let i = 0; i < starAmount; i++) {
    const star = {
      sprite: new PIXI.Sprite(starTexture),
      z: 0,
      x: 0,
      y: 0,
    };
    star.sprite.anchor.x = 0.5;
    star.sprite.anchor.y = 0.7;
    randomizeStar(star, 0, true);
    app.stage.addChild(star.sprite);
    stars.push(star);
  }


  // Change flight speed every 5 seconds
  // setInterval(() => {
  //   warpSpeed = warpSpeed > 0 ? 0 : 1;
  // }, 5000);

  // Listen for animate update
  app.ticker.add((delta) => {
    // Simple easing. This should be changed to proper easing function when used for real.
    speed += (warpSpeed - speed) / 20;
    cameraZ += delta * 10 * (speed + baseSpeed);
    for (let i = 0; i < starAmount; i++) {
      const star = stars[i];
      if (star.z < cameraZ) randomizeStar(star, cameraZ);

      // Map star 3d position to 2d with really simple projection
      const z = star.z - cameraZ;
      star.sprite.x = star.x * (fov / z) * app.renderer.screen.width + app.renderer.screen.width / 2;
      star.sprite.y = star.y * (fov / z) * app.renderer.screen.width + app.renderer.screen.height / 2;

      // Calculate star scale & rotation.
      const dxCenter = star.sprite.x - app.renderer.screen.width / 2;
      const dyCenter = star.sprite.y - app.renderer.screen.height / 2;
      const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
      const distanceScale = Math.max(0, (2000 - z) / 2000);
      star.sprite.scale.x = distanceScale * starBaseSize;
      // Star is looking towards center so that y axis is towards center.
      // Scale the star depending on how fast we are moving, what the stretchfactor is and depending on how far away it is from the center.
      star.sprite.scale.y = distanceScale * starBaseSize + distanceScale * speed * starStretch * distanceCenter / app.renderer.screen.width;
      star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
    }
  });
}
