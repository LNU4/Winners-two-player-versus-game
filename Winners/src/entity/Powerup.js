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
  var m_this = this;
  if (this.unKnownPlayer == this.game.player2) {
    // this.player = this.game.player;
    this.puX = 1230;
    this.puY = 35;
    this.player = this.game.player2;
    this.enemy = this.game.player;
    //  this.target1 = this.game.player;

    this.texture.replaceColor (
      new rune.color.Color24(34, 32, 52),
      new rune.color.Color24(32, 32, 32)
    );
  } else if (this.unKnownPlayer == this.game.player) {
    // this.player = this.game.player2;

    this.puX = 5;
    this.puY = 35;
    this.player = this.game.player;
    this.enemy = this.game.player2;
    // this.target2 = this.game.player2;
    this.texture.replaceColor (
      new rune.color.Color24(34, 32, 52),
      new rune.color.Color24(172, 50, 50)
    );
    
  }
  var puX = this.puX;
  var puY = this.puY;

  // this.game.player2
  if (this.hitTest(this.player)) {
    if (this.player.powerupsArray.length < 3) {
      this.soundEffect.play(true);
      console.log("powerup", puX, puY);

      this.powerupCounter = new Winners.entity.PowerupCounter(
        this.game,
        this.player,
        { puX: puX, puY: puY },
        this.player,
        this.enemy
      );

      this.game.layer0.addChild(this.powerupCounter);
      this.player.powerupsArray.push(this.powerupCounter);
      // console.log(this.game.powerupCounter.powerupArray[0], this.game.powerupCounter.powerupIx)

      this.player.powerupIx++;
      console.log(this.powerupCounter);

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
      this.dispose();
    }
  } else {
    this.game.timers.create({
     
      duration: 30000,
      onComplete: function () {
        //  m_this.game.layer0.removeChild(m_this)
        this.layer0.removeChild(m_this);

        // m_this.dispose() // for some reasone this causes error
      },
    });
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
