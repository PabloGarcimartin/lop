function profile(){
  console.log('PROFILE');
  let providers = document.getElementById('providers');
  providers.style.display = 'none';
  let profile = document.getElementById('profile');
  profile.style.display = 'block';
  let gameAave = document.getElementById('gameAave');
  gameAave.style.display = 'none';

  const app = new PIXI.Application({
    view: profile,
    width: window.innerWidth,
    height: window.innerHeight
  });

  document.body.appendChild(app.view);
  // Get the texture for rope.
  const starTexture = PIXI.Texture.from('../img/star.png');

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

  //Add addFlaver
  addFlaver( app );



  // Change flight speed every 5 seconds
  setInterval(() => {
    warpSpeed = warpSpeed > 0 ? 0 : 1;
  }, 5000);

  // Listen for animate update
  app.ticker.add((delta) => {
    // Simple easing. This should be changed to proper easing function when used for real.
    speed += (warpSpeed - speed) / 20;
    cameraZ += delta * 10 * (speed + baseSpeed);
    for (let i = 0; i < starAmount; i++) {
      const star = stars[i];
      if (star.z < cameraZ) randomizeStar(star, cameraZ);

      app.renderer.backgroundColor = 0x061639;
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

function randomizeStar(star, cameraZ, initial ) {
    star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000;

    // Calculate star positions with radial random coordinate so no star hits the camera.
    const deg = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 1;
    star.x = Math.cos(deg) * distance;
    star.y = Math.sin(deg) * distance;
}

// Scale mode for all textures, will retain pixelation
function addFlaver( app ){
  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

  const sprite = PIXI.Sprite.from('../img/masterFlaver.png');

  // Set the initial position
  sprite.anchor.set(0.5);
  sprite.x = app.screen.width / 2;
  sprite.y = app.screen.height / 2;

  // Opt-in to interactivity
  sprite.interactive = true;

  // Shows hand cursor
  sprite.buttonMode = true;
  sprite.scale.x *= 0.5;
  sprite.scale.y *= 0.5;
  // Pointers normalize touch and mouse
  sprite.on('pointerdown', function(){
    console.log('Click');
    //send();
      sprite.scale.x *= 0.75;
      sprite.scale.y *= 0.75;

      input = new PIXI.TextInput({
        input: {
          fontSize: '36px',
          padding: '12px',
          width: '500px',
          color: '#26272E'
        },
        box: {
          default: {fill: 0xE8E9F3, rounded: 12, stroke: {color: 0xCBCEE0, width: 3}},
          focused: {fill: 0xE1E3EE, rounded: 12, stroke: {color: 0xABAFC6, width: 3}},
          disabled: {fill: 0xDBDBDB, rounded: 12}
        }
      });

      input.placeholder = 'Enter your Text...';
      input.x = 500;
      input.y = 300;
      input.pivot.x = input.width/2;
      input.pivot.y = input.height/2;
      app.stage.addChild(input);

      input.on('keydown', keycode => {
        console.log('key pressed:', keycode);
        console.log('text:', input.text);
      });
  });

  // Alternatively, use the mouse & touch events:
  // sprite.on('click', onClick); // mouse-only
  // sprite.on('tap', onClick); // touch-only

  app.stage.addChild(sprite);
}
