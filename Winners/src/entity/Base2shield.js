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
Winners.entity.Base2shield = function(x, y, game) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    this.game = game;
    this.x = x;
    this.y = y

    /**
     * Calls the constructor method of the super class.
     */
    rune.display.Sprite.call(this, x, y, 64, 64, "Baseprotection");
   //this.movable = false;
  
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Base2shield.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Base2shield.prototype.constructor = Winners.entity.Base2shield;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Base2shield.prototype.init = function() {
    rune.display.Sprite.p
    
    this.movable = false;
    this.rotation = 90;
    this.immovable = true
   
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Base2shield.prototype.update = function(step) {
    rune.display.Sprite.prototype.update.call(this, step);
    this.hitTestAndSeparate(this.game.player2)
    this.hitTestAndSeparate(this.game.player)
    // if (this.hitTestAndSeparate(this.game.player2)) {
    //     this.velocity.x = 0;
    //     this.velocity.y = 0;
    //     console.log('.-.-.-.') 
    //    return;
      
        
    //   }
    // this.hitTestAndSeparate()
    
};

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Base2shield.prototype.dispose = function() {
    rune.display.Sprite.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------



