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
Winners.entity.Effect = function(x, y) {

    // --------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Calls the constructor method of the super class.
     */

    console.log('hit');
    rune.display.Sprite.call(this, x, y, 17, 17, "star");
    //Winners.scene.Game.stage.addChild()
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Effect.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Effect.prototype.constructor = Winners.entity.Effect;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Effect.prototype.init = function() {
    
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Effect.prototype.update = function(step) {
   
};

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Effect.prototype.dispose = function() {
    rune.display.Sprite.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
Winners.entity.Effect.prototype.m_initPhysics = function() {
   
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
Winners.entity.Effect.prototype.m_initAnimation = function() {
   
};

/**
 * ...
 *
 * @returns {undefined}
 * @private
 */
Winners.entity.Effect.prototype.m_updateInput = function() {
    // if (Winners.entity.Player.x == Winners.entity.PlayerTwo.x && Winners.entity.Player.y== Winners.entity.PlayerTwo.y) {
    //     console.log('HIT');
       
    // }
};