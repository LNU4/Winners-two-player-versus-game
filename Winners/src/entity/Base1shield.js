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
Winners.entity.Base1shield = function(x, y, game) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    this.game  = game;
    /**
     * Calls the constructor method of the super class.
     */
    rune.display.Sprite.call(this, x, y, 64, 64, "Baseprotection");
   
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Base1shield.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Base1shield.prototype.constructor = Winners.entity.Base1shield;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Base1shield.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this);
    this.immovable = true
    this.rotation = (-90); 
   
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Base1shield.prototype.update = function(step) {
    rune.display.Sprite.prototype.update.call(this, step);
    this.hitTestAndSeparate(this.game.player2)
    this.hitTestAndSeparate(this.game.player)
};

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Base1shield.prototype.dispose = function() {
    rune.display.Sprite.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------



