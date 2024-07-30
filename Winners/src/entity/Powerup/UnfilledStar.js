//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.Sprite
 * @param {number} x coordinates of where the object will be placed on x axis
 * @param {number} y coordinates of where the object will be placed on y axis
 * @param {object} game the game object
 *
 *
 *
 *
 *
 * @class
 * @classdesc
 *
 *
 */

Winners.entity.UnfilledStar = function (x, y, game) {


    this.game  = game;
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
  
    rune.display.Sprite.call(this, x, y, 16, 16, "unfilledStar" );
    this.game.camera.addChild(this);
   
  };
  //------------------------------------------------------------------------------
  //  Inheritance
  //------------------------------------------------------------------------------
  Winners.entity.UnfilledStar.prototype = Object.create(
    rune.display.Sprite.prototype
  );
  Winners.entity.UnfilledStar.prototype.constructor = Winners.entity.UnfilledStar;
  //------------------------------------------------------------------------------
  // Override public prototype methods
  //------------------------------------------------------------------------------

  /**
 * 
 * @method
 * @returns {undefined}
 */
Winners.entity.PowerupCounter.prototype.init = function () {
    rune.display.Sprite.prototype.init.call(this);
  };
  
  /**
   * The update method of the object, exutes its logic per tick
   * @method
   * @param {number} step Fixed time step.
   *
   * @returns {undefined}
   */
  Winners.entity.UnfilledStar.prototype.update = function (step) {
    rune.display.Sprite.prototype.update.call(this, step);
    
  };
  /**
   *This method prepares the object to be removed from the memory by the garbage collector
   *
   *@method
   * @returns {undefined}
   */
  Winners.entity.UnfilledStar.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
  };
  