//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 *  @extends rune.display.DisplayObject
 *
 * @param {Object}  player the player object to which the hp object is attached
 *
 *
 *
 *
 * @class
 * @classdesc
 *
 *
 */

Winners.entity.Hps = function (player) {
  this.player = player;

  /**
   * Property that limits the value of the hit points object
   * @type {number}
   */
  this.value = 100;
  /**
   * Properties that store the x and y coordinates of the hit points object
   * @type {number}
   */
  this.x = this.player.x;
  this.y = this.player.y;

  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  rune.display.DisplayObject.call(this, this.x, this.y, 25, 10);
  /**
   * Property setting the color of the object
   * @type {string}
   */
  this.backgroundColor = "#03fc24";

  /**
   * Property enabling the object to move
   * @type {boolean}
   */
  this.movable = true;
};
//------------------------------------------------------------------------------
//  Inheritance
//------------------------------------------------------------------------------
Winners.entity.Hps.prototype = Object.create(
  rune.display.DisplayObject.prototype
);
Winners.entity.Hps.prototype.constructor = Winners.entity.Hps;
//------------------------------------------------------------------------------
// Override public prototype methods
//------------------------------------------------------------------------------

/**
 * The update method of the object, exutes its logic per tick
 * @method
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Hps.prototype.update = function (step) {
  rune.display.DisplayObject.prototype.update.call(this, step);
  this.x = this.player.x;
  this.y = this.player.y - 20;
};
/**
 *This method prepares the object to be removed from the memory by the garbage collector
 *
 *@method
 * @returns {undefined}
 */
Winners.entity.Hps.prototype.dispose = function () {
  rune.display.DisplayObject.prototype.dispose.call(this);
};
