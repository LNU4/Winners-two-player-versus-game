//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @param {rune.display.layer1} layer1 ...
 *
 * @class
 * @classdesc
 * 
 * Represents a handler for bullets.
 */
Winners.entity.Bullets = function(container, owner, turret,enemy) {

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * Maximum number of bullets that can exist simultaneously.
     *
     * @type {number}
     * @default 4
     */
    this.maxNumBullets = 4;
    this.container = container;
    console.log(container);
    this.owner = owner;
    this.enemy = enemy;
    this.turret = turret;
    // console.log(this.owner)
    // console.log(this.enemy)
    
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    /**
     * Sound for when a new bullet is created.
     *
     * @type {rune.media.Sound}
     * @private
     */ 

    //--------------------------------------------------------------------------
    //  Constructor call
    //--------------------------------------------------------------------------
    
    /**
     *  ...
     */
    rune.display.DisplayGroup.call(this, container);
};

//------------------------------------------------------------------------------
//  Inheritance
//------------------------------------------------------------------------------

Winners.entity.Bullets.prototype = Object.create(rune.display.DisplayGroup.prototype);
Winners.entity.Bullets.prototype.constructor = Winners.entity.Bullets;

//------------------------------------------------------------------------------
// Public prototype methods
//------------------------------------------------------------------------------

/**
 * Creates a new bullet at a specific position.
 *
 * @param {number} [x=0] ...
 * @param {number} [y=0] ...
 *
 * @return {undefined}
 */
Winners.entity.Bullets.prototype.create = function(x, y) {
    if (this.numChildren == this.maxNumBullets) {
        this.removeChild(this.getChildAt(0));
    }
    
    var bullet = new Winners.entity.Bullet(this.container, this.owner, this.enemy);
        bullet.x = (x || 0) - (bullet.width  >> 1);
        bullet.y = (y || 0) - (bullet.height >> 1);

    this.addMember(bullet);
   // this.m_soundFire.play(true);
    
    return bullet;
};

/**
 * Resets all bullets.
 *
 * @return {undefined}
 */
Winners.entity.Bullets.prototype.reset = function() {
    this.removeChildren();
};
