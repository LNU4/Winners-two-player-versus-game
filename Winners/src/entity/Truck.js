///------------------------------------------------------------------------------
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
Winners.entity.Truck = function(x, y) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Calls the constructor method of the super class.
     */
    rune.display.Sprite.call(this, x, y, 40, 40, "Truck");
   
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Truck.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Truck.prototype.constructor = Winners.entity.Truck;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Truck.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this);

    this.m_initAnimation();
    
   
};


Winners.entity.Truck.prototype.m_initAnimation = function () {
    //   this.life.globalX = this.globalX;
    // this.life.globalY = this.globalY;
    this.animation.create("idle", [0], 1, true);
    this.animation.create("walk", [0, 1], 1, true);
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Truck.prototype.update = function(step) {
    rune.display.Sprite.prototype.update.call(this, step);
    this.velocity.y -= 0.15;
    this.animation.gotoAndPlay("walk");

    
};
/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Truck.prototype.dispose = function() {
    rune.display.Sprite.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------



