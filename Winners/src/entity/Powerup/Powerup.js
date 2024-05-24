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
Winners.entity.Powerup = function (x, y, game, unKnownPlayer) {
  this.game = game;

  this.unKnownPlayer = unKnownPlayer;
  this.puX = 0;
  this.puY = 0;

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
// Override public prototype methods (ENGINE)
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
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Powerup.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);
  var m_this = this;
  if (this.unKnownPlayer == this.game.player2) {
    this.puX = 1230;
    this.puY = 35;
    this.player = this.game.player2;
    this.enemy = this.game.player;

    this.texture.replaceColor(
      new rune.color.Color24(34, 32, 52),
      new rune.color.Color24(32, 32, 32)
    );
  } else if (this.unKnownPlayer == this.game.player) {
    this.puX = 5;
    this.puY = 35;
    this.player = this.game.player;
    this.enemy = this.game.player2;
    this.texture.replaceColor(
      new rune.color.Color24(34, 32, 52),
      new rune.color.Color24(172, 50, 50)
    );
  }
  var puX = this.puX;
  var puY = this.puY;

  if (this.hitTest(this.player)) {
    if (this.player.powerupsArray.length < 3) {
      this.soundEffect.play(true);

      this.powerupCounter = new Winners.entity.PowerupCounter(
        this.game,
        this.player,
        { puX: puX, puY: puY },
        this.player,
        this.enemy
      );

      this.game.layer0.addChild(this.powerupCounter);
      this.player.powerupsArray.push(this.powerupCounter);

      this.player.powerupIx++;

      this.game.layer0.removeChild(this);
      this.dispose();
    }
  } else {
    this.game.timers.create({
      duration: 30000,
      onComplete: function () {
        this.layer0.removeChild(m_this);
      },
    });
  }
};

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Powerup.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------
