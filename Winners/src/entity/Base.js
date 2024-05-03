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
Winners.entity.Base = function(x, y) {

    this.HPValue = 1000; 
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Calls the constructor method of the super class.
     */
    rune.display.Sprite.call(this, x, y, 32, 32, "winner-mainchar");
   
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
Winners.entity.Base.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this);
    
   
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Base.prototype.update = function(step) {
    rune.display.Sprite.prototype.update.call(this, step);
    
};

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Base.prototype.dispose = function() {
    rune.display.Sprite.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------



