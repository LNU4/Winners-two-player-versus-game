//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends Winners.entity.Turrets
 * @param {number} x
 * @param {number} y
 * @param {object} game
 * 
 * @class
 * @classdesc
 *
 * Turret for the second player.
 */
Winners.entity.Turret2 = function (x, y, game) {


  /**
   * Reference to the game object
   * @type {Object}
   */
  this.game = game;

  Winners.entity.Turrets.call(this, x, y, this.game);

  /**
   * Placeholder to refer to the second player.
   */
  this.turret1 = null;
};

//----------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Turret2.prototype = Object.create(Winners.entity.Turrets.prototype);
Winners.entity.Turret2.prototype.constructor = Winners.entity.Turret2;

//------------------------------------------------------------------------------
// Override public prototype methods
//------------------------------------------------------------------------------

/**
 * super call to init() method to set the turrets color
 *
 * @returns {undefined}
 */
Winners.entity.Turret2.prototype.init = function () {
  Winners.entity.Turrets.prototype.init.call(this, new rune.color.Color24(255, 0, 0), -90);
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Turret2.prototype.update = function (step) {
  Winners.entity.Turrets.prototype.update.call(this, step);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 *  Method that supper calls m_torretRotation method in the service class "Turrets" to handle turret rotation
 * @returns {undefined}
 * @private
 */
Winners.entity.Turret2.prototype.m_torretRotation = function () {
  Winners.entity.Turrets.prototype.m_torretRotation.call(this, 1);
};

// /**
//  * 
//  * Method to play the shot animation.
//  * @returns {undefined}
//  * @public
//  */
// Winners.entity.Turret2.prototype.shotAnimation = function () {
//   this.animation.gotoAndPlay("shot");
// };

/**
 * his method supper calls the dispose method in the service class "Turrets"
 *
 * @returns {undefined}
 */
Winners.entity.Turret2.prototype.dispose = function () {
  Winners.entity.Turrets.prototype.dispose.call(this);
};







// //------------------------------------------------------------------------------
// // Constructor scope
// //------------------------------------------------------------------------------

// /**
//  * Creates a new object.
//  *
//  * @constructor
//  * @extends rune.display.Sprite
//  *
//  * @class
//  * @classdesc
//  *
//  * Game scene.
//  */
// Winners.entity.Turret2 = function (x, y, game) {
//   /**
//    * placeholder to refer to the second player
//    */
//   this.turret1 = null;
//   this.game = game;
//   //--------------------------------------------------------------------------
//   // Super call
//   //--------------------------------------------------------------------------

//   /**
//    * Calls the constructor method of the super class.
//    */
//   rune.display.Sprite.call(this, x, y, 64, 64, "turret-remake");
// };

// //----------------------------------------------------------------------------
// // Inheritance
// //------------------------------------------------------------------------------

// Winners.entity.Turret2.prototype = Object.create(rune.display.Sprite.prototype);
// Winners.entity.Turret2.prototype.constructor = Winners.entity.Turret2;

// //------------------------------------------------------------------------------
// // Override public prototype methods (ENGINE)
// //------------------------------------------------------------------------------

// /**
//  * ...
//  *
//  * @returns {undefined}
//  */
// Winners.entity.Turret2.prototype.init = function () {
//   rune.display.Sprite.prototype.init.call(this);

//   this.texture.replaceColor(
//     new rune.color.Color24(143, 86, 59),
//     new rune.color.Color24(255, 0, 0)
//   );
//   this.rotation = -90;
//   this.m_initAnimation();
// };

// /**
//  * ...
//  *
//  * @param {number} step Fixed time step.
//  *
//  * @returns {undefined}
//  */
// Winners.entity.Turret2.prototype.update = function (step) {
//   rune.display.Sprite.prototype.update.call(this, step);
//   this.m_torretRotation();
// };

// //------------------------------------------------------------------------------
// // Private prototype methods
// //------------------------------------------------------------------------------
// Winners.entity.Turret2.prototype.shotAnimation = function () {
//   this.animation.gotoAndPlay("shot");
// };

// /**
//  * ...
//  * Method to handle the animation creatation related to the turret class.
//  * @returns {undefined}
//  * @private
//  */
// Winners.entity.Turret2.prototype.m_initAnimation = function () {
//   this.animation.create("idle", [0], 1, true);
//   this.animation.create("shot", [0, 2, 2, 2, 2, 2, 0], 10, false);
//   this.animation.create("done", [6, 7, 8, 9, 10, 11], 5, true);
// };

// /**
//  * ...
//  * Method that handles the turret rotation
//  * @returns {undefined}
//  * @private
//  */

// Winners.entity.Turret2.prototype.m_torretRotation = function () {
//   /**
//    *  properties to speicify the second gamepad as a controller
//    * @type {Object}
//    */
//   var gamepad = this.gamepads.get(1);

//   if (gamepad.stickRightLeft || this.keyboard.pressed("J")) {
//     /**
//      * speicify on how many degrees to rotate for time the gamepad input is pressed
//      * @type {number}
//      */
//     this.rotation -= 5;
//   } else if (gamepad.stickRightRight || this.keyboard.pressed("L")) {
//     this.rotation += 5;
//   }
// };

// /**
//  * ...
//  *
//  * @returns {undefined}
//  */
// Winners.entity.Turret2.prototype.dispose = function () {
//   rune.display.Sprite.prototype.dispose.call(this);
// };
