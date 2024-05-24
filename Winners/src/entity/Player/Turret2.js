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
Winners.entity.Turret2 = function (x, y, game) {
  /**
   * placeholder to refer to the second player
   */
  this.turret1 = null;
  this.game = game;
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  /**
   * Calls the constructor method of the super class.
   */
  rune.display.Sprite.call(this, x, y, 64, 64, "turret-remake");
};

//----------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Turret2.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Turret2.prototype.constructor = Winners.entity.Turret2;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Turret2.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);

  this.texture.replaceColor(
    new rune.color.Color24(0, 0, 0),
    new rune.color.Color24(32, 32, 32)
  );

  this.m_initPhysics();
  this.m_initAnimation();
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Turret2.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);
  this.m_torretRotation();
};

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Turret2.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------
Winners.entity.Turret2.prototype.shotAnimation = function () {
  this.animation.gotoAndPlay("shot");
};
/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
Winners.entity.Turret2.prototype.m_initPhysics = function () {
  this.rotation = -90;
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
Winners.entity.Turret2.prototype.m_initAnimation = function () {
  this.animation.create("shot", [0], 2, 2, 2, true);
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */

Winners.entity.Turret2.prototype.m_torretRotation = function () {
  var gamepad = this.gamepads.get(1);

  if (gamepad.stickRightLeft || this.keyboard.pressed("J")) {
    this.rotation -= 5;
  } else if (gamepad.stickRightRight || this.keyboard.pressed("L")) {
    this.rotation += 5;
  } else if (gamepad.stickRightUp) {
    this.rotation -= 5;
  } else if (gamepad.stickRightDown) {
    this.rotation += 5;
  }
};
