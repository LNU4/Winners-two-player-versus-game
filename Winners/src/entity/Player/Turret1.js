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
Winners.entity.Turret1 = function (x, y, game) {
  /**
   * Reference to the game class
   * @type {object}
   */
  this.game = game;
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  rune.display.Sprite.call(this, x, y, 64, 64, "turret-remake");
};

//----------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Turret1.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Turret1.prototype.constructor = Winners.entity.Turret1;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Turret1.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);

  this.texture.replaceColor(
    new rune.color.Color24(0, 0, 0),
    new rune.color.Color24(50, 60, 150)
  );
  this.rotation = 90;
  this.m_initAnimation();
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Turret1.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);
  this.m_torretRotation();
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 * Method to handle the animation creatation related to the turret class.
 * @returns {undefined}
 * @private
 */

Winners.entity.Turret1.prototype.m_initAnimation = function () {
  this.animation = new rune.animation.Animation();
  this.animation.create("idle", [0], 1, true);
  this.animation.create("shot", [0, 2, 2, 2, 2, 2, 0], 10, false);
};

/**
 * ...
 * Method that handles the turret rotation
 * @returns {undefined}
 * @private
 */

Winners.entity.Turret1.prototype.m_torretRotation = function () {
  /**
   *  properties to speicify the first gamepad as a controller
   * @type {Object}
   */
  var gamepad = this.gamepads.get(0);

  if (gamepad.stickRightLeft || this.keyboard.pressed("J")) {
    /**
     * speicify on how many degrees to rotate for time the gamepad input is pressed
     * @type {number}
     */
    this.rotation -= 5;
  } else if (gamepad.stickRightRight || this.keyboard.pressed("L")) {
    this.rotation += 5;
  } 
};

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Turret1.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
};
