//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @param {object} game the game object
 * @param {object} player the player to which the object belongs
 * @param {object} powerupCoords an object containing the x & y coords of the powerup object
 * @param {object} enemy the enemy of the player object
 * @class
 * @classdesc
 *
 * Game scene.
 */
Winners.entity.PowerupCounter = function (game, player, powerupCoords, enemy) {
  this.game = game;
  this.player = player;
  this.enemy = enemy;
  this.powerupCoords = powerupCoords;
  /**
   * The x and y coords of the powerup counter object. They are set later
   * @type {number}
   */
  this.x = 0;
  this.y = 0;

  if (this.player.powerupIx === 0) {
    this.x = powerupCoords.puX;
    this.y = powerupCoords.puY;
  } else if (this.player.powerupIx === 1) {
    this.x = powerupCoords.puX + 15;
    this.y = powerupCoords.puY;
  } else if (this.player.powerupIx === 2) {
    /**
     * References to the index in which the powerupcounter object exists in the powerups array (powerupsArray)
     * @type {number}
     */
    // this.player.powerupIx =
    this.x = powerupCoords.puX + 30;
    this.y = powerupCoords.puY;

    this.SelectRandomSoldier();
    this.SelectRandomSoldier();
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
 * Methode creates checks the index property of the powerupcounter and cretas an array to pick the soldier type randomly.
 * @method
 * @returns {undefined}
 */
Winners.entity.PowerupCounter.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
};

/**
 * Method to selects a random soldier
 *
 * @returns {undefined}
 */

Winners.entity.PowerupCounter.prototype.SelectRandomSoldier = function () {
  /**
   * Private roprety to store a string that specifies the type of soldier to be generated after the player has collected 3 powerups.
   * @type {string}
   */
  var type = "";

  if (this.player.powerupIx === 2) {
    /**
     * References to the index in which the powerupcounter object exists in the powerups array (powerupsArray)
     * @type {number}
     */
    // this.player.powerupIx =
    this.x = this.powerupCoords.puX + 30;
    this.y = this.powerupCoords.puY;
    /**
     * An Array containing four different types of soldiers as strings
     * @type {Array}
     */
    this.SoldierTypesArray = [
      "heavysoldier",
      "repairsoldier",
      "snipersoldiers",
      "rocketsoldier",
    ];
    /**
     * Picks a random numbe between 0 and 3 and stores it in the typeIx property
     * @type {number}
     */
    this.typeIx = Math.floor(Math.random() * 4);
    /**
     * Indexes the the SoldierTypesArray with the number stored in typeIx to specify the type of soldier to be generated
     */
    type = this.SoldierTypesArray[this.typeIx];
    this.createSoldier(type);
  }
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *@method
 * @returns {undefined}
 */
Winners.entity.PowerupCounter.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);
};
/**
 * Method to generate a soldier of the specified type
 * @method
 *
 * @returns {undefined}
 */
Winners.entity.PowerupCounter.prototype.createSoldier = function (soldierType) {
  /**
   * Random x and y coords for the soldier, to avoid that the soldiers spawn on top of each other
   * @type {number}
   */
  var randomX = Math.floor(Math.random() * (1000 - 200 + 1)) + 200;
  var randomY = Math.floor(Math.random() * (250 - 150 + 1)) + 150;
  /**
   * Private variable to store the type of soldier to be generated
   * @type {string}
   */
  var type = soldierType;
  /**
   * Private variable to store the object
   * @type {Object}
   */
  var m_this = this;

  var reinforcementMessage = new  rune.text.BitmapField("reinforcement soldiers are on there way", "New Piskel-4");
  reinforcementMessage.autoSize = true;
  reinforcementMessage.scaleX = 2;
  reinforcementMessage.scaleY = 2;
  reinforcementMessage.x = 380;
  reinforcementMessage.y = 30;
  reinforcementMessage.backgroundColor = "#FFFF00"
  this.game.stage.addChild(reinforcementMessage);
  this.game.timers.create({
    duration: 4000,
    onComplete: function () {
      m_this.game.stage.removeChild(reinforcementMessage, true);
      switch (type) {
        case "heavysoldier":
          m_this.game.heavysoldiers = new Winners.entity.HeavySoldier(
            randomX,
            randomY,
            m_this.game,
            m_this.enemy,
            m_this.player
          );
          m_this.game.layer0.addChild(m_this.game.heavysoldiers);
          m_this.emptyArray();

          break;

        case "snipersoldiers":
          m_this.game.snipersoldiers = new Winners.entity.SniperSodier(
            randomX,
            randomY,
            m_this.game,
            m_this.enemy,
            m_this.player
          );
          m_this.game.layer0.addChild(m_this.game.snipersoldiers);
          m_this.emptyArray();

          break;

        case "rocketsoldier":
          m_this.game.rocketsoldier = new Winners.entity.Rocketsoldier(
            randomX,
            randomY,
            m_this.game,
            m_this.enemy,
            m_this.player
          );
          m_this.game.layer0.addChild(m_this.game.rocketsoldier);
          m_this.emptyArray();

          break;

        case "repairsoldier":
          m_this.game.repairsoldier = new Winners.entity.Repairsoldier(
            randomX,
            randomY,
            m_this.game,
            m_this.player
          );
          m_this.game.layer0.addChild(m_this.game.repairsoldier);
          m_this.emptyArray();

          break;
      }
    },
  });
};
/**
 * Method to empty the array containing the powerupcounter objects.
 *
 * @method
 *
 * @returns {undefined}
 */
Winners.entity.PowerupCounter.prototype.emptyArray = function () {
  while (this.player.powerupsArray.length > 0) {
    var p = this.player.powerupsArray.splice(0, 1);
    p[0].parent.removeChild(p[0], true);
  }
  this.player.powerupsArray.length = 0;
  this.player.powerupIx = 0;

};

/**
 *This method prepares the object to be removed from the memory by the garbage collector
 *
 *@method
 * @returns {undefined}
 */
Winners.entity.PowerupCounter.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
};