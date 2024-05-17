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
Winners.entity.Base = function(x, y, game) {

    this.HPValue = 1000;
    this.game = game; 
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    this.game  = game;
    if (this.game.playere){
        this.enemy = this.game.playere
    }
    /**
     * Calls the constructor method of the super class.
     */
    rune.display.Sprite.call(this, x, y, 32, 32, "Base");
   
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Base.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Base.prototype.constructor = Winners.entity.Base;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Base.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this);
    this.immovable = true
    
   
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Base.prototype.update = function(step) {
    rune.display.Sprite.prototype.update.call(this, step);
    this.hitTestAndSeparate(this.game.player2)
    this.hitTestAndSeparate(this.game.player)

    if(this.enemy && this.enemy.bullets.bullet && this.enemy.bullets.bullet.hitTestAndSeparate(this)) {
        this.game.layer0.removeChild(this.enemy.bullets.bullet, true)
        this.game.layer0.removeChild(this, true);
        this.dispose()

        }
    
};

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Base.prototype.dispose = function() {
    rune.display.Sprite.prototype.dispose.call(this);
    console.log('base 1 is disposed')
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------



