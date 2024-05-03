//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 *  @extends rune.display.DisplayObject
 * 
 *  
 * rune.display.Sprite
 *  rune.ui.Progressbar
 *
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
    this.x = this.player.x;
    this.y = this.player.y;
    // this.width = 25;
    // this.hight = 10; 
    // console.log(this.width)
    // console.log(this.hight)

   

    rune.display.DisplayObject.call(this, this.x, this.y, 25, 10);
    this.backgroundColor = "#00FF00";
    this.movable = true;

    //rune.display.Sprite.call(this, 1160, 359.5, 32, 32, "100hp");
    //rune.ui.Progressbar.call(this,100, 25, "#ffff00", "#ff00ff")
    /**
      * ****** THESE LINES SJOULD BE MOVED INTO init() ******
      */

    


}

 Winners.entity.Hps.prototype = Object.create(rune.display.DisplayObject.prototype);
 Winners.entity.Hps.prototype.constructor = Winners.entity.Hps;

 /**
 * ...
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
Winners.entity.Hps.prototype.update = function (step) {

    rune.display.DisplayObject.prototype.update.call(this, step);
     this.x = this.player.x;
    this.y = this.player.y -20 ;
 
  };

  Winners.entity.Hps.prototype.dispose = function () {
    rune.display.DisplayObject.prototype.dispose.call(this);
  };
  