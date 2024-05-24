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
  this.ix = ix;
  this.x = 0;
  this.y = 0;
  this.player = player;
  this.enemy = enemy;
  

  this.type = "";

  this.powerupCords = powerupCords;
  if (this.ix.powerupIx === 0) {
    this.x = powerupCords.puX;
    this.y = powerupCords.puY;
  } else if (this.ix.powerupIx === 1) {
    this.x = powerupCords.puX + 15;
    this.y = powerupCords.puY;
  } else if (this.ix.powerupIx === 2) {
    this.ix.powerupIx = this.x = powerupCords.puX + 30;
    this.y = powerupCords.puY;
    this.SoldierTypesArray = [
      "heavysoldier",
      "snipersoldiers",
      "rocketsoldier",
      "repairsoldier",
    ];
    this.typeIx = Math.floor(Math.random() * 3);
   
    this.type = this.SoldierTypesArray[this.typeIx];
   
    this.createSoldier();
  }

  
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  

  /**
   * Calls the constructor method of the super class.
   */
 

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

 
};

Winners.entity.PowerupCounter.prototype.createSoldier = function () {
  var type = this.type;
  var m_this = this;
  this.game.timers.create({
    duration: 2000,
    onComplete: function () {
  
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

          

          break;

        default:
          console.log("Sorry, all the ", type, " are dead, RIP them :(");
      }
    },
  });
};

Winners.entity.PowerupCounter.prototype.emptyArray = function () {
  while (this.player.powerupsArray.length > 0) {
    var p = this.player.powerupsArray.splice(0, 1);
    p[0].parent.removeChild(p[0], true);
  }

  this.player.powerupsArray.length = 0;
  this.ix.powerupIx = 0;
  
};

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.PowerupCounter.prototype.dispose = function () {

  rune.display.Sprite.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------
