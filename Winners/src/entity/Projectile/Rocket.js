//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @param {object} game reference to the game object
 * @param {object} layer0 the container layer of the bullet objects
 * @param {object} bulletOwner reference to the object that generated the bullets object
 * @param {object} bulletTarget reference to the enemy of the object that generated bullets object
 * @param {object} bullets the bullets object that instantiates the bullet objects
 * @param {number} x ...
 * @param {number} y ...
 * @class
 * @classdesc
 *
 * Represents a bullet.
 */

Winners.entity.Rocket = function (
  game,
  layer0,
  bulletOwner,
  bulletTarget,
  bullets,
  x,
  y
) {
  this.game = game;
  this.damage = 50;

  /**
   * Referance to the display object container
   * @type {object}
   */

  this.layer0 = layer0;
  this.bulletOwner = bulletOwner;
  this.bulletTarget = bulletTarget;
  this.bullets = bullets;
  this.soundEffect = this.application.sounds.sound.get("rocketSound");
  this.soundEffect.play(true);

  rune.display.Sprite.call(this, x, y, 16, 16, "rocket");

  this.m_speed = 0.0002;
};

Winners.entity.Rocket.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Rocket.prototype.constructor = Winners.entity.Rocket;
/**
 * Calling this.m_initAnimation(). Calls automatically upon initialization
 * @method
 * @returns {undefined}
 */
Winners.entity.Rocket.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
  this.m_initAnimation();
};
/**
 * Method to calll the inbuilt animation.create method to create animation for the active mode
 *
 * @method
 *
 * @returns {undefined}
 * @private
 */

Winners.entity.Rocket.prototype.m_initAnimation = function () {
  this.animation.create("active", [0, 1, 2, 3], 5, true);
  this.animation.gotoAndPlay("active");
};
/**
 * The update method of the rocket object, excutes its logic per tick
 *
 * @method
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Rocket.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);

  /**
   * Referance to the rocket class
   * @type {object}
   */
  var m_this = this;

  this.animation.gotoAndPlay("walk");

  if (this.hitTest(this.bulletTarget)) {
    this.layer0.removeChild(this, true);

    this.game.bullets.bullet.handelHp(
      this.damage,
      this.bulletTarget,
      this.bulletOwner
    );
  }
};
/**
 *This method prepares the object to be removed from the memory by the garbage collector
 *
 *@method
 * @returns {undefined}
 */
Winners.entity.Rocket.prototype.dispose = function () {
  rune.display.DisplayObject.prototype.dispose.call(this);
};
