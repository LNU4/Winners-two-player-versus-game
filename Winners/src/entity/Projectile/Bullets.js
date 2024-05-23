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
Winners.entity.Bullets = function(game) {

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
   
    this.game = game; 
    this.container = this.game.layer0;
    this.fire = this.application.sounds.sound.get("fire1");
  //  console.log(this.application.sounds.sound.get("fire1"))
  
    // this.ownerBase = ownerBase;
    // this.enemyBase = enemyBase;
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
    rune.display.DisplayGroup.call(this, game.layer0);
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
Winners.entity.Bullets.prototype.create = function(x, y, owner, turret, enemy) {
    this.owner = owner;
    this.turret = turret;
    this.enemy = enemy;
   

    if (this.numMemebers == this.maxNumBullets) {
        this.removeChild(this.getChildAt(0));
    }
    
    this.bullet = new Winners.entity.Bullet(this.game, this.container, this.owner, this.enemy, this);
    this.bullet.x = (x || 0) - (this.bullet.width  >> 1);
    this.bullet.y = (y || 0) - (this.bullet.height >> 1);

    this.addMember(this.bullet);
    this.fire.play(true);
   // this.m_soundFire.play(true);
    
    return this.bullet;
};

/**
 * Resets all bullets.
 *
 * @return {undefined}
 */
Winners.entity.Bullets.prototype.reset = function() {
    this.removeChildren();
    console.log('ccccc')
};

Winners.entity.Bullets.prototype.update = function(step) {
    
};
