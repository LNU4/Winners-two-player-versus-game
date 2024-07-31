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
Winners.entity.Leg = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend rune.particle.Particle.
     */
    rune.particle.Particle.call(this, 0, 0, 10, 10, "leg");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Leg.prototype = Object.create(rune.particle.Particle.prototype);
Winners.entity.Leg.prototype.constructor = Winners.entity.Leg; 

//--------------------------------------------------------------------------
// Override public prototype methods
//--------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated.
 * @override
 *  @returns {undefined}
 */
Winners.entity.Leg.prototype.init = function() {
    rune.particle.Particle.prototype.init.call(this);
};

/**
 * Method to exutes its logic per tick
 * @param {number} step fixed time step.
 * @override
 * @returns {undefined}
 */
Winners.entity.Leg.prototype.update = function(step) {
    rune.particle.Particle.prototype.update.call(this, step); 
};

/**
 *This method prepares the object to be removed from the memory by the garbage collector
 *
 *@method
 * @returns {undefined}
 */
 Winners.entity.Leg.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
  };