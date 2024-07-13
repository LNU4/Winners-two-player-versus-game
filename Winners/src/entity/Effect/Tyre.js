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
Winners.entity.Tyre = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend rune.particle.Particle.
     */
    rune.particle.Particle.call(this, 0, 0, 10, 10, "tyre");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Tyre.prototype = Object.create(rune.particle.Particle.prototype);
Winners.entity.Tyre.prototype.constructor = Winners.entity.Tyre; 

//--------------------------------------------------------------------------
// Override public prototype methods
//--------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated.
 * @override
 *  @returns {undefined}
 */
Winners.entity.Tyre.prototype.init = function() {
    rune.particle.Particle.prototype.init.call(this);
};

/**
 * Method to exutes its logic per tick
 * @override
 * @returns {undefined}
 */
Winners.entity.Tyre.prototype.update = function(step) {
    rune.particle.Particle.prototype.update.call(this, step); 
};