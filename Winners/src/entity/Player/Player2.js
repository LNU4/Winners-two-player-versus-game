// Constructor scope
//

/**
 * @constructor
 * @extends Winners.entity.Players
 * @param {number} x
 * @param {number} y
 * @param {object} game
 *
 */

Winners.entity.Player2 = function (x, y, game) {
  /**
   * Reference to the game object
   * @type {Object}
   */
  this.game = game;
  /**
   * Reference to the pleyer's base shield object
   * @type {Object}
   */
  this.playerBaseShield = this.game.Base2shield;
  /**
   * Reference to the base shield object of the pleyer's enemy
   * @type {Object}
   */
  this.enemyBaseShield = this.game.Base1shield;
  /**
   * Reference to the pleyer's turret object
   * @type {Object}
   */
  this.turret1 = this.game.turret2;
  /**
   * Reference to the pleyer's base object
   * @type {Object}
   */
  this.playerBase = this.game.base2;
  /**
   * Reference to the base object of the pleyer's enemy
   * @type {Object}
   */
  this.enemyBase = this.game.base;
  /**
   * property refering to the enemy "player" object
   * @type {Object}
   */
  this.player = this.game.player;

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------
  Winners.entity.Players.call(this, x, y, this.game, "resizedtank");
};
//----------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------
Winners.entity.Player2.prototype = Object.create(
  Winners.entity.Players.prototype
);
Winners.entity.Player2.prototype.constructor = Winners.entity.Player2;
/**
 *
 *  * Setting the color of plyer, calling this.m_initPhysics() and this.m_initAnimation() and setting the 'player' property
 * @method
 * @returns {undefined}
 */

Winners.entity.Player2.prototype.init = function () {
  Winners.entity.Players.prototype.init.call(this);

 
  this.texture.replaceColor(
    new rune.color.Color24(102, 57, 49),
    new rune.color.Color24(172, 50, 50)
  );

 
};
// Override public prototype methods
//------------------------------------------------------------------------------

/**
 * The update method of the player object, exutes its logic per tick
 *
 * @method
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Player2.prototype.update = function (step) {
  Winners.entity.Players.prototype.update.call(this, step);

  this.hitTestAndSeparate(this.game.base);
  this.hitTestAndSeparate(this.game.base2);
  this.hitTestAndSeparate(this.game.Base1shield);
};
/**
 * retrnes the id of the gampad
 *
 *  @method
 *
 * @returns {number}
 */
Winners.entity.Player2.prototype.getGamepadIndex = function () {
  return 1;
};
/**
 * returns the pressed key as a string
 *
 *  @method
 *
 * @returns {string}
 */
Winners.entity.Player2.prototype.getRightKey = function () {
  return "RIGHT";
};
/**
 * returns the pressed key on the keyboard as a string
 *
 *  @method
 *
 * @returns {string}
 */
Winners.entity.Player2.prototype.getLeftKey = function () {
  return "LEFT";
};
/**
 * returns the pressed key on the keyboard as a string
 *
 *  @method
 *
 * @returns {string}
 */
Winners.entity.Player2.prototype.getDownKey = function () {
  return "DOWN";
};
/**
 * returns the pressed key on the keyboard as a string
 *
 *  @method
 *
 * @returns {string}
 */
Winners.entity.Player2.prototype.getUpKey = function () {
  return "UP";
};
/**
 * returns the pressed key on the keyboard as a string
 *
 *  @method
 *
 * @returns {string}
 */
Winners.entity.Player2.prototype.getShootKey = function () {
  return "M";
};

