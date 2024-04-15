//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.physics.Body
 *
 * @param {number} x ...
 * @param {number} y ...
 * @param {number} width ...
 * @param {number} height ...
 * @param {string} color ...
 * @param {string} texture ...
 *
 * @class
 * @classdesc
 * 
 * Represents a physical object.
 */
rymdsten.entity.Body = function(x, y, width, height, color, texture) {
    
    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------
    
    /**
     * Sound for when the object is removed.
     *
     * @type {rune.media.Sound}
     * @default null
     */
    this.soundKill = null;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.physics.Body.call(this, x, y, width, height, color, texture);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rymdsten.entity.Body.prototype = Object.create(rune.physics.Body.prototype);
rymdsten.entity.Body.prototype.constructor = rymdsten.entity.Body;

//------------------------------------------------------------------------------
// Override public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.entity.Body.prototype.kill = function() {
    rune.physics.Body.prototype.kill.call(this);
    if (this.group != null) {
        this.group.removeChild(this);
    }
    
    if (this.soundKill != null) {
        this.soundKill.play(true);
    }
};

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.entity.Body.prototype.init = function() {
    rune.physics.Body.prototype.init.call(this);
    this.m_initHitbox();
    this.m_initPhysics();
    this.m_initAnimation();
};

/**
 * @inheritDoc
 */
rymdsten.entity.Body.prototype.update = function(step) {
    rune.physics.Body.prototype.update.call(this, step);
    this.m_updateBounds(step);
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * Declares the physical size of the object.
 *
 * @return {undefined}
 */
rymdsten.entity.Body.prototype.m_initHitbox = function() {
    //@note: Override from child class.
};

/**
 * Declares the physical conditions of the object.
 *
 * @return {undefined}
 */
rymdsten.entity.Body.prototype.m_initPhysics = function() {
    this.mass = 1.0;
    this.velocity.max.x = 6.0; //@note: Magic number.
    this.velocity.max.y = 6.0; //@note: Magic number.
};

/**
 * Declares the object's animation.
 *
 * @return {undefined}
 */
rymdsten.entity.Body.prototype.m_initAnimation = function() {
    //@note: Override from child class.
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Limits the object to within the screen area.
 *
 * @return {undefined}
 */
rymdsten.entity.Body.prototype.m_updateBounds = function(step) {
    var camera = this.application.scenes.selected.cameras.getCamera(0);

    // WIDTH
    if (this.left > camera.width) this.right = 0;
    else if (this.right < 0) this.left = camera.width;

    // HEIGHT
    if (this.top > camera.height) this.bottom = 0;
    else if (this.bottom < 0) this.top = camera.height;
};