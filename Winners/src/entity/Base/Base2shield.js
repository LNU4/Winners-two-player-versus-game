//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.Sprite
 * 
 * @param {number} X coordinates of where the object will be placed on X axis
 * @param {number} Y coordinates of where the object will be placed on Y axis
 * @param {object} game reference to the game object
 *
 * @class
 * @classdesc
 *
 * Game scene.
 */
Winners.entity.Base2shield = function (x, y, game) {
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------
  this.game = game;
  this.hpValue = 1000;
  this.x = x;
  this.y = y;

  /**
   * Calls the constructor method of the super class.
   */
  rune.display.Sprite.call(this, x, y, 128, 128, "baseprotection");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Base2shield.prototype = Object.create(
  rune.display.Sprite.prototype
);
Winners.entity.Base2shield.prototype.constructor = Winners.entity.Base2shield;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Base2shield.prototype.init = function () {
  rune.display.Sprite.p;
   //specify the rotation of the object
   
  this.rotation = 90;
   //Property that makes the base object not moveable
  this.immovable = true;

  this.texture.replaceColor(
    new rune.color.Color24(111, 103, 101),
    new rune.color.Color24(255, 0, 0)
  );
   //State the Animation state based on the index
  this.animation.create("0", [0], 1, true);
  this.animation.create("1", [1], 1, true);
  this.animation.create("2", [2], 1, true);
  this.animation.create("3", [3], 1, true);
  this.animation.create("4", [4], 1, true);
  this.animation.create("exeplod", [6, 7, 8, 9, 10, 11], 6, true);

  this.animation.gotoAndStop("0");
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Base2shield.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);
  this.hitTestAndSeparate(this.game.player2);
  this.hitTestAndSeparate(this.game.player);
};

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Base2shield.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
};
