//^^^^^^^^^^^^^PORTIS ^^^^^^^^^^^^^^^^^^^^^^
const portis = new Portis('e5db955b-2f47-44bb-8f93-2bee14739d57', 'mainnet');
const web3 = new Web3(portis.provider);

let cuenta = '';


//Jugador inicia sesión
portis.onLogin(walletAddress => {
  console.log("User logged in");
  console.log('Wallet address: '+ walletAddress);

   //Show logout button
   var logoutBtn = document.getElementById("logout");
   logoutBtn.style.display = "block";
});

portis.onLogout(() => {
  console.log("User logged out");
  document.getElementById("app").innerHTML = ``;

  //Hide logout button
  let logoutBtn = document.getElementById("logout");
  logoutBtn.style.display = "none";
});

document.getElementById("login").onclick = () => {
  let acc = portis.showPortis();
  console.log(acc);
}
document.getElementById("logout").onclick = () => {
  portis.isLoggedIn().then(({ error, result }) => {
    if (result) {
      console.log("Logging out user");
      portis.logout();
    } else if (error) {
      console.log(error);
    } else {
      console.log("User is already logged out!");
    }
  });
};

//Control de errores
portis.onError(error => {
  console.log('error', error);
});


// ^^^^^^^^^^^^^^^^^^^^^CHOOSE NETWORK ^^^^^^^^^^^^

let currentNetwork= "mainnet";

const to = "0x33efbb5233f082bd3d6fbff727569117f0e4b048";
const amount = 12;

let networks = `
    <a class="dropdown-item network" title="mainnet">
      mainnet - Ethereum main network
    </a>
    <a class="dropdown-item network" title="ropsten">
      ropsten - Ethereum ropsten network
    </a>
    <a class="dropdown-item network" title="rinkeby">
      rinkeby - Ethereum rinkeby network
    </a>
    <a class="dropdown-item network" title="goerli">
      goerli - Ethereum goerli network
    </a>
    <a class="dropdown-item network" title="ubiq">
      ubiq - ubiq main network
    </a>
    <a class="dropdown-item network" title="thundercoreTestnet">
      thundercoreTestnet - thundercore test network
    </a>
    <a class="dropdown-item network" title="orchid">
      orchid - RootStock main network
    </a>
    <a class="dropdown-item network" title="orchidTestnet">
      orchidTestnet - RootStock test network
    </a>
    <a class="dropdown-item network" title="kovan">
      kovan - Ethereum kovan network
    </a>
    <a class="dropdown-item network" title="classic">
      classic - Ethereum Classic main network
    </a>
    <a class="dropdown-item network" title="sokol">
      sokol - POA test network
    </a>
    <a class="dropdown-item network" title="core">
      core - POA main network
    </a>
    <a class="dropdown-item network" title="xdai">
      xdai - xDai main network
    </a>
    <a class="dropdown-item network" title="thundercore">
      thundercore - thundercore main network
    </a>
    <a class="dropdown-item network" title="fuse">
      fuse - fuse main network
    </a>
    <a class="dropdown-item network" title="lightstreams">
      lightstreams - lightstreams main network
    </a>
    <a class="dropdown-item network" title="maticAlpha">
      maticAlpha - matic alpha network
    </a>
    <a class="dropdown-item network" title="maticTestnet">
      maticTestnet - matic test network
    </a> `;

let networksList = document.getElementById('networksList');
networksList.innerHTML = networks;

let netList = document.getElementsByClassName('network');

for(let el of netList) {
  el.addEventListener("click", function() {
      const currentNetwork = this.title;
      console.log(currentNetwork);
      document.getElementById('currentNetwork').innerHTML = currentNetwork;
      portis.changeNetwork(currentNetwork);
  }, false);
}

async function send() {

  web3.eth.getAccounts((error, accounts) => {
    const acc = accounts;
    web3.currentProvider.sendAsync(
      {
        id: 42,
        method: "eth_sendTransaction",
        params: [
          {
            id: 1548504580559614,
            from: acc[0],
            to: to,
            value: convertToHexWei(amount)
          }
        ]
      },
      (error, response) => {
        console.log(error, response);
      }
    );
  });
}

function convertToHexWei(value) {
  const wei = value * 10 ** 18;
  const hexWei = wei.toString(16);
  return `0x${hexWei}`;
}



