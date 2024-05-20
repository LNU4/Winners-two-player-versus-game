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
    if (this.game.player2){
    
        this.enemy = this.game.player2

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
    
    this.texture.replaceColor (
        new rune.color.Color24(34, 32, 52),
        new rune.color.Color24(172, 50, 50)
    );
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Base.prototype.update = function(step) {
    // this.debug = true;
    var m_this = this;
    rune.display.Sprite.prototype.update.call(this, step);
    this.hitTestAndSeparate(this.game.player2)
    this.hitTestAndSeparate(this.game.player)

//     if(this.enemy)   { 
       
//         if (this.enemy.bullets)  {

//          if (this.enemy.bullets.bullet){
//             console.log('-.-')
//        if (this.enemy.bullets.bullet.hitTestAndSeparate(this)) {
       
//         //this.enemy.bullets.bullet.hitTestAndSeparate(this)
//         this.game.layer0.removeChild(this.enemy.bullets.bullet, true);
//         this.HPValue -=200;

//         console.log(this.HPValue);

//         if (this.HPValue  == 0){
//             console.log('yzyzyz')
//           //  this.enemy.bullets.bullet.hitTestAndSeparate(this)
//             this.game.layer0.removeChild(this, true);

           

//         }

//         // this.game.layer0.removeChild(this.enemy.bullets.bullet, true)
//         // this.game.layer0.removeChild(this, true);
//         //this.dispose()

//         } 
//     } 
// } 
// }
    
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



