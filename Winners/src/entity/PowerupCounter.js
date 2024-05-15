//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @class
 * @classdesc
 *
 * Game scene.
 */
Winners.entity.PowerupCounter = function (
  game,
  ix,
  powerupCords,
  player,
  enemy
) {
  this.game = game;
  this.ix =  ix;
  this.x = 0;
  this.y = 0;
  this.player = player;
  this.enemy = enemy;
  // console.log(this.enemy)
  // console.log(this.player)
  // console.log(this.ix)

  this.type = "";

  this.powerupCords = powerupCords;
  if (this.ix.powerupIx === 0) {
    this.x = powerupCords.puX;
    this.y = powerupCords.puY;
  } else if (this.ix.powerupIx === 1) {
    this.x = powerupCords.puX + 15;
    this.y = powerupCords.puY;
  } else if (this.ix.powerupIx === 2) {
    this.ix.powerupIx = 
    this.x = powerupCords.puX + 30;
    this.y = powerupCords.puY;
    this.SoldierTypesArray = [
      "heavysoldier",
      "snipersoldiers",
      "rocketsoldier",
      "repairsoldier",
    ];
    this.typeIx = Math.floor(Math.random() * 3);
    // console.log(this.typeIx)
    this.type = this.SoldierTypesArray[this.typeIx];
   // this.type = "snipersoldiers"
    this.createSoldier();
  }

  // this.arrayIx = 0;

  // console.log(this.powerupArray[0])

  // console.log(this.game.powerupsArr.indexOf(this))
  // console.log(this.game.powerupsArr.length);
  // console.log(this.game.powerupsArr[1])
  //     if (this === this.game.powerupsArr[0]){
  //      this.x = x;
  //      this.y = y;
  //      console.log(this.game.powerupsArr[0])
  //     } else if(this === this.game.powerupsArr[1]){
  //         this.x = x + 15;
  //         this.y = y;
  //         console.log(this.game.powerupsArr[1])
  //     }  else if(this === this.game.powerupsArr[2]){
  //         this.x = x + 30;
  //         this.y = y;
  //         console.log(this.game.powerupsArr[2])

  //     }
  // console.log(this.game.layer0.numChildren)
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  //console.log(this.parentOb.powerupsArr)

  /**
   * Calls the constructor method of the super class.
   */
  // rune.display.Sprite.call(this, this.powerUpx,  this.powerUpy, 16, 16, "star" );

  rune.display.Sprite.call(this, this.x, this.y, 16, 16, "star");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.PowerupCounter.prototype = Object.create(
  rune.display.Sprite.prototype
);
Winners.entity.PowerupCounter.prototype.constructor =
  Winners.entity.PowerupCounter;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.PowerupCounter.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.PowerupCounter.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);

  // this.powerupArray[this.powerupIx]

  //     if ( this.powerupIx === 0){
  //    console.log(this.powerupArray[this.powerupIx])
  //         //this.powerupArray[this.powerupIx]
  //      this.powerUpx =  this.powerupArray[this.powerupIx].puX;
  //      this.powerUpy =  this.powerupArray[this.powerupIx].puY;
  //     // rune.display.Sprite.call(this, this.powerUpx,  this.powerUpy, 16, 16, "star" );
  //        // rune.display.Sprite.call(this, this.powerupArray[0].puX,  this.powerupArray[0].puY, 16, 16, "star" );
  //     } else if (this.powerupArray[1]){
  //        // console.log( this.powerupArray[0].puX)

  //         this.powerUpx =  this.powerupArray[1].puX + 15;
  //         this.powerUpy =  this.powerupArray[1].puY;

  //         // rune.display.Sprite.call(this, this.powerupArray[0].puX + 15,  this.powerupArray[0].puY, 16, 16, "star" );
  //      }

  //      rune.display.Sprite.call(this, this.powerUpx,  this.powerUpy, 16, 16, "star" );
  //     //  if (this.powerupArray[2]){
  //     //    // console.log( this.powerupArray[0].puX)
  //     //    rune.display.Sprite.call(this, this.powerUpx,  this.powerUpy, 16, 16, "star" );
  //     //     this.powerUpx = this.powerupArray[0].puX + 30;
  //     //     this.powerUpy = this.powerupArray[0].puY;
  //     //   //  rune.display.Sprite.call(this, this.powerUpx,  this.powerUpy, 16, 16, "star" );
  //     // }
  //      rune.display.Sprite.call(this, this.powerUpx,  this.powerUpy, 16, 16, "star" );

  // this.hitTestAndSeparate(this.game.player2)
  // this.hitTestAndSeparate(this.game.player)
  // if (this.hitTestAndSeparate(this.game.player2)) {
  //     this.velocity.x = 0;
  //     this.velocity.y = 0;
  //     console.log('.-.-.-.')
  //    return;

  //   }
  // this.hitTestAndSeparate()
};

