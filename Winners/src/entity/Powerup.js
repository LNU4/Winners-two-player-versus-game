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
Winners.entity.Powerup = function(x, y, game, parentOb) {
    var m_this = this; 
     this.game = game;
    this.parentOb = parentOb;  
    //this.counter = 0;
     console.log(this.game)
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Calls the constructor method of the super class.
     */
    rune.display.Sprite.call(this, x, y, 40, 40, "powerUp");

    this.game.timers.create({
        duration: 60000,
        onComplete: function () {
       
            m_this.dispose();
          
        }
    }
    );
   
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

Winners.entity.Powerup.prototype = Object.create(rune.display.Sprite.prototype);
Winners.entity.Powerup.prototype.constructor = Winners.entity.Powerup;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Powerup.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this);
   
   
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Powerup.prototype.update = function(step) {
    rune.display.Sprite.prototype.update.call(this, step);
    if(this.hitTest(this.game.player2)){

        this.game.layer0.removeChild(this);
        //var counter = 0;
         this.game.powerCounter++
        // console.log(this.game.powerCounter)
        if (this.game.powerCounter < 10) {
        // this.game.powerCounter++
         console.log(this.game.Powerup)
        this.powerupCounter = new  Winners.entity.PowerupCounter(1230, 45 ,this.game, this, this.game.powerCounter)
        
       //this.powerupCounter.ix = counter;
        
        this.game.powerupsArr.push(this.powerupCounter)

        this.game.layer0.addChild(this)
    
     //   this.game.layer0.addChild(this.powerupCounter);
    //   console.log(this.game.powerupsArr.length)
    //   console.log(this.game.powerupsArr)
    console.log(this.game.layer0.numChildren)
    }
    }
    
};

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Powerup.prototype.dispose = function() {
    rune.display.Sprite.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------



