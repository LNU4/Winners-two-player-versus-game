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
Winners.entity.Spark = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend rune.particle.Particle.
     */
    rune.particle.Particle.call(this, 0, 0, 16, 16, "spark");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Spark.prototype = Object.create(rune.particle.Particle.prototype);
Winners.entity.Spark.prototype.constructor = Winners.entity.Spark; 

//--------------------------------------------------------------------------
// Override public prototype methods
//--------------------------------------------------------------------------

/**
 * @override
 */
Winners.entity.Spark.prototype.init = function() {
    rune.particle.Particle.prototype.init.call(this);
};

/**
 * @override
 */
Winners.entity.Spark.prototype.update = function(step) {
    rune.particle.Particle.prototype.update.call(this, step); 
};