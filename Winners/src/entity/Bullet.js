//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.DisplayObject
 *
 * @param {number} x ...
 * @param {number} y ...
 *
 * @class
 * @classdesc
 * 
 * Represents a bullet.
 */
Winners.entity.Bullet = function(x, y) {

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * The amount of damage the bullet causes.
     *
     * @type {number}
     * @default 20
     */
    this.damage = 20.0;

    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * The speed of the bullet.
     *
     * @type {number}
     * @protected
     */
    this.m_speed = 0.08;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.display.DisplayObject.call(this, x, y, 3, 3);
    this.backgroundColor = "#FF00FF";
    this.movable = true;
};

//------------------------------------------------------------------------------
//  Inheritance
//------------------------------------------------------------------------------

Winners.entity.Bullet.prototype = Object.create(rune.display.DisplayObject.prototype);
Winners.entity.Bullet.prototype.constructor = Winners.entity.Bullet;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
Winners.entity.Bullet.prototype.update = function(step) {
    rune.display.DisplayObject.prototype.update.call(this, step);
    this.m_updateMotion(step);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Calculates movement.
 *
 * @param {number} step ...
 *
 * @return {undefined}
 * @private
 */
 Winners.entity.Bullet.prototype.m_updateMotion = function(step) {
    this.velocity.x += Math.cos(rune.util.Math.degreesToRadians(this.rotation)) * this.m_speed;
    this.velocity.y += Math.sin(rune.util.Math.degreesToRadians(this.rotation)) * this.m_speed;


};