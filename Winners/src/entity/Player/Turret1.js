//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends Winners.entity.Turrets
 * @param {number} x coordinates of where the object will be placed on x axis
 * @param {number} y coordinates of where the object will be placed on y axis
 * @param {object} game the game object
 * 
 * @class
 * @classdesc
 *
 * Turret for the first player.
 */
Winners.entity.Turret1 = function (x, y, game) {
  /**
   * Reference to the game object
   * @type {Object}
   */
  this.game = game;

  Winners.entity.Turrets.call(this, x, y, this.game);
};

//----------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Turret1.prototype = Object.create(Winners.entity.Turrets.prototype);
Winners.entity.Turret1.prototype.constructor = Winners.entity.Turret1;

//------------------------------------------------------------------------------
// Override public prototype methods
//------------------------------------------------------------------------------

/**
 * super call to init() method to set the turrets color
 *
 * @returns {undefined}
 */
Winners.entity.Turret1.prototype.init = function () {
  Winners.entity.Turrets.prototype.init.call(this, new rune.color.Color24(0, 150, 230), 90);
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Turret1.prototype.update = function (step) {
  Winners.entity.Turrets.prototype.update.call(this, step);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Method that supper calls m_torretRotation method in the service class "Turrets" to handle turret rotation
 * @returns {undefined}
 * @private
 */
Winners.entity.Turret1.prototype.m_torretRotation = function () {
  Winners.entity.Turrets.prototype.m_torretRotation.call(this, 0);
};

/**
 * This method supper calls the dispose method in the service class "Turrets"
 *
 * @returns {undefined}
 */
Winners.entity.Turret1.prototype.dispose = function () {
  Winners.entity.Turrets.prototype.dispose.call(this);
};

