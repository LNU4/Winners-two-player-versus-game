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
Winners.entity.Base2 = function(x, y, game) {
    
    this.HPValue = 1000; 
    this.game = game;
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    if (this.game.player){
    
        this.enemy = this.game.player

    }
    /**
     * Calls the constructor method of the super class.
     */
    rune.display.Sprite.call(this, x, y, 32, 32, "Base");
   
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Base2.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Base2.prototype.constructor = Winners.entity.Base2;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Base2.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this);
    this.immovable = true
    this.m_placement();
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Base2.prototype.update = function(step) {
    rune.display.Sprite.prototype.update.call(this, step);
    this.hitTestAndSeparate(this.game.player2)
    this.hitTestAndSeparate(this.game.player)


    if(this.enemy)   { 
       
        if (this.enemy.bullets)  {

         if (this.enemy.bullets.bullet){
            console.log('-.-')
       if (this.enemy.bullets.bullet.hitTest(this)) {
     
       // this.enemy.bullets.bullet.hitTestAndSeparate(this)
        this.game.layer0.removeChild(this.enemy.bullets.bullet, true);
        this.HPValue -=200;
        
        console.log(this.HPValue);
       
        if (this.HPValue  == 0){
            console.log('zxzxz')
           // this.enemy.bullets.bullet.hitTestAndSeparate(this)
            this.game.layer0.removeChild(this, true);
            
           

        }

        // this.game.layer0.removeChild(this.enemy.bullets.bullet, true)
        // this.game.layer0.removeChild(this, true);
        //this.dispose()

        } 
    } 
} 
}
    
};

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Base2.prototype.dispose = function() {
    rune.display.Sprite.prototype.dispose.call(this);
    console.log('base 1 is disposed')

};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

Winners.entity.Base2.prototype.m_placement = function() {
    this.flippedX = true;
   
};