function providers(){
  console.log('PROVIDERS');
  let providers = document.getElementById('providers');
  providers.style.display = 'block';
  let profile = document.getElementById('profile');
  profile.style.display = 'none';
  let gameAave = document.getElementById('gameAave');
  gameAave.style.display = 'none';
}


//^^^^^^^^^^^^^^^^ PROFILE ^^^^^^^^^^^^^^^^^^
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
  const starTexture = PIXI.Texture.from('https://siasky.net/AAC3aiZ7W5VFbJAwXYv2V5iPzk_82Dz-6OVdj2TK6gK8og');

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

  const sprite = PIXI.Sprite.from('https://siasky.net/HAEN-EqVa7v4PAoyg4H3QsifgPjjroPJ1rh43VBA9z0znw');

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

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ GAME ^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//BASE IMAGES
//code before the pause
setTimeout(function(){
    //do what you need here
    const backgroundImage = PIXI.Texture.from('https://siasky.net/jAAW6BE28mpocNs0slxYWoogyM2-O9iEHeNrUhTDJriseg');
    const flav = PIXI.Texture.from('https://siasky.net/BAAoCNYOZywkvSX9ikb8Q-DGSvyqs8KOnh1bbWk7LjYNvQ');
    const flavD = PIXI.Texture.from('https://siasky.net/BAAarMjoT4X-Auh6IVEOlg1fjrNMCyfzQ4qtRwGmEpylmA');
    const flavI = PIXI.Texture.from('https://siasky.net/BABz6sRhK7v1BUbkDjwB0_grTSM6BBLGjabH4oRIuqY2Lw');
    const flavUp = PIXI.Texture.from('https://siasky.net/MAAHs61lsxy3TYBp-ZCwmKtVJQ2cb-HYgPbB0A2F3CqnAg');
}, 2000);
//code before the pause
setTimeout(function(){
    //do what you need here
    const bone1 = PIXI.Texture.from('https://siasky.net/CACJ9niCXdrABAXlYM0n1Tyxp2pNSaYrsx-Y0Fl3zJH0pA');
    const bone2 = PIXI.Texture.from('https://siasky.net/CACqd_PT-hHra39kSk3RlxehbuQJ_izrvON2CL38mTi4wA');
    const bone3 = PIXI.Texture.from('https://siasky.net/CACYPWyPPTPtf59CHcUlybTf19IhUh9jvB01aYpFtAdOzQ');
    const bone4 = PIXI.Texture.from('https://siasky.net/AACOTxULRHV_ZxfyNLpvd9k2a5o44f5-Pi356fzCCkcbmw');
}, 2000);
//code before the pause
setTimeout(function(){
    //do what you need here
    const tile1 = PIXI.Texture.from('https://siasky.net/EAA_As6KhD0x97V8ezq9JxmtivBjP12xBB0YGRtF-3kE0w');
    const tile2 = PIXI.Texture.from('https://siasky.net/CAAQwwpft9GVd2FAFfA5LLQSVuDMu-mrlwzo5ncsCC90KA');
    const tile3 = PIXI.Texture.from('https://siasky.net/EABWlM0TKfnCUVBaP0whdKFucVMFl54Oa7SmIu1R2zM-Tw');
    const tile4 = PIXI.Texture.from('https://siasky.net/CACUapOtuItJ6bvf9w9w2bZq9BXx9LcRMj3DPjEkNSdWmw');
    const tile5 = PIXI.Texture.from('https://siasky.net/AADplBy31B8Vl8R0p9BrSE03l7XDMLPenPesTvE_8W_Sww');
}, 2000);
//code before the pause
setTimeout(function(){
    //do what you need here
    const tile6 = PIXI.Texture.from('https://siasky.net/CADpwOu4HzKCsFti52zjGYxvVWpu77j7jj0ZT8dx_CvvpA');
    const tile7 = PIXI.Texture.from('https://siasky.net/CADl6DO9DQp9sqlAaVB9i7Ja0gt7pOnuLwizU5CbL_UX_A');
    const tile8 = PIXI.Texture.from('https://siasky.net/CACyZ-2FMGWjGJz-_3ru-uSovNSVfDN7-QDMJgXEDa8gcQ');
    const tile9 = PIXI.Texture.from('https://siasky.net/CABiZwAqZHlpphuILPZYhKc0y-dVg5NqzkWBHd1mjgCvWQ');
    const tile10 = PIXI.Texture.from('https://siasky.net/CABe9XmcWNoIm3fQ0Jr9o4UmXohAeY79sK_pMDVhaa1MMQ');
}, 2000);
//code before the pause
setTimeout(function(){
    //do what you need here
    const tile11 = PIXI.Texture.from('https://siasky.net/CACpsuPhWeczgxvKx4rympwRW36W3BGc7csEukXXHwa4Hg');
    const tile12 = PIXI.Texture.from('https://siasky.net/CAAIxKtnTPhT5dSfrFy1uggomLsh4sqizwOGK9J9IEzVUA');
    const tile13 = PIXI.Texture.from('https://siasky.net/CACpMupm8RUnDADaWh8ZkV7iv7mz7Aouuji_LuQEm4jMxQ');
    const tile14 = PIXI.Texture.from('https://siasky.net/CABloV3H5rI1TSefDIZR1R9lE3s00LmjrGB0Qs797SuxhQ');
    const tile15 = PIXI.Texture.from('https://siasky.net/CABaZfDOtFd2TE-2QuP3OfeX23bA7H-f_XybwW80LThyxA');
}, 2000);
//code before the pause
setTimeout(function(){
    //do what you need here
    const tile16 = PIXI.Texture.from('https://siasky.net/CAC2TJhaYP-L_GcmuedSVXNknd1WdpqID0xog7h4oc0Sqw');
    const aave = PIXI.Texture.from('https://siasky.net/EADOeOG9hh0Kh0sYO6ZARy1BHySF0OlZrn--HUlLv9po9g');
    const arrow = PIXI.Texture.from('https://siasky.net/AAB60UXdYoamzTdWRfKKh6ZTU92RJNeBjHgJiicaAl3QWg');
    const bush1 = PIXI.Texture.from('https://siasky.net/AADi8Hv6CQTJPrAFOvembyN5zW5UHbWceJemU9uygyJPag');
}, 2000);
//code before the pause
setTimeout(function(){
    //do what you need here
    const bush2 = PIXI.Texture.from('https://siasky.net/AABbNmy7qVgr_0suRsq4Y_AlecN9Yj2MPosWMV8ObjoF3Q');
    const crate = PIXI.Texture.from('https://siasky.net/AAB5R54R5ryiRdmDMhFYVZqTeNAeduqvwNdcDvvvke5Sog');
    const deadBush = PIXI.Texture.from('https://siasky.net/CACQ2lxw-ytEl5tIwXzMM5axL18HJLnc9IMR2un376smxQ');
    const skeleton = PIXI.Texture.from('https://siasky.net/CAACznNcmjknU8HCiPa9VaIQUcRZGiCyeTsvvOFWyKWYEw');
}, 2000);
//code before the pause
setTimeout(function(){
    //do what you need here
    const sign = PIXI.Texture.from('https://siasky.net/AAAYg0Vzx97ZDOlHcKBmyafteWJL74WQdMKGYvBpha-v2Q');
    const tombStone1 = PIXI.Texture.from('https://siasky.net/AABSVFt9Gbv_evNvJ0g-KRaYD-mRqh6iAPX1lVA94L4VRg');
    const tombStone2 = PIXI.Texture.from('https://siasky.net/AACsHSrVwSJLRCXmb9ZT4X8qdTEXFBvdkROnH08ygfnvIw');
    const tree = PIXI.Texture.from('https://siasky.net/IABJjyU3dOmUUPJh9NPtJfHZbKgD2pkv616uiIgMW9H9GQ');
}, 2000);





