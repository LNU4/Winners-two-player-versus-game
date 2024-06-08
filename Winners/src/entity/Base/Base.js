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
Winners.entity.Base = function (x, y, game) {
  /**
   *  Propertey that specifies the HP value of this object
   * @type {number}
   */
  this.HPValue = 1000;
  /**
   * Reference to game class
   * @type {object}
   */
  this.game = game;
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------
  if (this.game.player2) {
    /**
     * specifies the enemy of the base
     * @type {object}
     */
    this.enemy = this.game.player2;
  }

  /**
   * Calls the constructor method of the super class.
   */
  rune.display.Sprite.call(this, x, y, 64, 64, "base");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Base.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Base.prototype.constructor = Winners.entity.Base;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Base.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
  /**
   * Property that makes the base object not moveable
   * @type {boolean}
   */
  this.immovable = true;

  this.texture.replaceColor(
    new rune.color.Color24(34, 32, 52),
    new rune.color.Color24(172, 50, 50)
  );
  /**
   * State the Animation state based on the index
   */
  this.animation.create("0", [0], 1, true);
  this.animation.create("1", [1], 1, true);
  this.animation.create("2", [2], 1, true);
  this.animation.create("3", [3], 1, true);
  this.animation.create("4", [4], 1, true);

  this.animation.gotoAndStop("0");
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Base.prototype.update = function (step) {
  var m_this = this;
  rune.display.Sprite.prototype.update.call(this, step);
  /**
   * Sepearates the player objects
   */
  this.hitTestAndSeparate(this.game.player2);
  this.hitTestAndSeparate(this.game.player);
};

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Base.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
};
