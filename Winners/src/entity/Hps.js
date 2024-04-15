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

Winners.entity.Hps = function (x, y){
    console.log(x, y)

    rune.display.Sprite.call(this, x, y, 32, 32, "100hp");

}

 Winners.entity.Hps.prototype = Object.create(rune.display.Sprite.prototype);
 Winners.entity.Hps.prototype.constructor = Winners.entity.Hps;