function playAave(){
  console.log('INICIO');
  let providers = document.getElementById('providers');
  providers.style.display = 'none';
  let profile = document.getElementById('profile');
  profile.style.display = 'none';
  let gameAave = document.getElementById('gameAave');
  gameAave.style.display = 'block';
  // PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;


  let height = window.innerHeight;
  let width = window.innerWidth-20;

  const app = new PIXI.Application({
    view: gameAave,
    width: width,
    height: height,
    transparent: true
  });

  let xTiles = 22;
  let yTiles = 13;
  let lose = 0;
  let win = 0;

  let tileSizeX = ( width - 80 ) / xTiles;
  let tileSizeY = ( height - 80 ) / yTiles;

  //MAPA DE FONDO + MAPA DE COLISIÓN
  let map = {
    width: xTiles,
    height: yTiles,
    tiles : [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 16,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 15, 15, 16, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20,
      0, 0, 14, 15, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 16,
      0, 22, 0, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 2, 2, 2, 2, 3, 0, 0, 1, 2, 2, 2, 2, 2, 2, 3, 0, 0, 0, 0, 19, 0,
      4, 5, 5, 5, 5, 6, 0, 0, 4, 5, 5, 5, 5, 5, 5, 6, 0, 0, 14, 15, 16, 0,
      12, 9, 9, 9, 9, 13, 0, 0, 12, 9, 9, 9, 9, 9, 9, 13, 0, 0, 0, 0, 0, 0
    ],
    collision : [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
      0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
      1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0,
      1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0
    ]
  };

  function testCollision( character, worldX, worldY, type="left" ){
    let obj;
    if( type === 'left'){
      obj = Math.ceil;
    } else {
      obj = Math.ceil;
    //  obj = Math.floor;
    }
    let mapX = obj(worldX / tileSizeX);
    let mapY = obj(worldY / tileSizeY);

    let collision = map.collision[ mapY * map.width + mapX ];

    if( collision == 2 ){
      character.vx = 0;
      character.vy = 0;
      swal("Yeah you won!");
    } else {
      return collision;
    }
  }

  function testLose( worldX, worldY ){

    loseGame = 0;
    if( worldY > height + 100 && lose === 0 ){
      loseGame = 1;
    }
    if( worldX < -20 && lose === 0 ){
      loseGame = 1;
    }
    if( worldX > width + 100 && lose === 0 ){
      loseGame = 1;
    }

    if(loseGame === 1){
      lose = 1;
      swal({
        title: "Damn you lose!",
        text: "Wanna give it another try?",
        icon: 'https://siasky.net/BAAoCNYOZywkvSX9ikb8Q-DGSvyqs8KOnh1bbWk7LjYNvQ',
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          playAave();
        } else {
          location.reload();
        }
      });
    }
  }

  class Keyboard {
    constructor(){
      this.pressed = {};
    }

    watch (el){
      el.addEventListener('keydown', (e) => {
        this.pressed[e.key] = true;
      });
      el.addEventListener('keyup', (e) => {
        this.pressed[e.key] = true;
      });
      el.addEventListener('keyright', (e) => {
        this.pressed[e.key] = true;
      });
      el.addEventListener('keyleft', (e) => {
        this.pressed[e.key] = true;
      });
    }
  }

  document.body.appendChild(app.view);
  app.view.setAttribute('tabindex', 0);

  let bgImage = new PIXI.Container();

  let bg = new PIXI.Container();



  //BACKGROUND IMAGE
  let spriteBG = new PIXI.Sprite(backgroundImage);
  spriteBG.width = width;
  spriteBG.height = height;
  bgImage.addChild(spriteBG);

  //SCENARIO
  const flavBlocks = [ flav, flavD, flavI, flavUp ];
  const charBlocks = [ bone1, bone2, bone3, bone4 ];
  const tileBlocks = [ '', tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9, tile10, tile11, tile12, tile13, tile14, tile15, tile16, arrow, bush1, bush2, crate, deadBush, tombStone1, tombStone2, tree, aave ];

  for( let x = 0; x < map.width; x++ ){
    for( let y = 0; y < map.height; y++ ){
      let tile = map.tiles[ y * map.width + x ];
      if( tile != ''){
        let sprite = new PIXI.Sprite(tileBlocks[tile]);
        // Setup the position of the bunny
        sprite.x = x * tileSizeX;
        sprite.y = y * tileSizeY + 20;
        sprite.width = tileSizeX;
        sprite.height = tileSizeY;
        bg.addChild(sprite);
      }
    }
  }
  bg.scale.x = 1;
  bg.scale.y = 1;
  app.renderer.view.setAttribute('tabindex', 0);
  app.loader.load((loader, resources ) => {

    let kb = new Keyboard();

    kb.watch(app.view);


    //CHARACTER
    let char = new PIXI.Sprite(flav);
    char.scale.x = 1;
    char.scale.y = 1;
    // char.height = tileSizeY;
    // char.width = tileSizeX;
    console.log(tileSizeY);
    console.log(tileSizeX);
    char.anchor.x = 0;
    char.anchor.y = 0;


    app.stage.addChild(bgImage);
    app.stage.addChild(bg);
    app.stage.addChild(char);

    let character = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0
    };

    app.ticker.add( (time) => {
      char.x = character.x;
      char.y = character.y;
      character.vy = character.vy + 1;
      // character.y += character.vy;
      // character.x += character.vx;

      //left barrier
      if( char.x < 2 ){
        char.x = 2;
      }

      //Check touch ground
      let touchingGround = testCollision( character,
        character.x, character.y + tileSizeY + 1, 'left'
      ) || testCollision( character,
        character.x + tileSizeX - 1, character.y + tileSizeY + 1, 'right'
      ) ;
      let touchingCeiling = testCollision( character,
        character.x, character.y, 'left'
      ) || testCollision( character,
        character.x + tileSizeX - 1, character.y, 'right'
      ) ;

      //Check lost game
      testLose(char.x,char.y);

      if( kb.pressed.ArrowRight ){
        character.vx = 6;
        //character.vx = Math.min(10, character.vx + 2);
        // if( character.vx < 10 ){
          //   character.vx = character.vx + 1;
          // } else if( character.vx < 0 ){
            //   character.vx = 0;
            // }
          }
          if( kb.pressed.ArrowLeft ){
            // character.vx =  Math.max(-10, character.vx - 2);;
            character.vx =  -6;
            // if( character.vx > - 10 ){
              //   character.vx = character.vx - 1;
              // } else if( character.vx > 0 ){
                //   character.vx = 0;
                // }
              }
              if( character.vx > 0 ){
                let testX2 = ( character.x + tileSizeX + 1 ) ;
                let testY =( character.y + 1);
                // let testX2 = Math.floor(character.x / tileSizeX + tileSizeX - 1);
                if( testCollision( character, testX2, testY ) ){
                  character.vx = 0;
                }

                character.x += character.vx;
                // if( character.vx - 3 >= 0 && touchingGround){
                  //   character.vx -= 3;
                  // } else if( character.vx - 1 <= 0 && touchingGround ){
                    //   character.vx -= 1;
                    // } else if( character.vx - 1 <= 0 ) {
                      //   character.vx -= 0.1;
                      // }
                    }
                    if( character.vx < 0 ){
                      let testX1 = character.x;
                      let testY =( character.y + 1 );
                      // let testX2 = Math.floor(character.x / tileSizeX + tileSizeX - 1);
                      if( testCollision( character, testX1, testY ) ){
                        character.vx = 0;
                      }
                      character.x += character.vx;
                      // if( character.vx + 3 <= 0 && touchingGround ){
                        //   character.vx += 3;
                        // } else if( character.vx + 1 <= 0 && touchingGround ){
                          //   character.vx += 1;
                          // } else if( character.vx + 1 <= 0 ) {
                            //   character.vx += 0.1;
                            // }
                          }
      if( kb.pressed.ArrowUp && touchingGround){
        character.vy = -20;
      }
      if( character.vy > 0 ){
        for( let i = 0; i < character.vy; i++){
          let testX1 = character.x;
          let testX2 = ( character.x + tileSizeX - 1 ) ;
          let testY =( character.y + tileSizeY );
          // let testX2 = Math.floor(character.x / tileSizeX + tileSizeX - 1);
          if( touchingGround ){
            character.vy = 0;
            break;
          }
          character.y = character.y + 1;
        }
      }
      if( character.vy < 0 ){
        let testX1 = character.x;
        let testX2 = ( character.x + tileSizeX - 1 ) ;
        let testY =( character.y );
        // let testX2 = Math.floor(character.x / tileSizeX + tileSizeX - 1);
        if( testCollision( character, testX1, testY ) || testCollision( character, testX2, testY ) ){
          character.vy = 0;
        }
        character.y += character.vy;
      }

      if(!touchingGround){
        char.texture = flavBlocks[3];
      } else {
        if( character.vx > 0){
          char.texture = flavBlocks[1];
        } else if( character.vx < 0){
          char.texture = flavBlocks[2];
        } else {
          char.texture = flavBlocks[0];
        }
      }
      kb.pressed.ArrowUp = false;
      kb.pressed.ArrowRight = false;
      kb.pressed.ArrowLeft = false;

    });
  });

  // load the texture we need
  app.loader.onError.add((error)=>{console.log(error);});

}

//^^^^^^^^^^^^^^ INDEX ^^^^^^^^^^^^^^^^

document.getElementById("lopSection").addEventListener("click", function(){
  providers();
});

document.getElementById("profileSection").addEventListener("click", function(){
  profile();
});

document.getElementById("playAave").addEventListener("click", function(){
  playAave();
});




providers();
