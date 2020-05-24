
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

  function testCollision( worldX, worldY, type="left" ){
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
      swal("Yeah you won!");
    } else {
      return collision;
    }
  }

  function testLose( worldY ){

    if( worldY > height + 100 && lose === 0 ){
      lose = 1;
      swal("Damn you lose!");
      swal({
        title: "Damn you lose!",
        text: "Wanna give it another try?",
        icon: '../img/flav.png',
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
      // el.addEventListener('keyright', (e) => {
      //   this.pressed[e.key] = true;
      // });
      // el.addEventListener('keyleft', (e) => {
      //   this.pressed[e.key] = true;
      // });
    }
  }

  document.body.appendChild(app.view);
  app.view.setAttribute('tabindex', 0);

  app.loader.load((loader, resources ) => {

    let kb = new Keyboard();

    kb.watch(app.view);

    let bgImage = new PIXI.Container();

    let bg = new PIXI.Container();

    //BASE IMAGES
    const backgroundImage = PIXI.Texture.from('../img/BG.png');

    const flav = PIXI.Texture.from('../img/flav.png');
    const flavD = PIXI.Texture.from('../img/flavD.png');
    const flavI = PIXI.Texture.from('../img/flavI.png');

    const bone1 = PIXI.Texture.from('../img/Tiles/Bone1.png');
    const bone2 = PIXI.Texture.from('../img/Tiles/Bone2.png');
    const bone3 = PIXI.Texture.from('../img/Tiles/Bone3.png');
    const bone4 = PIXI.Texture.from('../img/Tiles/Bone4.png');

    const tile1 = PIXI.Texture.from('../img/Tiles/Tile1.png');
    const tile2 = PIXI.Texture.from('../img/Tiles/Tile2.png');
    const tile3 = PIXI.Texture.from('../img/Tiles/Tile3.png');
    const tile4 = PIXI.Texture.from('../img/Tiles/Tile4.png');
    const tile5 = PIXI.Texture.from('../img/Tiles/Tile5.png');
    const tile6 = PIXI.Texture.from('../img/Tiles/Tile6.png');
    const tile7 = PIXI.Texture.from('../img/Tiles/Tile7.png');
    const tile8 = PIXI.Texture.from('../img/Tiles/Tile8.png');
    const tile9 = PIXI.Texture.from('../img/Tiles/Tile9.png');
    const tile10 = PIXI.Texture.from('../img/Tiles/Tile10.png');
    const tile11 = PIXI.Texture.from('../img/Tiles/Tile11.png');
    const tile12 = PIXI.Texture.from('../img/Tiles/Tile12.png');
    const tile13 = PIXI.Texture.from('../img/Tiles/Tile13.png');
    const tile14 = PIXI.Texture.from('../img/Tiles/Tile14.png');
    const tile15 = PIXI.Texture.from('../img/Tiles/Tile15.png');
    const tile16 = PIXI.Texture.from('../img/Tiles/Tile16.png');

    const arrow = PIXI.Texture.from('../img/Objects/ArrowSign.png');
    const bush1 = PIXI.Texture.from('../img/Objects/Bush1.png');
    const bush2 = PIXI.Texture.from('../img/Objects/Bush2.png');
    const crate = PIXI.Texture.from('../img/Objects/Crate.png');
    const deadBush = PIXI.Texture.from('../img/Objects/DeadBush.png');
    const tombStone1 = PIXI.Texture.from('../img/Objects/TombStone1.png');
    const tombStone2 = PIXI.Texture.from('../img/Objects/TombStone2.png');
    const tree = PIXI.Texture.from('../img/Objects/Tree.png');


    //BACKGROUND IMAGE
    let spriteBG = new PIXI.Sprite(backgroundImage);
    spriteBG.width = width;
    spriteBG.height = height;
    bgImage.addChild(spriteBG);

    //SCENARIO
    const flavBlocks = [ flav, flavD, flavI ];
    const charBlocks = [ bone1, bone2, bone3, bone4 ];
    const tileBlocks = [ '', tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9, tile10, tile11, tile12, tile13, tile14, tile15, tile16, arrow, bush1, bush2, crate, deadBush, tombStone1, tombStone2, tree ];

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

    //CHARACTER
    let char = new PIXI.Sprite(bone2);
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
      vy: 0,
      direction: 0
    };

    app.ticker.add( (time) => {
      char.x = character.x;
      char.y = character.y;
      character.vy = character.vy + 1;
      // character.y += character.vy;
      // character.x += character.vx;

      let touchingGround = testCollision(
        character.x, character.y + tileSizeY + 1, 'left'
      ) || testCollision(
        character.x + tileSizeX - 1, character.y + tileSizeY + 1, 'right'
      ) ;
      testLose(char.y);

      if( kb.pressed.ArrowUp && touchingGround){
        character.vy = -20;
      }
      if( character.vy > 0 ){
        for( let i = 0; i < character.vy; i++){
          let testX1 = character.x;
          let testX2 = ( character.x + tileSizeX - 1 ) ;
          let testY =( character.y + tileSizeY );
          // let testX2 = Math.floor(character.x / tileSizeX + tileSizeX - 1);
          if( testCollision( testX1, testY ) || testCollision( testX2, testY ) ){
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
        if( testCollision( testX1, testY ) || testCollision( testX2, testY ) ){
          character.vy = 0;
        }
        character.y += character.vy;
      }
      if( kb.pressed.ArrowRight){
        //character.vx = Math.min(10, character.vx + 2);
        if( character.vx < 15 ){
          character.vx = character.vx + 5;
        } else if( character.vx < 0 ){
          character.vx = 0;
        }
      }
      if( kb.pressed.ArrowLeft){
        // character.vx =  Math.max(-10, character.vx - 2);;
        if( character.vx > - 15 ){
          character.vx = character.vx - 5;
        } else if( character.vx > 0 ){
          character.vx = 0;
        }
      }
      if( character.vx > 0 ){
        character.x += character.vx;
        character.direction = 0;
        if( character.vx - 1 >= 0 ){
          character.vx -= 1;
        }
      }
      if( character.vx < 0 ){
        character.x += character.vx;
        character.direction = 2;
        if( character.vx + 1 <= 0 ){
          character.vx += 1;
        }
      }

      if(!touchingGround){
        // char.texture = flavBlocks[0];
        char.texture = charBlocks[character.direction + 1];
      } else {
        if( character.vx !== 0){
          // char.texture = flavBlocks[1];
          char.texture = charBlocks[( Math.floor( Date.now() / 100) % 3) + character.direction];
        } else {
          // char.texture = flavBlocks[2];
          char.texture = charBlocks[character.direction];
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