Winners.entity.PowerupCounter.prototype.createSoldier = function () {
  var type = this.type;
  var m_this = this;
   this.game.timers.create({ 
    duration: 2000,
    onComplete: function () {
       // console.log(m_this.game.player.powerupsArray.length)
  switch (type) {
    case "heavysoldier":
      m_this.game.heavysoldiers = new Winners.entity.HeavySoldier(
        350,
        360,
        m_this.game,
        m_this.enemy
      );
      m_this.game.layer0.addChild(m_this.game.heavysoldiers);
      m_this.emptyArray();
     
      console.log("heavysoldier");
      break;

    case "snipersoldiers":
      m_this.game.snipersoldiers = new Winners.entity.SniperSodier(
        10,
        10,
        m_this.game,
        m_this.enemy
      );
      m_this.game.layer0.addChild(m_this.game.snipersoldiers);
      m_this.emptyArray();
     
      console.log("snipersoldiers");

      break;

    case "rocketsoldier":
      m_this.game.rocketsoldier = new Winners.entity.Rocketsoldier(
        50,
        50,
        m_this.game,
        m_this.enemy
      );
      m_this.game.layer0.addChild(m_this.game.rocketsoldier);
      m_this.emptyArray();
    
      console.log("rocketsoldier");

      break;

    case "repairsoldier":
      m_this.game.repairsoldier = new Winners.entity.Repairsoldier(
        700,
        700,
        m_this.game,
        m_this.player
      );
      m_this.game.layer0.addChild(m_this.game.repairsoldier);
      m_this.emptyArray();

      console.log("repairsoldier");

      break;

    default:
       

      console.log("Sorry, all the ", type, " are dead");
  }
    },
  });

};

Winners.entity.PowerupCounter.prototype.emptyArray = function () {

    console.log(this.type)

    // while (this.player.powerupsArray.length > 0) {
    //     var powerupElem = this.player.powerupsArray[0]; //  always get the 1st element
    //     console.log(powerupElem);
    //     this.game.layer0.removeChild(powerupElem);
    //     this.player.powerupsArray.splice(0, 1); // remove the 1st element
    //     console.log(this.player.powerupsArray.length);
    // }

    while (this.player.powerupsArray.length > 0) {
        var p = this.player.powerupsArray.splice(0,1);
        p[0].parent.removeChild(p[0], true);

    }

    this.player.powerupsArray.length = 0;
    this.ix.powerupIx = 0;
    console.log(">> " + this.player.powerupsArray.length);
    
    /*
  for (var i = 0; i < 3; i++) {
    var powerupElem = this.player.powerupsArray[i];
   
    if (i === 3){
        this.player.powerupsArray.splice(3, 1, powerupElem)
        this.game.layer0.removeChild(powerupElem); 
        this.player.powerupsArray = []
        this.player.powerupsArray.length = 0
        console.log(this.player.powerupsArray.length)
    }
    this.player.powerupsArray.splice(i, 1, powerupElem)
    this.game.layer0.removeChild(powerupElem)
 
   
    console.log(this.player.powerupsArray.length)
 }
    */
        
    
};

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.PowerupCounter.prototype.dispose = function () {
  console.log("PowerupCounter is disposed");
  rune.display.Sprite.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------
