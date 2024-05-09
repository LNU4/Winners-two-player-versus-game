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
Winners.entity.PowerupCounter = function(x, y, game, parentOb, order) {


    this.game = game;
    this.parentOb = parentOb;
    this.order = order;
    console.log('ORDER',this.order)
    this.x = 0;
    this.y = 0;

    22

console.log(this.game.powerupsArr.indexOf(this))
console.log(this.game.powerupsArr.length);
console.log(this.game.powerupsArr[1])
    if (this === this.game.powerupsArr[0]){
     this.x = x;
     this.y = y;
     console.log(this.game.powerupsArr[0])
    } else if(this === this.game.powerupsArr[1]){
        this.x = x + 15;
        this.y = y;
        console.log(this.game.powerupsArr[1])
    }  else if(this === this.game.powerupsArr[2]){
        this.x = x + 30;
        this.y = y;
        console.log(this.game.powerupsArr[2])

    }
    // console.log(this.game.layer0.numChildren)
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    //console.log(this.parentOb.powerupsArr)
   
   
    /**
     * Calls the constructor method of the super class.
     */
    rune.display.Sprite.call(this, x,  y, 16, 16, "star");
    
   
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.PowerupCounter.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.PowerupCounter.prototype.constructor = Winners.entity.PowerupCounter;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.PowerupCounter.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this);
   
   
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.PowerupCounter.prototype.update = function(step) {
    rune.display.Sprite.prototype.update.call(this, step);
    // this.hitTestAndSeparate(this.game.player2)
    // this.hitTestAndSeparate(this.game.player)
    // if (this.hitTestAndSeparate(this.game.player2)) {
    //     this.velocity.x = 0;
    //     this.velocity.y = 0;
    //     console.log('.-.-.-.') 
    //    return;
      
        
    //   }
    // this.hitTestAndSeparate()
    
};

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.PowerupCounter.prototype.dispose = function() {
    console.log('PowerupCounter is disposed')
    rune.display.Sprite.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------



