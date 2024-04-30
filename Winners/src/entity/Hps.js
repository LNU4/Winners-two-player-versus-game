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
 * 
 */

Winners.entity.Hps = function (life, actualSateg, player){


    this.life = life;
    this.lifeIx = life.ix;
    this.parentSatge = actualSateg;
    this.player = player;
    



    rune.display.Sprite.call(this, 1160, 359.5, 32, 32, "100hp");
    /**
      * ****** THESE LINES SJOULD BE MOVED INTO init() ******
      */

    


}

 Winners.entity.Hps.prototype = Object.create(rune.display.Sprite.prototype);
 Winners.entity.Hps.prototype.constructor = Winners.entity.Hps;

 /**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Hps.prototype.update = function (step) {

    rune.display.Sprite.prototype.update.call(this, step);
    this.x = this.player.x;
    this.y = this.player.y -20 ;
 
  };

  Winners.entity.Hps.prototype.dispose = function () {
    rune.display.Sprite.prototype.dispose.call(this);
  };
  