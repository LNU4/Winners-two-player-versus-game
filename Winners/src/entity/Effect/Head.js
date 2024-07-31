//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Create a new particle instance
 *
 * @constructor
 * @extends rune.particle.Particle
 *
 * @class
 * @classdesc
 * 
 */
Winners.entity.Head = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend rune.particle.Particle.
     */
    rune.particle.Particle.call(this, 0, 0, 10, 10, "head");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Head.prototype = Object.create(rune.particle.Particle.prototype);
Winners.entity.Head.prototype.constructor = Winners.entity.Head; 

//--------------------------------------------------------------------------
// Override public prototype methods
//--------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated.
 * @override
 *  @returns {undefined}
 */
Winners.entity.Head.prototype.init = function() {
    rune.particle.Particle.prototype.init.call(this);
};

/**
 * Method to exutes its logic per tick
 * @param {number} step fixed time step.
 * @override
 * @returns {undefined}
 */
Winners.entity.Head.prototype.update = function(step) {
    rune.particle.Particle.prototype.update.call(this, step); 
};

/**
 *This method prepares the object to be removed from the memory by the garbage collector
 *
 *@method
 * @returns {undefined}
 */
 Winners.entity.Head.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
  };
  