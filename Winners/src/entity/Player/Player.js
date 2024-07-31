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

Winners.entity.Player = function (x, y, game) {
  /**
   * Reference to the game object
   * @type {Object}
   */
  this.game = game;
  /**
   * Reference to the pleyer's base shield object
   * @type {Object}
   */
  this.playerBaseShield = this.game.Base1shield;
  /**
   * Reference to the base shield object of the pleyer's enemy
   * @type {Object}
   */
  this.enemyBaseShield = this.game.Base2shield;
  /**
   * Reference to the pleyer's turret object
   * @type {Object}
   */
  this.turret1 = this.game.turret1;
  /**
   * Reference to the pleyer's base object
   * @type {Object}
   */
  this.playerBase = this.game.base;
  /**
   * Reference to the base object of the pleyer's enemy
   * @type {Object}
   */
  this.enemyBase = this.game.base2;
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------
  Winners.entity.Players.call(this, x, y, this.game, "resizedtank");
};
//----------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------
Winners.entity.Player.prototype = Object.create(
  Winners.entity.Players.prototype
);
Winners.entity.Player.prototype.constructor = Winners.entity.Player;
// Override public prototype methods
//------------------------------------------------------------------------------

/**
 *
 *  * Setting the color of plyer, calling this.m_initPhysics() and this.m_initAnimation() and setting the 'player' property
 * @method
 * @returns {undefined}
 */

Winners.entity.Player.prototype.init = function () {
  Winners.entity.Players.prototype.init.call(this);

  this.texture.replaceColor(
    new rune.color.Color24(69, 40, 60),
    new rune.color.Color24(255, 102, 102)
  );
  this.texture.replaceColor(
    new rune.color.Color24(223, 113, 38),
    new rune.color.Color24(105, 57, 49)
  );
  this.texture.replaceColor(
    new rune.color.Color24(102, 57, 49),
    new rune.color.Color24(172, 50, 50)
  );
  if (this.game.player2) {
    //property refering to the enemy "player2" object
    this.player = this.game.player2;
  }
 
};
/**
 * retrnes the id of the gampad
 *
 *  @method
 *
 * @returns {number}
 */
Winners.entity.Player.prototype.getGamepadIndex = function () {
  return 0;
};
/**
 * returns the pressed key as a string
 *
 *  @method
 *
 * @returns {string}
 */
Winners.entity.Player.prototype.getRightKey = function () {
  return "D";
};
/**
 * returns the pressed key on the keyboard as a string
 *
 *  @method
 *
 * @returns {string}
 */
Winners.entity.Player.prototype.getLeftKey = function () {
  return "A";
};
/**
 * returns the pressed key on the keyboard as a string
 *
 *  @method
 *
 * @returns {string}
 */
Winners.entity.Player.prototype.getDownKey = function () {
  return "S";
};
/**
 * returns the pressed key on the keyboard as a string
 *
 *  @method
 *
 * @returns {string}
 */
Winners.entity.Player.prototype.getUpKey = function () {
  return "W";
};
/**
 * returns the pressed key on the keyboard as a string
 *
 *  @method
 *
 * @returns {string}
 */
Winners.entity.Player.prototype.getShootKey = function () {
  return "P";
};