//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.Sprite
 * @param {number}  x ...
 * @param {number}  y ...
 * @param {object}  game ...
 * @param {object} unKnownPlayer reference to the player || plsayer2 object based on to which player the powerup belonges
 * @class
 * @classdesc
 *
 * Game scene.
 */
Winners.entity.Powerup = function (x, y, game, unKnownPlayer) {

  this.game = game;
  this.unKnownPlayer = unKnownPlayer;
  /**
   * The coordinates to specify where the powerup object should be renderd, these properties are set later  it the update method
   * @type {number}
   */
  this.puX = 0;
  this.puY = 0;
  /**
   * Property calling the builtin method for reading audio files
   * @type {media.Sound}
   */
  this.soundEffect = this.application.sounds.sound.get("powerupSound");

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  /**
   * Calls the constructor method of the super class.
   */
  rune.display.Sprite.call(this, x, y, 40, 40, "powerUp");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Powerup.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Powerup.prototype.constructor = Winners.entity.Powerup;

//------------------------------------------------------------------------------
// Override public prototype methods 
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Powerup.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
};

/**
 *  The update method of the bullets object, exutes its logic per tick
 *
 * @method
 *
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Powerup.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);
  /**
   * a private property to store the powerup object
   * @type {object}
   * 
   */
  var m_this = this;

  if (this.unKnownPlayer == this.game.player2) {
    this.puX = 1230;
    this.puY = 35;
    /**
     * Property refering to the player object
     * @type {object}
     */
    this.player = this.game.player2;
    /**
     * Property refering to the enemy object
     * @type {object}
     */
    this.enemy = this.game.player;

    this.texture.replaceColor(
      new rune.color.Color24(143, 151, 74),
      new rune.color.Color24(172, 50, 50)
    );
  } else if (this.unKnownPlayer == this.game.player) {
    this.puX = 5;
    this.puY = 35;
    /**
     * Property refering to the player object
     * @type {object}
     */
    this.player = this.game.player;
    /**
     * Property refering to the enemy object
     * @type {object}
     */
    this.enemy = this.game.player2;
    this.texture.replaceColor(
      new rune.color.Color24(143, 151, 74),
      new rune.color.Color24(42, 53, 23)
    );
  }
/**
 * Private properties to store the x & y coords of the powerup object after they have been set
 * @type {number}
 */
  var puX = this.puX;
  var puY = this.puY;

  if (this.hitTest(this.player)) {
    if (this.player.powerupsArray.length < 3) {
      this.soundEffect.play(true);
/**
 * A property to create a powerup counter object, that is renderd as a star on the top left or the top right of the screen depending on to which player the powerup belongs to. Each player can have maximum 3 powerups at a time.
 * @type {object}
 */
      this.powerupCounter = new Winners.entity.PowerupCounter(
        this.game,
        this.player,
        { puX: puX, puY: puY },
        this.enemy
      );

      this.game.layer0.addChild(this.powerupCounter);
      this.player.powerupsArray.push(this.powerupCounter);

      this.player.powerupIx++;

      this.game.camera.removeChild(this, true);
     
    }
  } else {
    this.game.timers.create({
      duration: 30000,
      onComplete: function () {
        this.camera.removeChild(m_this, true);
      },
    });
  }
};

/**
 * 
 *This method prepares the object to be removed from the memory by the garbage collector
 *
 *
 * @returns {undefined}
 */
Winners.entity.Powerup.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
};
