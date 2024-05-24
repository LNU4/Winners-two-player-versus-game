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
 * 
 *
 * 
 * @class
 * @classdesc
 * 
 * 
 */

Winners.entity.Hps = function (Sateg, player){


   
    this.parentSatge = Sateg;
    this.player = player;
    this.value = 100;  
    this.x = this.player.x;
    this.y = this.player.y;
    
   

    rune.display.DisplayObject.call(this, this.x, this.y, 25, 10);
    this.backgroundColor = "#03fc24";
    this.movable = true;

    


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
  