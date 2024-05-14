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
Winners.entity.Powerup = function (x, y, game, unKnownPlayer) {

    this.game = game;
   
    this.unKnownPlayer = unKnownPlayer;
    this.puX = 0;
    this.puY = 0;
    console.log(unKnownPlayer)
   //console.log(this.game.layer0.application.sounds.sound.get("fire1"))
 this.soundEffect = this.application.sounds.sound.get("powerupSound");
    
  
      
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

  if (this.unKnownPlayer == this.game.player2) {
    // this.player = this.game.player;
    this.puX = 1230;
     this.puY = 35;
     this.player = this.game.player2
     this.enemy = this.game.player
   //  this.target1 = this.game.player;
   }  else if (this.unKnownPlayer == this.game.player) {
    // this.player = this.game.player2;
    

     this.puX = 5;
     this.puY = 35;
     this.player = this.game.player
     this.enemy = this.game.player2
    // this.target2 = this.game.player2;

    
   }
 var puX =  this.puX;
 var puY = this.puY;
 
  // this.game.player2
  if(this.hitTest(this.player)){
    
    this.soundEffect.play(true);
   
    if (this.game.player.powerupsArray.length < 3) {
    
       console.log(this.player.powerupsArray.length)
       console.log(this.player.powerupsArray)
       console.log(this.player)


       this.powerupCounter = new Winners.entity.PowerupCounter (this.game, this.player.powerupIx, { puX ,puY}, this.player, this.enemy);

    this.game.layer0.addChild(this.powerupCounter)
    
    this.player.powerupsArray.push(this.powerupCounter)
    // console.log(this.game.powerupCounter.powerupArray[0], this.game.powerupCounter.powerupIx)
  
    this.player.powerupIx++

   /* this.powerupCounter = new Winners.entity.PowerupCounter (this.game, this.game.player.powerupIx, { puX ,puY}, this.player, this.enemy);
    this.game.layer0.addChild(this.powerupCounter)
    
    this.game.player.powerupsArray.push(this.powerupCounter)
    // console.log(this.game.powerupCounter.powerupArray[0], this.game.powerupCounter.powerupIx)
  
    this.game.player.powerupIx++ */
  
    // this.powerupCounter = new  Winners.entity.PowerupCounter(1230, 45 ,this.game, this, this.game.powerCounter)

    
   
    
    // this.game.powerupsArr.push(this.powerupCounter)

    // this.game.layer0.addChild(this)

 
//console.log(this.game.layer0.numChildren)
this.game.layer0.removeChild(this);
this.dispose()
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
