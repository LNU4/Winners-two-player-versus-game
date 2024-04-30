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
Winners.entity.Bullet = function(layer0, bulletOwner, bulletTarget, x, y) {

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
    this.layer0 = layer0;

    this.bulletOwner = bulletOwner;
    this.bulletTarget = bulletTarget;
 

    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * The speed of the bullet.
     *
     * @type {number}
     * @protected
     */
    this.m_speed = 0.18;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.display.DisplayObject.call(this, x, y, 3, 3);
    this.backgroundColor = "#FFFF00";
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
    
    if(this.hitTest(this.bulletTarget)){
  
        var actualLife = this.bulletTarget.livesArr[this.bulletTarget.lifeIx];
        var actualLifeHpOb = actualLife.hp;
        console.log(actualLifeHpOb);

        actualLife.value -= this.damage;
      
        if ( this.bulletTarget.lifeIx === 2 && actualLife.value <= 0){
          
            this.stage.removeChild(this.bulletTarget.livesArr[2])
         
            this.stage.removeChild(actualLifeHpOb)
             console.log('GAME OVER')

           
        } else if (actualLife.value <= 0){

            
           this.bulletTarget.flicker.start(); 
            
   
           this.stage.removeChild(actualLifeHpOb)
        
            this.stage.removeChild(this.bulletTarget.livesArr[this.bulletTarget.lifeIx])
            this.bulletTarget.lifeIx ++

            this.bulletTarget.livesArr[this.bulletTarget.lifeIx].hp = new Winners.entity.Hps(this.bulletTarget.livesArr[this.bulletTarget.lifeIx], this.stage, this.bulletTarget);
            this.stage.addChildAt( this.bulletTarget.livesArr[this.bulletTarget.lifeIx].hp, 2)

           
        }
       
        console.log(this.stage.numChildren)

        this.stage.removeChild(this);

        
       
    }
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

