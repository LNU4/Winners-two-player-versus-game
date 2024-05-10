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
Winners.entity.Powerup = function (x, y, game, player) {

    this.game = game;
    this.player = player;
    this.puX = 0;
    this.puY = 0;
    if (this.player === this.game.player) {
       // this.player = this.game.player;
        this.puX = 5;
        this.puY = 35;
      //  this.target1 = this.game.player;
      } else if (this.player === this.game.player2) {
       // this.player = this.game.player2;
        this.puX = 1230;
        this.puY = 35;
       // this.target2 = this.game.player2;
       console.log(this.puX)
      }

      
    // if (){

    // }
   
  //--------------------------------------------------------------------------
  // Super call
  //--------------------------------------------------------------------------

  /**
   * Calls the constructor method of the super class.
   */
  rune.display.Sprite.call(this, x, y, 40, 40, "powerUp");
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
Winners.entity.Powerup.prototype.init = function () {
  rune.display.Sprite.prototype.init.call(this);
};

/**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Powerup.prototype.update = function (step) {
  rune.display.Sprite.prototype.update.call(this, step);
 var puX =  this.puX;
 var puY = this.puY;
 
  // this.game.player2
  if(this.hitTest(this.player)){
    console.log(puX)
    this.game.layer0.removeChild(this);
   
    if (this.game.powerupsArray.length < 3) {
    
       

    this.powerupCounter = new Winners.entity.PowerupCounter (this.game, this.game.powerupIx, { puX ,puY});
    this.game.layer0.addChild(this.powerupCounter)
    console.log(this.game.powerupsArray)
    this.game.powerupsArray.push(this.powerupCounter)
    // console.log(this.game.powerupCounter.powerupArray[0], this.game.powerupCounter.powerupIx)
    console.log(this.game.powerupIx)
    this.game.powerupIx++
    console.log(this.game.powerupsArray)
    console.log(this.game.powerupIx)
    // this.powerupCounter = new  Winners.entity.PowerupCounter(1230, 45 ,this.game, this, this.game.powerCounter)

    
   
    
    // this.game.powerupsArr.push(this.powerupCounter)

    // this.game.layer0.addChild(this)

 
//console.log(this.game.layer0.numChildren)
}
}

};

/**
 * ...
 *
 * @returns {undefined}
 */
Winners.entity.Powerup.prototype.dispose = function () {
  rune.display.Sprite.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------
